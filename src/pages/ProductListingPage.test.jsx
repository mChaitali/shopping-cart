import "@testing-library/jest-dom";
import { describe, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react";
import ProductListingPage from "./ProductListingPage";

vi.mock("../components/ProductCard/ProductCard", () => ({
    default: ({ product }) => <div data-testid="product-card">{product.name}</div>,
}));

vi.mock("../hooks/useProduct.js", () => ({
    useProduct: vi.fn()
}));

import { useProduct } from "../hooks/useProduct";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

describe("ProductListingPage Component", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test("renders loading product", () => {
        useProduct.mockReturnValue({
            products: [],
            loading: true,
            error: null
        });

        render(<ProductListingPage />)
        expect(screen.getByText(/loading products.../i)).toBeInTheDocument();
    });

    test("renders error", () => {
        // expect error, so supressing it
        const originalConsoleError = console.error;
        console.error = vi.fn();
        useProduct.mockReturnValue({
            products: [],
            loading: false,
            error: "Failed to fetch products"
        });

        render(<ErrorBoundary>
                <ProductListingPage />
            </ErrorBoundary>
        )
        expect(screen.getByText(/OOPS!! Something went wrong./i)).toBeInTheDocument();
        console.error = originalConsoleError;
    });

    test("renders products when available", () => {
        const mockProducts = [
            { id: 1, name: "Shirt", price: 20 },
            { id: 2, name: "Pants", price: 30 }
        ]
        useProduct.mockReturnValue({
            products: mockProducts,
            loading: false,
            error: null
        });

        render(<ProductListingPage />)
        const productcard = screen.getAllByTestId("product-card");
        expect(productcard).toHaveLength(2)
        expect(screen.getByText(/shirt/i)).toBeInTheDocument();
        expect(screen.getByText(/Pants/i)).toBeInTheDocument();
    });

    test("renders no products when list is empty", () => {

        useProduct.mockReturnValue({
            products: [],
            loading: false,
            error: null
        });

        render(<ProductListingPage />)

        expect(screen.queryByTestId("product-card")).not.toBeInTheDocument();
    });
})