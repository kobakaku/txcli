import { describe, it, expect } from "vitest";
import { hexPrefixedSchema } from "@/schema";

describe("hexPrefixedSchema", () => {
  describe("valid inputs", () => {
    it("should accept valid hex strings with 0x prefix", () => {
      const validInputs = [
        "0x1",
        "0x123",
        "0xabc",
        "0xABC",
        "0xaBc123",
        "0xffffffffffffffffffffffffffffffffffffffff",
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ];

      for (const input of validInputs) {
        const result = hexPrefixedSchema.parse(input);
        expect(result).toBe(input);
        expect(result).toMatch(/^0x[a-fA-F0-9]+$/);
      }
    });
  });

  describe("invalid inputs", () => {
    it("should reject strings without 0x prefix", () => {
      const invalidInputs = ["abc123", "123456", "ffffff"];

      for (const input of invalidInputs) {
        expect(() => hexPrefixedSchema.parse(input)).toThrow(
          "Value must be a valid hex string starting with 0x",
        );
      }
    });

    it("should reject 0x without any hex characters", () => {
      expect(() => hexPrefixedSchema.parse("0x")).toThrow(
        "Value must be a valid hex string starting with 0x",
      );
    });

    it("should reject strings with non-hex characters", () => {
      const invalidInputs = [
        "0xg123",
        "0x123g",
        "0x123 456",
        "0x123-456",
        "0x123.456",
        "0x123_456",
      ];

      for (const input of invalidInputs) {
        expect(() => hexPrefixedSchema.parse(input)).toThrow(
          "Value must be a valid hex string starting with 0x",
        );
      }
    });

    it("should reject non-string values", () => {
      const invalidInputs = [123, true, null, undefined, {}, []];

      for (const input of invalidInputs) {
        expect(() => hexPrefixedSchema.parse(input)).toThrow();
      }
    });
  });
});
