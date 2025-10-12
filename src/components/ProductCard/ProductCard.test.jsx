
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from "./ProductCard";
import { CartContext } from "../../context/CartContext";
import { expect } from "vitest";

describe("productCard", () => {
    const mockProduct =
    {
        id: 1,
        title: "Shirt",
        price: 20,
        description: "Product description",
        category: "men's clothing",
        image: "https://equalexperts.github.io/frontend-take-home-test-data/img/81fPKd-2AYL._AC_SL1500_t.png", 
        rating: {
            rate: 4,
            count: 10
        }
    };

    const mockProductWithFloatPriceValue =
    {
        id: 2,
        title: "Power Bank",
        price: 134.67,
        description: "Product description",
        category: "electronics",
        image: "https://equalexperts.github.io/frontend-take-home-test-data/img/81fPKd-2AYL._AC_SL1500_t.png", 
        rating: {
            rate: 4,
            count: 3
        }
    }

    const mockDispatch = vi.fn();
    const renderWithMock = (product = mockProduct) =>{
        return render(
            <CartContext.Provider value={{state: {items:{}}, dispatch: mockDispatch}}>
            <ProductCard product={product}/>
        </CartContext.Provider>
        )
    }
    beforeEach(() => mockDispatch.mockClear());

    test("card loading product details correctly", () => {
        renderWithMock();

        expect(screen.getByRole("heading", { name: /Shirt/i })).toBeInTheDocument()
        expect(screen.getByText("Product description")).toBeInTheDocument()
        expect(screen.getByText("$20")).toBeInTheDocument()
        const img = screen.getByRole("img");
        expect(img).toBeInTheDocument();
    });

    test("click on the add to cart button works correctly",()=>{
        renderWithMock();
        const addToCartBtn = screen.getByRole("button", {name: /add to cart/i})

        fireEvent.click(addToCartBtn);
        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith({
            type:"ADD_ITEM",
            payload: mockProduct,
        })
    });

    test("button should be accessible",()=>{
        renderWithMock();
        expect(screen.getByRole("button", {name: /add to cart/i})).toBeEnabled();
    });

    test("card loading product details correctly for float price value", () => {
        renderWithMock(mockProductWithFloatPriceValue);

        expect(screen.getByRole("heading", { name: /power bank/i })).toBeInTheDocument()
        expect(screen.getByText("Product description")).toBeInTheDocument()
        expect(screen.getByText("$134.67")).toBeInTheDocument()
        const img = screen.getByRole("img");
        expect(img).toBeInTheDocument();
    });
});
