import Expense from "../Models/Expense.js";

class ExpenseController {
  async create (req, res) {
    try {
      const { title, value, category, userId } = req.body;
      const expense = await Expense.create({ title, value, category, userId });
      res.json(expense);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getExpenses (req, res) {
    try {
      const expense = await Expense.find();
      return res.json(expense);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getExpense (req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({message: 'Wrong ID'});
      }
      const expense = await Expense.findById(id);
      return res.json(expense);
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
      const expense = await Expense.find({userId: userId});
      res.json(expense);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async updateExpense (req, res) {
    try {
      const { id } = req.params
      const data = req.body;
      if (!id) {
        res.status(400).json({message: 'Wrong ID'});
      }
      const updatedExpense = await Expense.findByIdAndUpdate(id, data, {new: true});
      return res.json(updatedExpense);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async deleteExpense (req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({message: 'Wrong ID'});
      }
      const deletedExpense = await Expense.findByIdAndDelete(id);
      return res.json(deletedExpense);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ExpenseController();