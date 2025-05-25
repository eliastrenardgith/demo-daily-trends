import { IFeed } from "model/feed.interface";
import { feedMockElMundo, feedMockList } from "../common/mocks";
import { NextFunction, Request, Response } from "express";
import { RestApiError } from "../common/rest-api.error";

export class FeedController {
    // TODO Add pagination.
    async get(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            response.status(200).json(feedMockList);
        } catch (error: any) {
            next(new RestApiError(
                500,
                'Error fetching feeds.',
                { error }
            ));
        }
    }

    async getOne(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            response.status(200).json(
                feedMockList.filter((feed: IFeed) => ( feed.id === request.params?.id ))
            );
        } catch (error: any) {
            next(new RestApiError(
                500,
                'Error fetching feed.',
                { error }
            ));
        }
    }

    async createOne(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            response.status(201).json(feedMockElMundo);
        } catch (error: any) {
            next(new RestApiError(
                500,
                'Error creating feed.',
                { error }
            ));
        }
    }

    async updateOne(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            response.status(200).json(feedMockElMundo);
        } catch (error: any) {
            next(new RestApiError(
                500,
                'Error updating one feed.',
                { error }
            ));
        }

    }

    async deleteOne(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            response.status(200).json(feedMockElMundo);
        } catch (error: any) {
            next(new RestApiError(
                500,
                'Error deleting one feed.',
                { error }
            ));
        }

    }
}

export default new FeedController();