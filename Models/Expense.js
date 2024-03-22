import mongoose from 'mongoose';

const Expense = new mongoose.Schema({
  title: {type: String, required: true},
  value: {type: Number, required: true},
  category: {type: String, required: true},
  userId: {type: String, required: true}
})

export default mongoose.model('Expense', Expense);