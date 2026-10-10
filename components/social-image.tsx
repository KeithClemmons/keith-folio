import { ImageResponse } from "next/og";

export const socialSize = { width: 1200, height: 630 };

export function socialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#202c45",
          color: "#ffffff",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#f21b51",
          }}
        >
          Jason “Keith” Clemmons · Atlanta, Georgia
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          <div>Web development,</div>
          <div>AI systems,</div>
          <div>and automation.</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, lineHeight: 1.35 }}>
          Code, SEO, Email, Content, and AI Agents that do real work.
        </div>
      </div>
    ),
    { ...socialSize },
  );
}
