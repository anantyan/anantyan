import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Arya Rezza Anantya — Mobile Developer";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faf9f6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 140,
            borderRadius: 32,
            backgroundColor: "#f2efe8",
            border: "3px solid #e7e3da",
            marginBottom: 40,
          }}
        >
          <span style={{ fontSize: 56, fontWeight: 700, color: "#b8673f" }}>
            AR
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#1c1a17" }}>
          Arya Rezza Anantya
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 600,
            color: "#b8673f",
            marginTop: 16,
          }}
        >
          Mobile Developer
        </div>
      </div>
    ),
    { ...size }
  );
}
