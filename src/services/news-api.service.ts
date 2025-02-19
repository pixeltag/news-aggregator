import { NewsInterface } from "./types/new.interface";

const BASE_URL = process.env.REACT_APP_NEWS_API_URL;
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

export const fetchNewsApi = async (
  search: string
): Promise<NewsInterface[]> => {
  const response = await fetch(`${BASE_URL}?q=${search}&apiKey=${API_KEY}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.articles;
};
