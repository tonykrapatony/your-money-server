import express from 'express';
import mongoose from 'mongoose'
import 'dotenv/config.js';
import cors from 'cors'
import router from './router.js';


const PORT = process.env.PORT || 5000;

const MONGODB = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.lpldrdz.mongodb.net/your-money`

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/v1/', router);

async function start() {
  try {

    await mongoose.connect(MONGODB);
    app.listen(PORT, () => {console.log('Server started on port ' + PORT)})
  } catch (error) {
    console.log(error)
  }
}

start();

