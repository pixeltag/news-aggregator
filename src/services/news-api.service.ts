import { NewsInterface } from "./types/new.interface";

const BASE_URL = process.env.REACT_APP_NEWS_API_URL;
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

export const fetchNewsApi = async (
  search: string,
  startDate: string,
  endDate: string,
  category: string
): Promise<NewsInterface[]> => {
  const queryParams = [
    `q=${encodeURIComponent(search)}`, // Search query
    category ? `category=${encodeURIComponent(category)}` : "", // Category (optional)
    startDate ? `from=${startDate}` : "",
    endDate ? `to=${endDate}` : "",
    `apiKey=${API_KEY}`, // Your API key
  ]
    .filter(Boolean) // Remove empty strings
    .join("&");

  const url = `${BASE_URL}?${queryParams}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.articles;
};
