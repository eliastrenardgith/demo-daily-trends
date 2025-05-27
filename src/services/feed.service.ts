import { FindFeedDto } from '../model/dto/find-feed.dto';
import { PaginationQueryDto } from '../model/dto/pagination-query.dto';
import FeedModel, { IFeed, INews } from '../model/feed.schema';
import { IPagination } from '../model/interfaces/pagination.interface';
import feedReaderService from './feed-reader.service';

class FeedService {
  async createOne(dto: Partial<IFeed>): Promise<IFeed> {
    try {
      const news: INews[] = await feedReaderService.extractNews(dto.url);

      const newFeed = new FeedModel({
        ...dto,
        news,
      });
      return newFeed.save();
    } catch (error) {
      console.error('Error creating Feed.');
      throw error;
    }
  }

  async updateOne(id: string, dto: Partial<IFeed>): Promise<IFeed | null> {
    const news: INews[] = await feedReaderService.extractNews(dto.url);

    return FeedModel.findByIdAndUpdate(id, { ...dto, news }, { new: true });
  }

  async deleteOne(id: string): Promise<IFeed | null> {
    return FeedModel.findByIdAndDelete(id);
  }

  async find(pagination?: PaginationQueryDto, searchDto?: FindFeedDto): Promise<IPagination> {
    try {
      let filter: any = {};

      if (searchDto?.searchTerm) {
        // A regular expression to match case-sensitive.
        const searchRegex = new RegExp(searchDto.searchTerm, 'i');

        filter = {
          $or: [{ url: { $regex: searchRegex } }, { name: { $regex: searchRegex } }],
        };
      }

      const limit: number = pagination?.limit || 5;
      const page: number = pagination?.page || 1;
      const skip: number = (page - 1) * limit;

      const totalFound = await FeedModel.countDocuments();

      const feeds: IFeed[] = await FeedModel.find(filter).skip(skip).limit(limit);

      const totalPages = Math.ceil(totalFound / limit);

      return {
        page,
        totalCount: totalFound,
        totalPages,
        items: feeds,
      };
    } catch (error: any) {
      console.error(`Error searching feeds. ${JSON.stringify({ searchDto, pagination })}`);
      throw error;
    }
  }

  async findOne(id: string): Promise<IFeed | null> {
    return FeedModel.findById(id);
  }
}

export default new FeedService();
