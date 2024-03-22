import mongoose from 'mongoose';

const Income = new mongoose.Schema({
  title: {type: String, required: true},
  value: {type: Number, required: true},
  userId: {type: String, required: true}
})

export default mongoose.model('Income', Income);