import { IFeed } from "model/feed.interface";
import { feedMockElMundo, feedMockList } from "../common/mocks";
import { NextFunction, Request, Response } from "express";
import { RestApiError } from "../common/rest-api.error";

export class FeedController {
    async get(request: Request, response: Response, next: NextFunction): Promise<void> {

            throw new Error('Testing NON catched exceptions.');
        try {

            throw new Error('Testing catched exceptions.');
            // response.status(200).json(feedMockList);
        } catch (error: any) {
            next(new RestApiError(
                500,
                'Error fetching users.',
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
            this.handleGeneralError(error, 'Error fetching one feed.');
        }
    }

    async createOne(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            response.status(201).json(feedMockElMundo);
        } catch (error: any) {
            this.handleGeneralError(error, 'Error creating one feed.');
        }
    }

    async updateOne(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            response.status(200).json(feedMockElMundo);
        } catch (error: any) {
            this.handleGeneralError(error, 'Error updating one feed.');
        }

    }

    async deleteOne(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            response.status(200).json(feedMockElMundo);
        } catch (error: any) {
            this.handleGeneralError(error, 'Error deleting one feed.');
        }

    }

    private handleGeneralError(error: any, message?: string): void {
        console.error(message || 'Unexpected error.');
        error && console.error(JSON.stringify({ error }));
    }
}

export default new FeedController();