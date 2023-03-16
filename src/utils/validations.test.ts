import { isAlphabet } from "./validations";

describe("isAlphabet", () => {
  test("should return true when given a string containing only alphabetical characters and spaces", () => {
    expect(isAlphabet("Barrel")).toEqual(true);
    expect(isAlphabet("Barrel test")).toEqual(true);
  });

  test("should return false when given a string containing non-alphabetical characters", () => {
    expect(isAlphabet("Barrel 123")).toEqual(false);
    expect(isAlphabet("@!.,")).toEqual(false);
  });
});
