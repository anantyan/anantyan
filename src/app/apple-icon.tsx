import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f2efe8",
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ fontSize: 76, fontWeight: 700, color: "#b8673f" }}>
          AR
        </span>
      </div>
    ),
    { ...size }
  );
}
