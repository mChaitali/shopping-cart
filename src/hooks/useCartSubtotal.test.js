import { renderHook } from "@testing-library/react";
import { describe, expect, vi, beforeEach } from "vitest";
import { useCartSubtotal } from "./useCartSubtotal";

vi.mock("../context/CartContext", () => {
  return {
    useCart: vi.fn(),
  };
});

import { useCart } from "../context/CartContext";

describe("useCartSubtotal hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns empry items, cartCount 0 and subtotal 0 when cart is empty", () => {
    useCart.mockReturnValue({ state: { items: {} } });

    const { result } = renderHook(() => useCartSubtotal());

    expect(result.current.items).toEqual([]);
    expect(result.current.cartCount).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  test("Calculates items, cartCount and subtotal correctly", () => {
    useCart.mockReturnValue({
      state: {
        items: {
          1: { product: { price: 30 }, quantity: 2 },
          2: { product: { price: 50 }, quantity: 1 },
        },
      },
    });

    const { result } = renderHook(() => useCartSubtotal());

    expect(result.current.items).toHaveLength(2);
    expect(result.current.cartCount).toBe(2);
    expect(result.current.subtotal).toBe(110);
  });

  test("updates subtotal when cart items changed", () => {
    useCart.mockReturnValue({
      state: {
        items: {
          1: { product: { price: 30 }, quantity: 1 },
        },
      },
    });

    const { result, rerender } = renderHook(() => useCartSubtotal());

    expect(result.current.subtotal).toBe(30);

    useCart.mockReturnValue({
      state: {
        items: {
          1: { product: { price: 30 }, quantity: 2 },
        },
      },
    });
    rerender();

    expect(result.current.subtotal).toBe(60);
  });
});
