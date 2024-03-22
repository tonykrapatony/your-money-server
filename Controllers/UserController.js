import User from "../Models/User.js";
import { passwordEncryption } from "../helpers/helpers.js";

class UserController {
  async create (req, res) {
    try {
      const { firstName, lastName, email, phone, password } = req.body;
      const secretpass = await passwordEncryption(password);
      const user = await User.create({ firstName, lastName, email, phone, password: secretpass });
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getUsers (req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getUser (req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({message: 'Wrong ID'});
      }
      const user = await User.findById(id);
      return res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async updateUser (req, res) {
    try {
      const { id } = req.params
      const data = req.body;
      if (!id) {
        res.status(400).json({message: 'Wrong ID'});
      }
      const updatedUser = await User.findByIdAndUpdate(id, data, {new: true});
      return res.json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async deleteUser (req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({message: 'Wrong ID'});
      }
      const deletedUser = await User.findByIdAndDelete(id);
      return res.json(deletedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new UserController();