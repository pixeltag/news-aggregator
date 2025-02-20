import {
  GuardianResponseInterface,
  NewsInterface,
} from "./types/new.interface";

const BASE_URL = process.env.REACT_APP_GUARDIAN_API_URL;
const API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;

if (!BASE_URL || !API_KEY) {
  console.error("Missing Guardian API environment variables.");
}

export const fetchGuardianApi = async (
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
    url.searchParams.append("page-size", "20");
    url.searchParams.append("api-key", API_KEY as string);

    if (startDate) url.searchParams.append("from-date", startDate);
    if (endDate) url.searchParams.append("to-date", endDate);
    if (category)
      url.searchParams.append("section", encodeURIComponent(category));

    const response = await fetch(url.toString(), { signal });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: { response: GuardianResponseInterface } = await response.json();

    return data.response.results.map((article) => ({
      title: article.webTitle,
      id: article.id,
      author: null, // Guardian API doesn't provide author info
      content: article.webTitle,
      description: article.webTitle,
      publishedAt: article.webPublicationDate,
      urlToImage: null, // Guardian API doesn't provide images directly
      url: article.webUrl,
    }));
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.warn("⚠️ Fetch aborted.");
      return [];
    }
    console.error("Error fetching Guardian API:", error.message);
    throw error;
  }
};
