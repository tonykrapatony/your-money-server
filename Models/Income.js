import mongoose from 'mongoose';

const Income = new mongoose.Schema({
  date: {type: String, required: true},
  title: {type: String, required: true},
  value: {type: Number, required: true},
  userId: {type: String, required: true}
})

export default mongoose.model('Income', Income);