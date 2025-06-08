import { Document } from 'mongoose';
import { FindFeedDto } from '../model/dto/find-feed.dto';
import { PaginationQueryDto } from '../model/dto/pagination-query.dto';
import FeedModel, { IFeed } from '../model/feed.schema';
import { IPagination } from '../model/interfaces/pagination.interface';
import axios from 'axios';
import { CreateFeedDto } from '../model/dto/create-feed.dto';
import { UpdateFeedDto } from '../model/dto/update-feed.dto';
import { RestApiError } from '../common/rest-api.error';

class FeedService {
  async createOne(dto: CreateFeedDto): Promise<IFeed> {
    try {
      if (!(await this.newsExists(dto.url))) {
        throw new RestApiError(400, `News page not found for URL: ${dto.url}`);
      }

      const newFeed = new FeedModel({ ...dto, newsPaperUrl: this.getNewsPaperUrl(dto.url) });
      return newFeed.save();
    } catch (error) {
      console.error('Error creating Feed.');
      throw error;
    }
  }

  async updateOne(id: string, dto: UpdateFeedDto): Promise<IFeed | null> {
    try {
      if (dto.url && !(await this.newsExists(dto.url))) {
        throw new RestApiError(400, `News page not found for URL: ${dto.url}`);
      }

      return FeedModel.findByIdAndUpdate(id, { ...dto }, { new: true });
    } catch (error) {
      console.error('Error updating Feed.');
      throw error;
    }
  }

  async deleteOne(id: string): Promise<IFeed | null> {
    try {
      return FeedModel.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting Feed.');
      throw error;
    }
  }

  async find(pagination?: PaginationQueryDto, searchDto?: FindFeedDto): Promise<IPagination<IFeed>> {
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
    try {
      return FeedModel.findById(id);
    } catch (error) {
      console.error(`Error finding feed by id: ${id}`);
      throw error;
    }
  }

  async findOneByUrl(url: string): Promise<Document<IFeed> | null> {
    try {
      return FeedModel.findOne({ url }, null, {});
    } catch (error) {
      console.error(`Error finding one feed by URL: '${url}'.`);
      throw error;
    }
  }

  /**
   * Check if the URL works.
   *
   * @param newsUrl The news URL.
   */
  private async newsExists(newsUrl: string): Promise<boolean> {
    try {
      const { status } = await axios.get(newsUrl);

      return status === 200;
    } catch (error) {
      return false;
    }
  }

  private getNewsPaperUrl(url: string): string {
    const urlObj: URL = new URL(url);

    return urlObj.origin;
  }
}

export default new FeedService();
