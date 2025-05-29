import { NextFunction, Request, Response } from 'express';
import { RestApiError } from '../common/rest-api.error';
import feedService from '../services/feed.service';
import { IFeed } from '../model/feed.schema';
import { Document } from 'mongoose';

/**
 * Using a function in this case, because a private method can have side effect in the Express,
 * when the 'this' context is lost. This would cause an exception of undefined method and
 * a 500 Error response.
 */
const responseNotFound = (response: Response) => {
  response.status(404).json({ message: 'Not found.' });
};

const ERROR_MESSAGE_DUPLICATED_URL = 'Conflict: A Feed with that URL already exist. Duplication is NOT ALLOWED.';

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
      const feedUrl: string = (request.body as IFeed).url;
      const existentFeed: Document<IFeed> | null = await feedService.findOneByUrl(feedUrl);

      if (existentFeed) {
        response.status(409).json({
          message: ERROR_MESSAGE_DUPLICATED_URL,
        });
      } else {
        const newFeed: IFeed = await feedService.createOne(request.body as IFeed);
        response.status(201).json(newFeed);
      }
    } catch (error: any) {
      // Handle specific errors.
      let statusCode: number = 500;
      let errorMessage: string = 'Error creating feed.';

      // E11000 duplicate key error collection, in case of race codition, like replicas.
      if (error?.code === 11000) {
        statusCode = 409;
        errorMessage = ERROR_MESSAGE_DUPLICATED_URL;
      }

      next(new RestApiError(statusCode, errorMessage, { error }));
    }
  }

  async updateOne(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const feedUrl: string = (request.body as IFeed).url;
      const existentFeedDoc: Document<IFeed> | null = await feedService.findOneByUrl(feedUrl);

      if (existentFeedDoc && existentFeedDoc.id !== request.params.id) {
        // There is already another document, with the same URL.
        response.status(409).json({
          message: ERROR_MESSAGE_DUPLICATED_URL,
        });
      } else {
        const updatedFeed: IFeed | null = await feedService.updateOne(request.params.id, request.body);

        if (updatedFeed) {
          response.status(200).json(updatedFeed);
        } else {
          responseNotFound(response);
        }
      }
    } catch (error: any) {
      // Handle specific errors.
      let statusCode: number = 500;
      let errorMessage: string = 'Error updating feed.';

      // E11000 duplicate key error collection, in case of race codition, like replicas.
      if (error?.code === 11000) {
        statusCode = 409;
        errorMessage = ERROR_MESSAGE_DUPLICATED_URL;
      }

      next(new RestApiError(statusCode, errorMessage, { error }));
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
