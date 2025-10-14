import React from "react";
import { beforeEach, describe, expect, vi } from "vitest";
import Header from "./Header";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockUseCart = vi.fn();
vi.mock("../../context/CartContext.jsx", () => ({
    useCart: () => mockUseCart(),
}))


describe("Header Component", () => {
    const mockOnCartClick = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    })
    test("should render logo", () => {
        mockUseCart.mockReturnValue({ state: { items: {} } })
        render(<Header onCartClick={mockOnCartClick} />)
        expect(screen.getByText(/Clothing/i)).toBeInTheDocument();
    })

    test("fires onCartClick when cart clicked", () => {
        const onCartClick = vi.fn();
        render(<Header onCartClick={onCartClick} />);
        fireEvent.click(screen.getByRole("button"));
        expect(onCartClick).toHaveBeenCalledOnce()
    })

    test("renders cart button without badge when cart is empty", () => {
        mockUseCart.mockReturnValue({ state: { items: {} } })
        render(<Header onCartClick={mockOnCartClick} />)
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.queryByText("0")).not.toBeInTheDocument();
    })

    test("renders cart button with corrext item count", () => {
        mockUseCart.mockReturnValue({
            state: {
                items: {
                    1: { product: { id: 1, title: "Test Product" }, quantity: 2 },
                    2: { product: { id: 2, title: "Another" }, quantity: 3 },
                }
            }
        })
        render(<Header onCartClick={mockOnCartClick} />)
        expect(screen.queryByText("5")).toBeInTheDocument();
    })
});
