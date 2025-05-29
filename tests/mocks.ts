import { CreateFeedDto } from '../src/model/dto/create-feed.dto';
import { IFeed, INews } from '../src/model/feed.schema';
import { IPagination } from '../src/model/interfaces/pagination.interface';

export const feedDtoMock: CreateFeedDto = {
  url: 'https://dailytest.com',
};

export const newsMock1: INews = {
  title: 'News 1',
  summary: 'This is the news summary.',
  url: 'https://dailytest.com/news1',
};

export const newsMock2: INews = {
  title: 'News 2',
  summary: 'This is the news summary.',
  url: 'https://dailytest.com/news2',
};

export const newsMock3: INews = {
  title: 'News 3',
  summary: 'This is the news summary.',
  url: 'https://dailytest.com/news3',
};

export const newsMock4: INews = {
  title: 'News 4',
  summary: 'This is the news summary.',
  url: 'https://dailytest.com/news4',
};

export const newsMock5: INews = {
  title: 'News 5',
  summary: 'This is the news summary.',
  url: 'https://dailytest.com/news5',
};

export const savedFeedMock = {
  _id: '1234',
  url: 'https://dailytest.com',
  news: [newsMock1, newsMock2, newsMock3, newsMock4, newsMock5],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const updateFeedDtoMock: CreateFeedDto = {
  url: 'https://dailytestCHANGED.com',
};

export const updatedFeedMock = {
  _id: '1234',
  url: 'https://dailytestCHANGED.com',
  news: [newsMock1, newsMock2, newsMock3, newsMock4, newsMock5],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const searchFeedResult: IPagination = {
  page: 1,
  totalCount: 2,
  totalPages: 1,
  items: [savedFeedMock, updatedFeedMock],
};

export const htmlMockArticleElPais = `
<div>
    <article>
        <header>
            <a href="https://elpais.com//article/123">Article title</a>
        </header>
        <p>Article summary</p>
    </article>
</div>
`;

export const htmlMockArticleElMundo = `
<div>
    <article>
        <header>
            <a href="https://elmundo.es/article/123">
                <h2>Article title</h2>
            </a>
        </header>
        <p>Article summary</p>
    </article>
</div>   
`;

export const dailytestHtmPageMock: string = `
<div>
  <div>
      <article>
          <header>
              <a href="https://dailytest.com/news1">News 1</a>
          </header>
          <p>This is the news summary.</p>
      </article>
  </div>
  <div>
      <article>
          <header>
              <a href="https://dailytest.com/news2">News 2</a>
          </header>
          <p>This is the news summary.</p>
      </article>
  </div>
  <div>
      <article>
          <header>
              <a href="https://dailytest.com/news3">News 3</a>
          </header>
          <p>This is the news summary.</p>
      </article>
  </div>
  <div>
      <article>
          <header>
              <a href="https://dailytest.com/news4">News 4</a>
          </header>
          <p>This is the news summary.</p>
      </article>
  </div>
  <div>
      <article>
          <header>
              <a href="https://dailytest.com/news5">News 5</a>
          </header>
          <p>This is the news summary.</p>
      </article>
  </div>
</div>
`;

export const dailytestHtmPageBadMock: string = `
<div>
  <div>
      <article>
      </article>
  </div>
  <div>
      <article>
      </article>
  </div>
  <div>
      <article>
      </article>
  </div>
  <div>
      <article>
      
      </article>
  </div>
  <div>
      <article>
          <p>This is the news summary.</p>
      </article>
  </div>
</div>
`;
