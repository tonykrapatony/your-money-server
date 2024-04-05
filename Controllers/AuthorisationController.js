import User from "../Models/User.js";
import { jwtTokenGenerator, passwordCompare, passwordEncryption } from "../helpers/helpers.js";

class UserController {
  async registration (req, res) {
    try {
      const { firstName, lastName, email, phone, password } = req.body;
      const userCheck = await User.findOne({email});
      if (userCheck) {
        return res.status(400).json({message: "A user with this email already exists"})
      }
      const secretpass = await passwordEncryption(password);
      const user = await User.create({ firstName, lastName, email, phone, password: secretpass });
      res.json({user, message: 'User successfully registered'});
    } catch (error) {
      res.status(500).json({error, message: 'Registration error'});
    }
  }

  async login (req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({message: "The user with this email was not found"})
      }
      const chechPass = await passwordCompare(password, user.password);
      if (!chechPass) {
        return res.status(400).json({message: "Password is incorrect"})
      }
      const token = await jwtTokenGenerator(user._id, user.email);
      res.json({auth: true, userId: user._id, token: token, message: 'Authorisation successful'});
    } catch (error) {
      res.status(500).json({error, message: 'Authorisation error'});
    }
  }

}

export default new UserController();