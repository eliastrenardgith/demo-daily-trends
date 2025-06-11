import * as cheerio from 'cheerio';
import axios from 'axios';
import config from '../../config';

/**
 * Implementation of the Strategy Pattern to allow different ways to extract each property of the news,
 * like the title or the summary.
 *
 * This also allow extension, if there is a new property for the news.
 */

/**
 * Defines a common strategy interface.
 */
export interface IPartialScraper {
  scrap($: cheerio.CheerioAPI, articleHtmlElement: any): string | null;
}

/**
 * Defines a strategy to extract the title, from a web page like https://elpais.com/.
 */
export class TitleScraperElPais implements IPartialScraper {
  scrap($: cheerio.CheerioAPI, articleHtmlElement: any): string | null {
    try {
      return $(articleHtmlElement).find('header a').text().trim();
    } catch (error) {
      return null;
    }
  }
}

/**
 * Defines a strategy to extract the summary, from a web page like https://elpais.com/.
 */
export class SummaryScraperElPais implements IPartialScraper {
  scrap($: cheerio.CheerioAPI, articleHtmlElement: any): string | null {
    try {
      return $(articleHtmlElement).find('p').text().trim();
    } catch (error) {
      return null;
    }
  }
}

/**
 * Defines a strategy to extract the title, from a web page like https://www.elmundo.es/.
 */
export class TitleScraperElMundo implements IPartialScraper {
  scrap($: cheerio.CheerioAPI, articleHtmlElement: any): string | null {
    try {
      // TODO: Normalize characters �.
      return $(articleHtmlElement).find('header a h2').text().trim();
    } catch (error) {
      return null;
    }
  }
}

/**
 * Defines a strategy to extract the url of a new.
 * So far, it works with https://elpais.com/ and https://www.elmundo.es/.
 */
export class UrlScrapper implements IPartialScraper {
  scrap($: cheerio.CheerioAPI, articleHtmlElement: any): string | null {
    try {
      // TODO: Normalize characters �.
      return $(articleHtmlElement).find('header a').attr('href') as string;
    } catch (error) {
      return null;
    }
  }
}

export const TitleScrapers: IPartialScraper[] = [
  new TitleScraperElPais(),
  new TitleScraperElMundo(),
  // Add more title scraping strategies to extract the news title.
];

export const SummaryScrapers: IPartialScraper[] = [
  new SummaryScraperElPais(),
  // elmundo.es does not have news summary in its main page.
  // Add more summary scraping strategies to extract the news summary.
];

export interface IScraperStrategy<T> {
  target: string;
  scraper: T;
}

export interface INews {
  url: string;
  title: string;
  summary: string;
}

export interface INewsScraper {
  /**
   *
   * @param $
   * @param homePageArticleHtml
   */
  getNews(): Promise<INews[]>;
}

export class ElPaisScraper implements INewsScraper {
  static readonly target: string = 'https://elpais.com/';

  async getNews(): Promise<INews[]> {
    // Get the page content.
    const { data } = await axios.get(ElPaisScraper.target);

    // Using cheerio, because it is lightweight, no browser dependencies needed, works in server-side,
    // JQuery approach and works great with static content.
    const $ = cheerio.load(data);

    const scrapedNews: INews[] = [];

    // Extract article tags in the front
    const articles: any = $('article').toArray().slice(0, config.feed.maxNewsCount);
    const urlScraper: IPartialScraper = new UrlScrapper();
    const titleScraper: IPartialScraper = new TitleScraperElPais();
    const summaryScraper: IPartialScraper = new SummaryScraperElPais();

    for (const articleHtml of articles) {
      const url: string | null = urlScraper.scrap($, articleHtml);
      const title: string | null = titleScraper.scrap($, articleHtml);
      const summary: string | null = summaryScraper.scrap($, articleHtml);

      !!url && !!title && !!summary && scrapedNews.push({ url, title, summary });
    }

    return scrapedNews;
  }
}

export class ElMundoScraper implements INewsScraper {
  static readonly target: string = 'https://www.elmundo.es/';

  async getNews(): Promise<INews[]> {
    // Get the page content.
    const { data } = await axios.get(ElMundoScraper.target);

    // Using cheerio, because it is lightweight, no browser dependencies needed, works in server-side,
    // JQuery approach and works great with static content.
    const $ = cheerio.load(data);

    const scrapedNews: INews[] = [];

    // // Extract article tags in the front
    // const articles: any = $('article').toArray().slice(0, config.feed.maxNewsCount);
    // const urlScraper: IPartialScraper = new UrlScrapper();
    // const titleScraper: IPartialScraper = new TitleScraperElMundo();
    // // TODO: Scrap the summary going to the article, using its url.

    // for (const articleHtml of articles) {
    //   const url: string | null = urlScraper.scrap($, articleHtml);
    //   const title: string | null = titleScraper.scrap($, articleHtml);

    //   !!url && !!title && !!summary && scrapedNews.push({ url, title, summary });
    // }

    return scrapedNews;
  }
}

const SCRAPING_STRATEGIES: IScraperStrategy<INewsScraper>[] = [
  // Register more scrapers here.
  {
    target: 'https://elpais.com/',
    scraper: new ElPaisScraper(),
  },
  {
    target: 'https://www.elmundo.es/',
    scraper: new ElMundoScraper(),
  },
];

export function getScraper(url: string): INewsScraper | null {
  const strategy: IScraperStrategy<INewsScraper> | undefined = SCRAPING_STRATEGIES.find(
    (s: IScraperStrategy<INewsScraper>) => s.target === url,
  );

  if (strategy) {
    return strategy.scraper;
  }

  return null;
}

export const UrlScrappers: IPartialScraper[] = [new UrlScrapper()];
