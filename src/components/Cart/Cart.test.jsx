import "@testing-library/jest-dom";
import { beforeEach, describe, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart";

vi.mock("../../context/CartContext.jsx", () => ({
    useCart: vi.fn()
}));

vi.mock("../../ui/Button.jsx", () => ({
    default: ({ children, ...props }) => (
        <button {...props}>{children}</button>
    )
}));

vi.mock("./CartItem", () => ({
    default: ({ product, quantity }) => (
        <div data-testid="cart-item">
            {product.name} - {quantity}
        </div>
    ),
}));

import { useCart } from "../../context/CartContext";

describe("Cart component", () => {
    const mockOnClose = vi.fn();
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders empty cart message when no item", () => {
        useCart.mockReturnValue({
            state: { items: {} }
        })
        render(<Cart isOpen={true} onClose={mockOnClose} />)
        expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();

    });

    test("render cart item when Items exist", () => {
        useCart.mockReturnValue({
            state: {
                items: {
                    1: { product: { id: 1, name: "Shirt", price: 20 }, quantity: 2 },
                    2: { product: { id: 2, name: "Pants", price: 30 }, quantity: 1 },
                }
            }
        });

        render(<Cart isOpen={true} onClose={mockOnClose} />);
        expect(screen.getAllByTestId("cart-item")).toHaveLength(2);
        expect(screen.getByText(/shirt/i)).toBeInTheDocument();
        expect(screen.getByText(/pants/i)).toBeInTheDocument();
    });

    test("Calculates and display subtotal correctly", () => {
        useCart.mockReturnValue({
            state: {
                items: {
                    1: { product: { id: 1, name: "Shirt", price: 20 }, quantity: 2 },
                    2: { product: { id: 2, name: "Pants", price: 30 }, quantity: 1 },
                }
            }
        });
        render(<Cart isOpen={true} onClose={mockOnClose} />);

        expect(screen.getByText(/Subtotal/i)).toBeInTheDocument();
        expect(screen.getByText("$70")).toBeInTheDocument();
    });

    test("calls onclose when close button clicked", () => {
        useCart.mockReturnValue({
            state: {
                items: {}
            }
        });
        render(<Cart isOpen={true} onClose={mockOnClose} />);

        fireEvent.click(screen.getByRole("button", { name: /close/i }));
        expect(mockOnClose).toHaveBeenCalled(1);
    });

    test("calls onclose when overlay clicked", () => {
        useCart.mockReturnValue({
            state: {
                items: {}
            }
        });
        render(<Cart isOpen={true} onClose={mockOnClose} />);
        const overlay = screen.getByTestId("overlay");
        fireEvent.click(overlay);
        expect(mockOnClose).toHaveBeenCalled(1);
    });

    test("renders checkout and continue shopping", () => {
        useCart.mockReturnValue({
            state: {
                items: {}
            }
        });
        render(<Cart isOpen={true} onClose={mockOnClose} />);

        expect(screen.getByRole("button", { name: /proceed to checkout/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /continue shopping/i })).toBeInTheDocument();
    });

    test("calls onclose when continue shopping clicked", () => {
        useCart.mockReturnValue({
            state: {
                items: {}
            }
        });
        render(<Cart isOpen={true} onClose={mockOnClose} />);

        fireEvent.click(screen.getByRole("button", { name: /continue shopping/i }))
        expect(mockOnClose).toHaveBeenCalled(1)
    });
})
