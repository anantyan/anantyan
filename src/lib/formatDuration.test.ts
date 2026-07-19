import { describe, expect, it } from "vitest";
import { formatOngoingDuration } from "./formatDuration";

describe("formatOngoingDuration", () => {
  it("formats months-only durations in Indonesian", () => {
    expect(formatOngoingDuration(1, "id")).toBe("1 bln");
    expect(formatOngoingDuration(11, "id")).toBe("11 bln");
  });

  it("formats months-only durations in English", () => {
    expect(formatOngoingDuration(1, "en")).toBe("1 mo");
    expect(formatOngoingDuration(11, "en")).toBe("11 mo");
  });

  it("formats whole-year durations without a trailing zero-month suffix", () => {
    expect(formatOngoingDuration(12, "id")).toBe("1 thn");
    expect(formatOngoingDuration(24, "en")).toBe("2 yr");
  });

  it("formats mixed year-and-month durations", () => {
    expect(formatOngoingDuration(21, "id")).toBe("1 thn 9 bln");
    expect(formatOngoingDuration(21, "en")).toBe("1 yr 9 mo");
  });
});
