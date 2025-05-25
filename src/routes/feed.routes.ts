import { Router } from 'express';
import feedController from '../controllers/feed.controller';

const feedRouter: Router = Router();

// Feed endpoints:
feedRouter.get('/', feedController.get);
feedRouter.get('/:id', feedController.getOne);
feedRouter.post('/', feedController.createOne);
feedRouter.put('/', feedController.updateOne);
feedRouter.delete('/', feedController.deleteOne);

export {
    feedRouter
};