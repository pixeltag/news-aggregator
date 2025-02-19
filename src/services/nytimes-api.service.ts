import { NewsInterface, NYTimesResponseInterface } from "./types/new.interface";

const BASE_URL = process.env.REACT_APP_NYTIMES_API_URL;
const API_KEY = process.env.REACT_APP_NYTIMES_API_KEY;

export const fetchNYTimesApi = async (
  search: string,
  startDate: string,
  endDate: string
): Promise<NewsInterface[]> => {
  const formatNYTDate = (date: string) => date.replace(/-/g, "");

  const baseUrl = `${BASE_URL}?q=${search}&api-key=${API_KEY}&num=20`;

  const dateParams = [
    startDate ? `begin_date=${formatNYTDate(startDate)}` : "",
    endDate ? `end_date=${formatNYTDate(endDate)}` : "",
  ]
    .filter(Boolean) // Remove empty strings
    .join("&");

  const url = dateParams ? `${baseUrl}&${dateParams}` : baseUrl;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: NYTimesResponseInterface = await response.json();
  console.log(data);
  return data.response.docs.map((article, index) => ({
    title: article.headline.main,
    id: index,
    author: null,
    content: article.byline.original,
    description: article.snippet,
    publishedAt: article.pub_date,
    urlToImage: null,
    url: article.web_url,
  }));
};
