import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import CartItem from "./CartItem";

// Mock dispatch function
const mockDispatch = vi.fn();

// Mock CartContext
vi.mock("../../context/CartContext", () => ({
  useCart: () => ({ dispatch: mockDispatch }),
}));

describe("CartItem", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 20,
    image: "https://example.com/image.png",
  };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  test("renders product details correctly", () => {
    render(<CartItem product={mockProduct} quantity={2} />);

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText("$20 * 2")).toBeInTheDocument();
    expect(screen.getByText("$40")).toBeInTheDocument();
    const img = screen.getByRole("img", { name: /test product/i });
    expect(img).toHaveAttribute("src", mockProduct.image);
  });

  test("calls dispatch with DECREASE_QTY when - button is clicked", () => {
    render(<CartItem product={mockProduct} quantity={2} />);

    fireEvent.click(screen.getByRole("button", { name: "-" }));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "DECREASE_QTY",
      payload: mockProduct.id,
    });
  });

  test("calls dispatch with INCREASE_QTY when + button is clicked", () => {
    render(<CartItem product={mockProduct} quantity={2} />);

    fireEvent.click(screen.getByRole("button", { name: "+" }));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "INCREASE_QTY",
      payload: mockProduct.id,
    });
  });

  test("displays the correct quantity", () => {
    render(<CartItem product={mockProduct} quantity={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
