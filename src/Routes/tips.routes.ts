import express, { Request, Response } from 'express';
import { TipsController } from '../Controllers/tips.controller';

const TipsRouter = express.Router();

TipsRouter.post('/tips', async (req: Request, res: Response) => {
  try {
    const { tips, id_restaurantTable, id_service } = req.body;
    const users = await TipsController.addTips(tips, id_restaurantTable, id_service);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

TipsRouter.post('/user/tips', async (req: Request, res: Response) => {
  try {
    const { tips, id_user } = req.body;
    const users = await TipsController.addTipsPayment(tips, id_user);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

TipsRouter.get('/user/tips/week', async (req: Request, res: Response) => {
  try {
    const users = await TipsController.getBestDayTipsByWeek();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

TipsRouter.get('/user/tips/day', async (req: Request, res: Response) => {
  try {
    const users = await TipsController.getAllTipsByWeekAndDay();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

TipsRouter.get('/user/tips/week/total', async (req: Request, res: Response) => {
  try {
    const users = await TipsController.getAllTipsByWeek();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

TipsRouter.get('/user/tips/month', async (req: Request, res: Response) => {
  try {
    const users = await TipsController.getBestWeekTipsByMonth();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

TipsRouter.get('/user/tips/month/week', async (req: Request, res: Response) => {
  try {
    const users = await TipsController.getAllTipsByWeekAndMonth();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

TipsRouter.get('/user/tips/month/total', async (req: Request, res: Response) => {
  try {
    const users = await TipsController.getAllTipsByMonth();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

export default TipsRouter;
