import { Router } from 'express';
import feedController from '../controllers/feed.controller';
import { validationMiddleware } from '../middleware/validation.middleware';
import { UpdateFeedDto } from '../model/dto/update-feed.dto';
import { CreateFeedDto } from '../model/dto/create-feed.dto';

// Feed endpoints:
const feedRouter: Router = Router();

feedRouter.get('/', feedController.get);
feedRouter.get('/:id', feedController.getOne);
feedRouter.post('/', validationMiddleware(CreateFeedDto), feedController.createOne);
feedRouter.put('/:id', validationMiddleware(UpdateFeedDto), feedController.updateOne);
feedRouter.delete('/', feedController.deleteOne);

export {
    feedRouter
};