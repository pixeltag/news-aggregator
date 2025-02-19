import {
  GuardianResponseInterface,
  NewsInterface,
} from "./types/new.interface";

const BASE_URL = process.env.REACT_APP_GUARDIAN_API_URL;
const API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;

export const fetchGuardianApi = async (
  search: string,
  startDate: string,
  endDate: string,
  category: string
): Promise<NewsInterface[]> => {
  const baseUrl = `${BASE_URL}?q=${search}&page-size=20&api-key=${API_KEY}`;

  const queryParams = [
    startDate ? `from-date=${startDate}` : "",
    endDate ? `to-date=${endDate}` : "",
    category ? `section=${encodeURIComponent(category)}` : "",
  ]
    .filter(Boolean) // Remove empty values
    .join("&");

  const url = queryParams ? `${baseUrl}&${queryParams}` : baseUrl;

  const response = await fetch(url);
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
