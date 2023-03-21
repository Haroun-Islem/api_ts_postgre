import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import pool from './data_base';

const app = express();
app.use(express.urlencoded());
app.use(express.json());
dotenv.config();

const connectToDB = async () => {
  try {
    await pool.connect();
  } catch (err) {
    console.log(err);
  }
};



app.get('/test', (req: Request, res: Response, next: NextFunction) => {
  res.send('hi');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
