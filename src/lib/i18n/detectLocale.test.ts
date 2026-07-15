import { describe, expect, it } from "vitest";
import { detectInitialLocale } from "./detectLocale";

describe("detectInitialLocale", () => {
  it("returns the stored locale when it is a valid value", () => {
    expect(detectInitialLocale("en", "id-ID")).toBe("en");
  });

  it("falls back to browser language when nothing is stored", () => {
    expect(detectInitialLocale(null, "en-US")).toBe("en");
  });

  it("defaults to Indonesian when the browser language is not English", () => {
    expect(detectInitialLocale(null, "id-ID")).toBe("id");
  });

  it("defaults to Indonesian when the browser language is undefined", () => {
    expect(detectInitialLocale(null, undefined)).toBe("id");
  });

  it("ignores an invalid stored value and falls back to detection", () => {
    expect(detectInitialLocale("fr", "en-GB")).toBe("en");
  });
});
