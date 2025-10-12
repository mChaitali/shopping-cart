import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, vi } from "vitest";
import { useProduct } from "./useProduct";

const mockProducts = [
  { id: 1, title: "Test Product1", price: 10 },
  { id: 2, title: "Test Product2", price: 20 },
];
describe("useProduct hook", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("should fetch product successfully", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const { result } = renderHook(() => useProduct());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toBe(mockProducts);
    expect(result.current.error).toBe("");
  });

  test("should handle non-ok response", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useProduct());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch Products");
  });

  test("should handle fetch error", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(()=> useProduct());

    expect(result.current.loading).toBe(true);

    await waitFor(()=>{
        expect(result.current.loading).toBe(false);
    });
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe("Network error")
  });
});
