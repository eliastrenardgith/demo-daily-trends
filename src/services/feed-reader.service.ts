import { INews } from '../model/feed.schema';

class FeedReaderService {
  async extractNews(url: string | undefined): Promise<INews[]> {
    try {
      return [
        { title: 'News 1', summary: 'This is the new summary.', imageUrl: 'https://cdn.someurl.com/img1.png' },
        { title: 'News 2', summary: 'This is the new summary.', imageUrl: 'https://cdn.someurl.com/img1.png' },
        { title: 'News 3', summary: 'This is the new summary.', imageUrl: 'https://cdn.someurl.com/img1.png' },
        { title: 'News 4', summary: 'This is the new summary.', imageUrl: 'https://cdn.someurl.com/img1.png' },
        { title: 'News 5', summary: 'This is the new summary.', imageUrl: 'https://cdn.someurl.com/img1.png' },
      ];
    } catch (error: any) {
      console.error(`Error scraping news from ${url}`);
      throw error;
    }
  }
}

export default new FeedReaderService();
