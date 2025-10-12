import { describe, expect } from "vitest";
import "@testing-library/jest-dom";

import { cartReducer, initialState } from "./CartReducer";

describe("CartReducer", () => {
  const sampleProduct = { id: 1, title: "Test Product", price: 20, image: "" };

  test("return initial state when UNKNOWN type", () => {
    const prevState = { items: {} };
    const newState = cartReducer(prevState, { type: "UNKNOWN" });
    expect(newState).toEqual(prevState);
  });

  test("should add a new item when ADD_ITEM is dispatched", () => {
    const action = { type: "ADD_ITEM", payload: sampleProduct };
    const newState = cartReducer(initialState, action);

    expect(newState.items["1"]).toEqual({
      product: sampleProduct,
      quantity: 1,
    });
  });

  test("should increase quantity id item is already available in cart", () => {
    const stateCart = {
      items: { 1: { product: sampleProduct, quantity: 1 } },
    };
    const action = { type: "ADD_ITEM", payload: sampleProduct };

    const newState = cartReducer(stateCart, action);

    expect(newState.items["1"]).toEqual({
      product: sampleProduct,
      quantity: 2,
    });
  });

  test("should increase quantity when INCREASE_QTY dispached", () => {
    const stateCart = {
      items: { 1: { product: sampleProduct, quantity: 2 } },
    };
    const action = { type: "INCREASE_QTY", payload: "1" };

    const newState = cartReducer(stateCart, action);

    expect(newState.items["1"].quantity).toBe(3);
  });

  test("returns the same state if item does not exist for INCREASE_QTY dispached ", () => {
    const stateCart = {
      items: { 1: { product: sampleProduct, quantity: 2 } },
    };
    const action = { type: "INCREASE_QTY", payload: "999" };

    const newState = cartReducer(stateCart, action);

    expect(newState).toBe(stateCart);
  });

  test("should decrease quantity when DECREASE_QTY dispached", () => {
    const stateCart = {
      items: { 1: { product: sampleProduct, quantity: 2 } },
    };
    const action = { type: "DECREASE_QTY", payload: "1" };

    const newState = cartReducer(stateCart, action);

    expect(newState.items["1"].quantity).toBe(1);
  });

  test("should remove item if quantity is 1 and DECREASE_QTY dispatched", () => {
    const stateCart = {
      items: { 1: { product: sampleProduct, quantity: 1 } },
    };
    const action = { type: "DECREASE_QTY", payload: "1" };

    const newState = cartReducer(stateCart, action);

    expect(newState.items["1"]).toBeUndefined();
    expect(Object.keys(newState.items)).toHaveLength(0);
  });

  test("returns the same state if item does not exist for DECREASE_QTY dispached ", () => {
    const stateCart = {
      items: { 1: { product: sampleProduct, quantity: 2 } },
    };
    const action = { type: "DECREASE_QTY", payload: "999" };

    const newState = cartReducer(stateCart, action);

    expect(newState).toBe(stateCart);
  });

  test("should remove item when REMOVE_QTY dispatched", () => {
    const stateCart = {
      items: { 1: { product: sampleProduct, quantity: 2 } },
    };
    const action = { type: "REMOVE_QTY", payload: "1" };

    const newState = cartReducer(stateCart, action);

    expect(newState.items["1"]).toBeUndefined();
    expect(Object.keys(newState.items)).toHaveLength(0);
  });
});
