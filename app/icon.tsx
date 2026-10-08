import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#202c45",
          color: "#f21b51",
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        K
      </div>
    ),
    { ...size },
  );
}
