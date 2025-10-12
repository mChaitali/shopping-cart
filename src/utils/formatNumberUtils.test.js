import { describe, expect } from "vitest";
import { formatNumberUtils } from "./formatNumberUtils";

describe("formatNumberUtils", () => {
  test("should return integer string for whole numbers", () => {
    expect(formatNumberUtils(20.00)).toBe("20")
    expect(formatNumberUtils(100)).toBe("100")
  });

  test("should return string with 2 decimals for fractional numbers", () => {
    expect(formatNumberUtils(20.13)).toBe("20.13")
    expect(formatNumberUtils(2999.97)).toBe("2999.97")
  });

  test("should handle zero correctly", () => {
    expect(formatNumberUtils(0)).toBe("0")
    expect(formatNumberUtils(0.00)).toBe("0")
  });

  test("should handle large numbers correctly", () => {
    expect(formatNumberUtils(1234567.891)).toBe("1234567.89")
    expect(formatNumberUtils(1000000)).toBe("1000000")
  });
});
