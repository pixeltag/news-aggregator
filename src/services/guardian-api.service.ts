import {
  GuardianResponseInterface,
  NewsApiInterface,
  NewsInterface,
} from "./types/new.interface";

const BASE_URL = process.env.REACT_APP_GUARDIAN_API_URL;
const API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;

export const fetchGuardianApi = async (
  search: string
): Promise<NewsInterface[]> => {
  const response = await fetch(
    `${BASE_URL}?q=${search}&page-size=20&api-key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: { response: GuardianResponseInterface } = await response.json();

  return data.response.results.map((article) => ({
    title: article.webTitle,
    id: article.id,
    author: null,
    content: article.webTitle,
    description: article.webTitle,
    publishedAt: article.webPublicationDate,
    urlToImage: null,
    url: article.webUrl,
  }));
};
