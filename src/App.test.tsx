import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("./components/Header/Header", () => () => <header data-testid="header">Header</header>);
jest.mock("./pages/NewsPage", () => () => <div data-testid="home">NewsPage</div>);

describe("App Component", () => {
  test("renders App component with Header and NewsPage", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const appElement = screen.getByTestId('app')
    // Check if the App component is rendered
    expect(appElement).toBeInTheDocument();
  });
});
