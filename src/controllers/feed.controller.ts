import { NextFunction, Request, Response } from 'express';
import { RestApiError } from '../common/rest-api.error';
import feedService from '../services/feed.service';
import { IFeed } from '../model/feed.schema';

const responseNotFound = (response: Response) => {
  response.status(404).json({ message: 'Not found.' });
};

export class FeedController {
  async get(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { limit, page, searchTerm } = request.query;

      response
        .status(200)
        .json(
          await feedService.find(
            { limit: Number.parseInt(limit as string), page: Number.parseInt(page as string) },
            { searchTerm: searchTerm as string },
          ),
        );
    } catch (error: any) {
      next(new RestApiError(500, 'Error fetching feeds.', { error }));
    }
  }

  async getOne(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const feed: IFeed | null = await feedService.findOne(request.params.id);

      if (feed) {
        response.status(200).json(feed);
      } else {
        responseNotFound(response);
      }
    } catch (error: any) {
      next(new RestApiError(500, 'Error fetching feed.', { error }));
    }
  }

  async createOne(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const newFeed: IFeed = await feedService.createOne(request.body as IFeed);

      response.status(201).json(newFeed);
    } catch (error: any) {
      next(new RestApiError(500, 'Error creating feed.', { error }));
    }
  }

  async updateOne(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const updatedFeed: IFeed | null = await feedService.updateOne(request.params.id, request.body);

      if (updatedFeed) {
        response.status(200).json(updatedFeed);
      } else {
        responseNotFound(response);
      }
    } catch (error: any) {
      next(new RestApiError(500, 'Error updating one feed.', { error }));
    }
  }

  async deleteOne(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const deletedIFeed: IFeed | null = await feedService.deleteOne(request.params.id);

      if (deletedIFeed) {
        response.status(204).json();
      } else {
        responseNotFound(response);
      }
    } catch (error: any) {
      next(new RestApiError(500, 'Error deleting one feed.', { error }));
    }
  }
}

export default new FeedController();
