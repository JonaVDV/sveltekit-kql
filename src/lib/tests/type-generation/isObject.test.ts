import { describe, it, expect } from "vitest";
import {_isObject} from '../../types/generate'

describe("isObject test", () => {
  it("should return true if the input is an object", () => {
    const input = { a: 1, b: 2 };
    expect(_isObject(input)).toBe(true);
  });

  it("should return false if the input is not an object", () => {
    const input = "hello";
    expect(_isObject(input)).toBe(false);
  });

  it("should return false if the input is an array", () => {
    const input = [1, 2, 3];
    expect(_isObject(input)).toBe(false);
  });
});