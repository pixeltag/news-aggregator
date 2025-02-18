export interface NewsInterface {
  id: number;
  title: string;
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
}

export interface NewsApiInterface {
  status: string;
  totalResults: number;
  articles: NewsInterface[];
}
