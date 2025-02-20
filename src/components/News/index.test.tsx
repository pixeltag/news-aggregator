import React from "react";
import { render, screen } from "@testing-library/react";
import { News } from "../News";
import { NewsInterface } from "../../services/types/new.interface";
import { Loader } from "../Loader/Loader";

// Mock dependencies
jest.mock("../DateFormatter", () => ({
    __esModule: true,
    default: ({ date }: { date: string }) => <span>{date}</span>,
}));

jest.mock("../Icons/NewsThumbnails", () => ({
    __esModule: true,
    default: () => <div data-testid="news-thumbnail">[Thumbnail]</div>,
}));

jest.mock("../Loader/Loader", () => ({
    Loader: () => <div data-testid="loader">Loading...</div>,
}));

describe("News Component", () => {
    const mockNews: NewsInterface[] = [
        {
            id: 0,
            title: "Sample News 1",
            url: "https://example.com/news1",
            urlToImage: "https://example.com/image1.jpg",
            publishedAt: "2024-01-01T12:00:00Z",
            author: "",
            content: "",
            description: "",
        },
        {
            id: 1,
            title: "Sample News 2",
            url: "https://example.com/news2",
            urlToImage: null, // No image, should show fallback
            publishedAt: "2024-01-02T15:30:00Z",
            author: "",
            content: "",
            description: "",
        },
    ];

    test("renders loader when loading", () => {
        render(<News data={undefined} error={null} isLoading={true} />);
        expect(screen.getByTestId("loader")).toBeInTheDocument();
    });

    test("displays an error message when there is an error", () => {
        const mockError = new Error("Failed to fetch news");
        render(<News data={undefined} error={mockError} isLoading={false} />);
        expect(screen.getByText(/Error: Failed to fetch news/i)).toBeInTheDocument();
    });

    test("renders news articles correctly", () => {
        render(<News data={mockNews} error={null} isLoading={false} />);
        expect(screen.getByText("Sample News 1")).toBeInTheDocument();
        expect(screen.getByText("Sample News 2")).toBeInTheDocument();
    });

    test("displays NewsThumbnails when urlToImage is missing", () => {
        render(<News data={mockNews} error={null} isLoading={false} />);
        expect(screen.getByTestId("news-thumbnail")).toBeInTheDocument();
    });

    test("renders the published date correctly", () => {
        render(<News data={mockNews} error={null} isLoading={false} />);
        expect(screen.getByText("2024-01-01T12:00:00Z")).toBeInTheDocument();
        expect(screen.getByText("2024-01-02T15:30:00Z")).toBeInTheDocument();
    });
});
