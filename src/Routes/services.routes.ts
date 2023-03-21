import express, { Request, Response } from 'express';
import { ServicesController } from '../Controllers/services.controller';

const ServiceRouter = express.Router();

ServiceRouter.post('/service', async (req: Request, res: Response) => {
  try {
    const { shift_type } = req.body;
    const users = await ServicesController.createService(shift_type);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

ServiceRouter.post('/users', async (req: Request, res: Response) => {
  try {
    const { ids, service_id } = req.body;
    const users = await ServicesController.createServiceUsers(ids,service_id);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

ServiceRouter.get('/services', async (req: Request, res: Response) => {
  try {
    const users = await ServicesController.findAllServices();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

ServiceRouter.get('/users/services', async (req: Request, res: Response) => {
  try {
    const users = await ServicesController.findAllServicesUser();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

ServiceRouter.get('/service', async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const users = await ServicesController.findServicesById(id);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

ServiceRouter.get('/service/id', async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const users = await ServicesController.findServicesUserByServiceId(id);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

ServiceRouter.get('/user/id', async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const users = await ServicesController.findServicesUserByUserId(id);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

export default ServiceRouter;
