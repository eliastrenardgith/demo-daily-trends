import { Router } from 'express';
import feedController from '../controllers/feed.controller';
import { bodyMiddleware, paramsMiddleware } from '../middleware/validation.middleware';
import { UpdateFeedDto } from '../model/dto/update-feed.dto';
import { CreateFeedDto } from '../model/dto/create-feed.dto';
import { CrudUrlParamsDto } from '../model/dto/crud-url-params.dto';

const feedRouter: Router = Router();

feedRouter.get('/', feedController.get);
feedRouter.get('/:id', paramsMiddleware(CrudUrlParamsDto), feedController.getOne);
feedRouter.post('/', bodyMiddleware(CreateFeedDto), feedController.createOne);
feedRouter.put('/:id', paramsMiddleware(CrudUrlParamsDto), bodyMiddleware(UpdateFeedDto), feedController.updateOne);
feedRouter.delete('/:id', feedController.deleteOne);

export { feedRouter };
