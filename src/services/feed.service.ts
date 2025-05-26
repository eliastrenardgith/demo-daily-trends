import FeedModel, { IFeed } from '../model/feed.schema';

class FeedService {
  async createOne(dto: Partial<IFeed>): Promise<IFeed> {
    const newFeed = new FeedModel(dto);

    return newFeed.save();
  }

  async updateOne(id: string, dto: Partial<IFeed>): Promise<IFeed | null> {
    return FeedModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deleteOne(id: string): Promise<IFeed | null> {
    return FeedModel.findByIdAndDelete(id);
  }

  // TODO Implement pagination and query.
  async find(): Promise<IFeed[]> {
    return FeedModel.find({});
  }

  async findOne(id: string): Promise<IFeed | null> {
    return FeedModel.findById(id);
  }
}

export default new FeedService();
