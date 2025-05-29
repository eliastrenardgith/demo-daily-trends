import * as cheerio from 'cheerio';

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
 * So far, it works with https://www.elmundo.es/ and https://www.elmundo.es/.
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

export const UrlScrappers: IPartialScraper[] = [new UrlScrapper()];
