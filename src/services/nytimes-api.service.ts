import { NewsInterface, NYTimesResponseInterface } from "./types/new.interface";

const BASE_URL = process.env.REACT_APP_NYTIMES_API_URL;
const API_KEY = process.env.REACT_APP_NYTIMES_API_KEY;

if (!BASE_URL || !API_KEY) {
  console.error("Missing NYTimes API environment variables.");
}

const formatNYTDate = (date: string) => date.replace(/-/g, "");

export const fetchNYTimesApi = async (
  search: string,
  startDate?: string,
  endDate?: string,
  category?: string,
  signal?: AbortSignal // Supports request cancellation
): Promise<NewsInterface[]> => {
  try {
    if (!search) {
      throw new Error("Search term is required.");
    }

    const url = new URL(BASE_URL as string);
    url.searchParams.append("q", search);
    url.searchParams.append("api-key", API_KEY as string);
    url.searchParams.append("num", "20"); // Limit results

    if (startDate)
      url.searchParams.append("begin_date", formatNYTDate(startDate));
    if (endDate) url.searchParams.append("end_date", formatNYTDate(endDate));
    if (category) url.searchParams.append("fq", `news_desk:("${category}")`);

    const response = await fetch(url.toString(), { signal });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: NYTimesResponseInterface = await response.json();
    return data.response.docs.map((article, index) => ({
      title: article.headline.main,
      id: index,
      author: article.byline?.original || "Unknown",
      content: article.snippet || "No content available",
      description: article.abstract || "No description available",
      publishedAt: article.pub_date || "Unknown date",
      urlToImage: null,
      url: article.web_url,
    }));
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.warn("Fetch aborted.");
      return [];
    }
    console.error("Error fetching NYTimes API:", error.message);
    throw error;
  }
};
