import "@testing-library/jest-dom";
import { describe, expect } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home comonent", () => {
    test("renders Header and ProductListing", () => {
        render(<Home />);
        expect(screen.getByRole("button", { name: /cart/i })).toBeInTheDocument();
        expect(screen.getByText(/loading products/i)).toBeInTheDocument();
    });

    test("opens and closes cart when toggled from header", () => {
        render(<Home />);

        const cartBtn = screen.getByRole("button", { name: /cart/i })
        fireEvent.click(cartBtn);

        const cart = screen.getByRole("dialog", { name: /shopping-cart/i });
        expect(cart).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: /close/i }));
        expect(cart).toHaveClass("invisible");
    });
})
