import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import pool from './data_base';
import UserRouter from './Routes/users.routes';
import ServiceRouter from './Routes/services.routes';
import TipsRouter from './Routes/tips.routes';

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

connectToDB();
app.use('/user', UserRouter);
app.use('/service', ServiceRouter);
app.use('/tips', TipsRouter);

app.get('/test', (req: Request, res: Response, next: NextFunction) => {
  res.send('hi');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
