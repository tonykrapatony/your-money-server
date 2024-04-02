import Income from "../Models/Income.js";

class IncomeController {
  async create (req, res) {
    try {
      const { date, title, value, userId } = req.body;
      const income = await Income.create({ date, title, value, userId });
      res.json(income);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getIncomes (req, res) {
    try {
      const incomes = await Income.find();
      return res.json(incomes);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getIncome (req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({message: 'Wrong ID'});
      }
      const income = await Income.findById(id);
      return res.json(income);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getByUserId (req, res) {
    try {
      const { userId } = req.params;
      if (!userId) {
        res.status(400).json({message: 'Wrong ID'});
      }
      const incomes = await Income.find({userId: userId});
      res.json(incomes);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async updateIncome (req, res) {
    try {
      const { id } = req.params
      const data = req.body;
      if (!id) {
        res.status(400).json({message: 'Wrong ID'});
      }
      const updatedIncome = await Income.findByIdAndUpdate(id, data, {new: true});
      return res.json(updatedIncome);
    } catch (error) {
      res.status(500).json({error, message: "ERROR"});
    }
  }
  async deleteIncome (req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({message: 'Wrong ID'});
      }
      const deletedIncome = await Income.findByIdAndDelete(id);
      return res.json(deletedIncome);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new IncomeController();