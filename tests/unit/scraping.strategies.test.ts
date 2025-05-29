import {
  SummaryScraperElPais,
  TitleScraperElMundo,
  TitleScraperElPais,
  UrlScrapper,
} from '../../src/services/strategies/scraping.strategies';
import * as cheerio from 'cheerio';
import { htmlMockArticleElMundo, htmlMockArticleElPais } from '../mocks';

// TODO: Cover the catch blocks in the scrapers.

describe('PartialScraper', () => {
  describe('TitleScraperElPais', () => {
    it('should extract article title similar to those in elpais.com', () => {
      const titleScraper: TitleScraperElPais = new TitleScraperElPais();
      const $ = cheerio.load(htmlMockArticleElPais);
      const article: any = $('article');

      const result: string | null = titleScraper.scrap($, article);

      expect(result).not.toBeNull();
      expect(result).toBe('Article title');
    });
  });

  describe('TitleScraperElMundo', () => {
    it('should extract article title similar to those in elmundo.es', () => {
      const titleScraper: TitleScraperElMundo = new TitleScraperElMundo();
      const $ = cheerio.load(htmlMockArticleElMundo);
      const article: any = $('article');

      const result: string | null = titleScraper.scrap($, article);

      expect(result).not.toBeNull();
      expect(result).toBe('Article title');
    });
  });

  describe('SummaryScraperElPais', () => {
    it('should extract article title similar to those in elpais.com', () => {
      const summaryScraper: SummaryScraperElPais = new SummaryScraperElPais();
      const $ = cheerio.load(htmlMockArticleElPais);
      const article: any = $('article');

      const result: string | null = summaryScraper.scrap($, article);

      expect(result).not.toBeNull();
      expect(result).toBe('Article summary');
    });
  });

  describe('UrlScrapper', () => {
    it('should extract article url', () => {
      const urlScraper: UrlScrapper = new UrlScrapper();
      const $ = cheerio.load(htmlMockArticleElPais);
      const article: any = $('article');

      const result: string | null = urlScraper.scrap($, article);

      expect(result).not.toBeNull();
      expect(result).toBe('https://elpais.com//article/123');
    });
  });
});
