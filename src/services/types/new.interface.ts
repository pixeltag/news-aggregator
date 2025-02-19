export interface NewsInterface {
  id: number;
  title: string;
  author: string | null;
  content: string;
  description: string;
  publishedAt: string;
  urlToImage: string | null;
  url: string;
}

export interface NewsApiInterface {
  status: string;
  totalResults: number;
  articles: NewsInterface[];
}

export interface GuardianInterface {
  id: number;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}

export interface GuardianResponseInterface {
  status: string;
  userTier: string;
  total: number;
  startIndex: number;
  pageSize: number;
  currentPage: number;
  pages: number;
  orderBy: string;
  results: GuardianInterface[];
}

export interface NYTimesInterface {
  docs: NYTimesDocsInterface[];
}

export interface NYTimesDocsInterface {
  abstract: string;
  headline: any;
  lead_paragraph: string;
  pub_date: string;
  section_name: string;
  snippet: string;
  web_url: string;
  byline: any;
}

export interface NYTimesResponseInterface {
  copyright: string;
  response: NYTimesInterface;
  status: string;
}
