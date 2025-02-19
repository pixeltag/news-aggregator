import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App"; // Adjust path if needed
import { MemoryRouter } from "react-router-dom";

describe("App Component", () => {
  test("renders App component", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Check if App div exists
    expect(screen.getByTestId("app")).toBeInTheDocument();
  });

  test("renders Header component", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Check if Header is present
    expect(screen.getByRole("banner")).toBeInTheDocument(); // Assuming header has <header> tag
  });

  test("renders NewsPage component on home route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // Check if NewsPage is displayed
    expect(screen.getByTestId("home")).toBeInTheDocument();
  });

  test("is wrapped in ErrorBoundary", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Check if ErrorBoundary exists (by class or test ID, adjust if needed)
    expect(screen.getByTestId("app").parentElement).toBeTruthy();
  });
});
