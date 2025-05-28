import axios from 'axios';
import { INews } from '../model/feed.schema';
import * as cheerio from 'cheerio';
import config from '../config';
import { IPartialScraper, SummaryScrapers, TitleScrapers } from './strategies/scraping.strategies';

class FeedReaderService {
  /**
   * Extracts the news from the given URL, doing web scraping with Cheerios.
   *
   * @param url The URL of the news source, like a newspaper.
   * @return An array of news.
   */
  async extractNews(url: string): Promise<INews[]> {
    try {
      // Get the page content.
      const { data } = await axios.get(url);

      // Using cheerio, because it is lightweight, no browser dependencies needed, works in server-side,
      // JQuery approach and works great with static content.
      const $ = cheerio.load(data);

      const news: INews[] = [];

      const articles: any = $('article').toArray().slice(0, config.feed.maxNewsCount);

      for (const articleHtml of articles) {
        const newsObj: INews | null = await this.scrapNews($, articleHtml);
        newsObj && news.push(newsObj as INews);
      }

      if (news.length === 0) {
        console.warn(`Could NOT found news doing scraping con ${url}.`);
      }

      return news;
    } catch (error: any) {
      console.error(`Error scraping news from ${url}`);
      throw error;
    }
  }

  private async scrapNews($: cheerio.CheerioAPI, articleHtmlElement: any): Promise<INews | null> {
    const title: string | null = await this.scrapSpecific($, articleHtmlElement, TitleScrapers);
    const summary: string | null = await this.scrapSpecific($, articleHtmlElement, SummaryScrapers);

    if (!title) {
      return null;
    }

    return {
      title: title as string,
      summary: summary as string,
    };
  }

  private async scrapSpecific(
    $: cheerio.CheerioAPI,
    articleHtmlElement: any,
    scrapers: IPartialScraper[],
  ): Promise<string | null> {
    let result: string | null = null;

    // Test all the strategies and return the first valid result.
    for (const scraperStrategy of scrapers) {
      result = await scraperStrategy.scrap($, articleHtmlElement);

      if (!!result) break;
    }

    return result;
  }
}

export default new FeedReaderService();
