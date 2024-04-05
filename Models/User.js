import mongoose from 'mongoose';

const User = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  photo: {type: String},
  currency: {type: String},
  password: {type: String, required: true},
})

export default mongoose.model('User', User);