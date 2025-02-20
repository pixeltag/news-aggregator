import { NewsInterface } from "./types/new.interface";

const BASE_URL = process.env.REACT_APP_NEWS_API_URL;
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

if (!BASE_URL || !API_KEY) {
  console.error("Missing News API environment variables.");
}

export const fetchNewsApi = async (
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
    url.searchParams.append("apiKey", API_KEY as string);

    if (startDate) url.searchParams.append("from", startDate);
    if (endDate) url.searchParams.append("to", endDate);
    if (category) url.searchParams.append("category", category);

    const response = await fetch(url.toString(), { signal });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.articles ?? [];
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.warn("Fetch aborted.");
      return [];
    }
    console.error("Error fetching News API:", error.message);
    throw error;
  }
};
