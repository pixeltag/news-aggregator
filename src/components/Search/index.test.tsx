import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./index"; // Adjust the import path based on your project structure
import { NewsSource } from "../../pages/NewsPage/types";

// Mock the callback functions
const mockOnSearch = jest.fn();
const mockOnSource = jest.fn();
const mockOnStartDate = jest.fn();
const mockOnEndDate = jest.fn();
const mockOnCategory = jest.fn();

describe("SearchBar Component", () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    test("renders SearchBar with all fields", () => {
        render(
            <SearchBar
                onSearch={mockOnSearch}
                onSource={mockOnSource}
                onStartDate={mockOnStartDate}
                onEndDate={mockOnEndDate}
                onCategory={mockOnCategory}
            />
        );

        // Check if elements are rendered correctly
        expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Start Date/)).toBeInTheDocument();
        expect(screen.getByLabelText(/End Date/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Category/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Source/)).toBeInTheDocument();
    });

    test("calls onSearch when search input changes", () => {
        render(
            <SearchBar
                onSearch={mockOnSearch}
                onSource={mockOnSource}
                onStartDate={mockOnStartDate}
                onEndDate={mockOnEndDate}
                onCategory={mockOnCategory}
            />
        );

        // Simulate a change event on the search input
        fireEvent.change(screen.getByLabelText(/Search/), {
            target: { value: "test query" },
        });

        // Check if the mockOnSearch function is called with the correct value
        expect(mockOnSearch).toHaveBeenCalledWith("test query");
    });

    test("calls onSource when source select changes", () => {
        render(
            <SearchBar
                onSearch={mockOnSearch}
                onSource={mockOnSource}
                onStartDate={mockOnStartDate}
                onEndDate={mockOnEndDate}
                onCategory={mockOnCategory}
            />
        );

        // Simulate a change event on the source select
        fireEvent.change(screen.getByLabelText(/Source/), {
            target: { value: NewsSource.NewsApi },
        });

        // Check if the mockOnSource function is called with the correct value
        expect(mockOnSource).toHaveBeenCalledWith(NewsSource.NewsApi);
    });

    test("calls onStartDate when start date input changes", () => {
        render(
            <SearchBar
                onSearch={mockOnSearch}
                onSource={mockOnSource}
                onStartDate={mockOnStartDate}
                onEndDate={mockOnEndDate}
                onCategory={mockOnCategory}
            />
        );

        // Simulate a change event on the start date input
        fireEvent.change(screen.getByLabelText(/Start Date/), {
            target: { value: "2023-01-01" },
        });

        // Check if the mockOnStartDate function is called with the correct value
        expect(mockOnStartDate).toHaveBeenCalledWith("2023-01-01");
    });

    test("calls onEndDate when end date input changes", () => {
        render(
            <SearchBar
                onSearch={mockOnSearch}
                onSource={mockOnSource}
                onStartDate={mockOnStartDate}
                onEndDate={mockOnEndDate}
                onCategory={mockOnCategory}
            />
        );

        // Simulate a change event on the end date input
        fireEvent.change(screen.getByLabelText(/End Date/), {
            target: { value: "2023-12-31" },
        });

        // Check if the mockOnEndDate function is called with the correct value
        expect(mockOnEndDate).toHaveBeenCalledWith("2023-12-31");
    });

    test("calls onCategory when category select changes", () => {
        render(
            <SearchBar
                onSearch={mockOnSearch}
                onSource={mockOnSource}
                onStartDate={mockOnStartDate}
                onEndDate={mockOnEndDate}
                onCategory={mockOnCategory}
            />
        );

        // Simulate a change event on the category select
        fireEvent.change(screen.getByLabelText(/Category/), {
            target: { value: "business" },
        });

        // Check if the mockOnCategory function is called with the correct value
        expect(mockOnCategory).toHaveBeenCalledWith("business");
    });
});
