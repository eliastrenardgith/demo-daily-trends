import FeedService from '../../src/services/feed.service';
import FeedModel, { IFeed } from '../../src/model/feed.schema';
import FeedReaderService from '../../src/services/feed-reader.service';
import {
  feedDtoMock,
  newsMock1,
  newsMock2,
  newsMock3,
  newsMock4,
  newsMock5,
  savedFeedMock,
  searchFeedResult,
  updatedFeedMock,
  updateFeedDtoMock,
} from '../mocks';
import { IPagination } from '../../src/model/interfaces/pagination.interface';

jest.mock('../../src/model/feed.schema');
jest.mock('../../src/services/feed-reader.service');

describe('UserService', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    // Spy on console.error and mock its implementation to do nothing
    // This prevents console.error messages from polluting test output
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore the original console.error implementation after each test
    consoleErrorSpy.mockRestore();
  });

  describe('createOne', () => {
    it('should create one feed', async () => {
      (FeedModel.prototype.save as jest.Mock).mockResolvedValue(savedFeedMock);
      (FeedReaderService.extractNews as jest.Mock).mockResolvedValue([
        newsMock1,
        newsMock2,
        newsMock3,
        newsMock4,
        newsMock5,
      ]);

      const newFeed: IFeed = await FeedService.createOne(feedDtoMock);

      //   expect(FeedModel).toHaveBeenCalledWith(feedDtoMock);
      expect(FeedModel.prototype.save).toHaveBeenCalledTimes(1);
      expect(FeedReaderService.extractNews).toHaveBeenCalledTimes(1);
      expect(newFeed).toEqual(savedFeedMock);
    });

    it('should propagate error in the feed creation process', async () => {
      (FeedReaderService.extractNews as jest.Mock).mockRejectedValue(new Error());

      await expect(FeedService.createOne(feedDtoMock)).rejects.toThrow(Error);
    });
  });

  describe('updateOne', () => {
    it('should update one feed', async () => {
      (FeedModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedFeedMock);
      (FeedReaderService.extractNews as jest.Mock).mockResolvedValue([
        newsMock1,
        newsMock2,
        newsMock3,
        newsMock4,
        newsMock5,
      ]);

      const updatedFeed: IFeed | null = await FeedService.updateOne(savedFeedMock._id, updateFeedDtoMock);

      //   expect(FeedModel).toHaveBeenCalledWith(feedDtoMock);
      expect(FeedModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(FeedReaderService.extractNews).toHaveBeenCalledTimes(1);
      expect(updatedFeed).toEqual(updatedFeedMock);
    });

    it('should propagate error in the feed update process', async () => {
      (FeedReaderService.extractNews as jest.Mock).mockRejectedValue(new Error());

      await expect(FeedService.updateOne(savedFeedMock._id, feedDtoMock)).rejects.toThrow(Error);
    });
  });

  describe('deleteOne', () => {
    it('should delete one feed', async () => {
      (FeedModel.findByIdAndDelete as jest.Mock).mockResolvedValue(savedFeedMock);

      const deletedFeed: IFeed | null = await FeedService.deleteOne(savedFeedMock._id);

      expect(FeedModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
      expect(deletedFeed).toEqual(savedFeedMock);
    });

    it('should propagate error in the feed delete process', async () => {
      (FeedModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error());
      await expect(FeedService.deleteOne(savedFeedMock._id)).rejects.toThrow(Error);

      // --- The key lines for coverage ---
      // Force a microtask queue flush to ensure console.error is fully processed
      //   await new Promise((resolve) => process.nextTick(resolve));

      //   expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should find one feed', async () => {
      (FeedModel.findById as jest.Mock).mockResolvedValue(savedFeedMock);

      const foundFeed: IFeed | null = await FeedService.findOne(savedFeedMock._id);

      expect(FeedModel.findById).toHaveBeenCalledTimes(1);
      expect(foundFeed).toEqual(savedFeedMock);
    });

    it('should propagate error finding one feed', async () => {
      (FeedModel.findById as jest.Mock).mockRejectedValue(new Error());
      await expect(FeedService.findOne(savedFeedMock._id)).rejects.toThrow(Error);
    });
  });

  describe('find', () => {
    it('should propagate error searching feeds', async () => {
      (FeedModel.countDocuments as jest.Mock).mockRejectedValue(new Error());
      await expect(FeedService.find({}, { searchTerm: 'dailytest' })).rejects.toThrow(Error);
    });

    it('should find feed by search term and return a pagination', async () => {
      (FeedModel.countDocuments as jest.Mock).mockResolvedValue(2);
      (FeedModel.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([savedFeedMock, updatedFeedMock]),
      } as any);

      const foundFeeds: IPagination = await FeedService.find({}, { searchTerm: 'test' });

      expect(FeedModel.countDocuments).toHaveBeenCalledTimes(1);
      expect(FeedModel.find).toHaveBeenCalledTimes(1);
      expect(foundFeeds).toEqual(searchFeedResult);
    });
  });
});
