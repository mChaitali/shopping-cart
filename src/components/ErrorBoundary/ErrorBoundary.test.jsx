import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

function ErrorComponent() {
  throw new Error("Some Error!");
}

describe("ErrorBoundary", () => {
  test("renders fallback UI when child throws", () => {
    // expect error, so supressing it
    const originalConsoleError = console.error;
    console.error = vi.fn();
    render(
      <ErrorBoundary fallback={<h1>Something went wrong!</h1>}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/OOPS!! Something went wrong./i)).toBeInTheDocument();
    console.error = originalConsoleError;
  });

  test("renders children when there is no error", () => {
    render(
      <ErrorBoundary fallback={<h1>Something went wrong!</h1>}>
        <div>Hello world</div>
      </ErrorBoundary>
    );

    expect(screen.getByText(/Hello world/i)).toBeInTheDocument();
  });
});