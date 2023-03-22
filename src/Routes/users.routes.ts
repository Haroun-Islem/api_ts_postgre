import express, { Request, Response } from 'express';
import { UserController } from '../Controllers/users.controller';

const UserRouter = express.Router();

UserRouter.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await UserController.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

UserRouter.get('/user', async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const users = await UserController.findById(id);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

UserRouter.post('/users', async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, status } = req.body;
    const users = await UserController.create(firstname,lastname,status);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

UserRouter.post('/active', async (req: Request, res: Response) => {
  try {
    const { id, active } = req.body;
    const users = await UserController.setActive(id,active);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

export default UserRouter;
