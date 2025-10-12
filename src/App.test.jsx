import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App routing", () => {
  test("renders Home page on default route", () => {
    render(<App />);
    expect(screen.getByText(/Clothing/i)).toBeInTheDocument();
  });

  test("renders NotFound page on unknown route", () => {
    window.history.pushState({}, "", "/unknown-route");
    render(<App />);
    expect(
      screen.getByText(/Oops! The page you are looking for does not exist./i)
    ).toBeInTheDocument();
  });
});
