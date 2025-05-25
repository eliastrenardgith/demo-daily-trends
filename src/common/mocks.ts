import { IFeed } from "model/feed.interface";

const feedMockElPais: IFeed = { id: '123', name: 'El pais', url: 'https://elpais.com/'};
const feedMockElMundo: IFeed = { id: '456', name: 'El pais', url: 'https://elpais.com/'};

const feedMockList: IFeed[] = [ feedMockElMundo, feedMockElPais ];

export {
    feedMockElMundo,
    feedMockElPais,
    feedMockList
}