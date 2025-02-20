import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";
import { act } from "react-dom/test-utils";

const ProblematicComponent = () => {
    throw new Error("Test error");
};

describe("ErrorBoundary Component", () => {
    test("renders children when no error occurs", () => {
        render(
            <ErrorBoundary>
                <div data-testid="child">No Error</div>
            </ErrorBoundary>
        );
        expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    test("displays fallback UI when an error occurs", () => {
        jest.spyOn(console, "error").mockImplementation(() => { });
        act(() => {
            render(
                <ErrorBoundary>
                    <ProblematicComponent />
                </ErrorBoundary>
            );
        });

        expect(screen.getByText(/sorry.. there was an error/i)).toBeInTheDocument();
    });
});
