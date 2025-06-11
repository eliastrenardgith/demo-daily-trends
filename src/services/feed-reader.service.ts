import * as cheerio from 'cheerio';
import {
  getScraper,
  INews,
  INewsScraper,
  IPartialScraper,
  SummaryScrapers,
  TitleScrapers,
  UrlScrappers,
} from './strategies/scraping.strategies';

class FeedReaderService {
  /**
   * Extracts the news from the given URL, doing web scraping with Cheerios.
   *
   * @param url The URL of the news source, like a newspaper.
   * @return An array of news.
   */
  async extractNews(url: string): Promise<INews[]> {
    try {
      const scraper: INewsScraper | null = getScraper(url);

      if (!scraper) {
        return [];
      }

      return scraper.getNews();
    } catch (error: any) {
      console.error(`Error scraping news from ${url}`);
      throw error;
    }
  }
}

export default new FeedReaderService();
