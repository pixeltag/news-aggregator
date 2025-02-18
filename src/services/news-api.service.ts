import { NewsApiInterface, NewsInterface } from "./types/new.interface";

const BASE_URL = process.env.REACT_APP_NEWS_API_URL;
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

export const fetchNews = async (): Promise<NewsInterface[]> => {
  const response = await fetch(`${BASE_URL}?q=bitcoin&apiKey=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.articles;
};
