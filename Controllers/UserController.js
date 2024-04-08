import User from "../Models/User.js";
import { fileUpload, passwordCompare, passwordEncryption } from "../helpers/helpers.js";

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
      if (data.photo) {
        let photoUrl = await fileUpload(data.photo);
        data.photo = photoUrl;
      }
      const updatedUser = await User.findByIdAndUpdate(id, data, {new: true});
      return res.json({updatedUser, message: "User data has been successfully updated"});
    } catch (error) {
      res.status(500).json({error, message: "Failed to update user data"});
    }
  }
  async changeUserPassword (req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({message: 'The user was not found'});
      }
      const checkPass = await passwordCompare(req.body.password, user.password);
      if (!checkPass) {
        return res.status(400).json({message: "Old password is incorrect"})
      }
      const secretpass = await passwordEncryption(req.body.newpassword);
      const updateUser = await User.findByIdAndUpdate(id, {password: secretpass}, {new: true})
      return res.json({updateUser, message: "User password has been successfully changed"});
    } catch (error) {
      res.status(500).json({error, message: "Failed to update user password"});
    }
  }
  async deleteUser (req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({message: 'Wrong ID'});
      }
      const deletedUser = await User.findByIdAndDelete(id);
      return res.json({deletedUser, message: "User successfully deleted"});
    } catch (error) {
      res.status(500).json({error, message: "Failed to delete user"});
    }
  }
}

export default new UserController();