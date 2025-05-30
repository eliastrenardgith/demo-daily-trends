import request from 'supertest';
import app from '../../src/app';
import FeedModel, { IFeed } from '../../src/model/feed.schema';
import { feedDtoMock, savedFeedMock, scrapedNewsMock, updateFeedDtoMock } from '../mocks';
import feedReaderService from '../../src/services/feed-reader.service';

describe('FeedController. REST-API integration with MongoDB.', () => {
  const baseUrl: string = '/api/feed';
  let createdFeedId: string;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;
  let feedReaderServiceSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    feedReaderServiceSpy = jest.spyOn(feedReaderService, 'extractNews').mockResolvedValue(scrapedNewsMock);
    // Spy on console.error, console.log and mock its implementation to do nothing
    // This prevents console messages from polluting test output
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore the original console.error implementation after each test
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
    feedReaderServiceSpy.mockRestore();
  });

  describe('POST /feed', () => {
    it('should create a feed', async () => {
      (feedReaderService.extractNews as jest.Mock).mockResolvedValue(scrapedNewsMock);
      const { body } = await request(app).post(baseUrl).send(feedDtoMock).expect(201);

      expect(body).toHaveProperty('_id');
      expect((body as IFeed).url).toBe(feedDtoMock.url);
      createdFeedId = body._id;
    });
  });

  describe('GET /feed:id', () => {
    it('should get one feed', async () => {
      const { body } = await request(app).get(`${baseUrl}/${createdFeedId}`).send().expect(200);

      expect(body).toHaveProperty('_id');
      expect(body._id).toBe(createdFeedId);
      expect(body.url).toBe(feedDtoMock.url);
    });
  });

  describe('PUT /feed/:id', () => {
    it('should update one feed', async () => {
      const { body } = await request(app).put(`${baseUrl}/${createdFeedId}`).send(updateFeedDtoMock).expect(200);

      expect(body).toHaveProperty('_id');
      expect(body._id).toBe(createdFeedId);
      expect(body.url).toBe(updateFeedDtoMock.url);
    });
  });

  describe('DELETE /feed/:id', () => {
    // Keep this test at the end for now.
    it('should delete one feed', async () => {
      await request(app).del(`${baseUrl}/${createdFeedId}`).send(updateFeedDtoMock).expect(204);
    });
  });
});
