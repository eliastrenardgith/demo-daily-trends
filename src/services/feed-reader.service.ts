import axios from 'axios';
import { INews } from '../model/feed.schema';
import * as cheerio from 'cheerio';

class FeedReaderService {
  /**
   * Extract the news from the given URL, doing web scraping with Cheerios.
   *
   * @param url The URL of the news source, like a newspaper.
   * @return An array of news.
   */
  async extractNews(url: string | undefined): Promise<INews[]> {
    try {
      // Get the page content.
      const { data } = await axios.get(url as string);

      // Using cheerio, because it is lightweight, no browser dependencies needed, works in server-side,
      // JQuery approach and works great with static content.
      const $ = cheerio.load(data);

      const news: INews[] = [];

      $('article')
        .toArray()
        .slice(0, 5)
        .forEach((article: any) => {
          const title: string = $(article).find('header a').text().trim();
          const summary: string = $(article).find('p').text().trim();

          if (!!title && !!summary) {
            news.push({
              title,
              summary,
            });
          }
        });
      if (news.length === 0) {
        console.warn(`Could NOT found news doing scraping con ${url}.`);
      }

      return news;
    } catch (error: any) {
      console.error(`Error scraping news from ${url}`);
      throw error;
    }
  }
}

export default new FeedReaderService();
