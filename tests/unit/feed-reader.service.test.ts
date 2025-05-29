import axios from 'axios';
import {
  dailytestHtmPageBadMock,
  dailytestHtmPageMock,
  newsMock1,
  newsMock2,
  newsMock3,
  newsMock4,
  newsMock5,
} from '../mocks';
import { INews } from '../../src/model/feed.schema';
import feedReaderService from '../../src/services/feed-reader.service';

// 1. Mock the entire 'axios' module
jest.mock('axios');

// 2. Cast the mocked axios to JestMocked for better type inference
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FeedReaderService', () => {
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    // Suppress console.error and console.warn during tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    // Clear all mocks before each test to ensure tests are isolated
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore console.error after each test
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });
  describe('extractNews', () => {
    it('should extract the news', async () => {
      mockedAxios.get.mockResolvedValue({
        data: dailytestHtmPageMock,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        request: {},
      });

      const scrapedNews: INews[] = await feedReaderService.extractNews('https://dailytest.com');

      expect(scrapedNews).toEqual([newsMock1, newsMock2, newsMock3, newsMock4, newsMock5]);
    });

    it('should not return news, if the news title is not extracted', async () => {
      mockedAxios.get.mockResolvedValue({
        data: dailytestHtmPageBadMock,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        request: {},
      });

      const scrapedNews: INews[] = await feedReaderService.extractNews('https://dailytest.com');

      expect(scrapedNews).toEqual([]);
    });
  });
});
