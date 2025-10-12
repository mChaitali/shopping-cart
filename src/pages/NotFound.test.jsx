import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect } from "vitest";
import "@testing-library/jest-dom";
import NotFound from "./NotFound";

describe("NotFound Component", () => {
    test("render 404 page", () => {
        render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>
        );
        expect(screen.getByText("404")).toBeInTheDocument();
    });
    test("render error message", () => {
        render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>
        );
        expect(screen.getByText(/Oops! The page you are looking for does not exist/i)).toBeInTheDocument();
    });
    test("render home link", () => {
        render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>
        );
        const homeLink = screen.getByRole("link", { name: /Go Home/i });
        expect(homeLink).toHaveAttribute("href", "/");
    });
});