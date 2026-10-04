import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { company } from "@/data/company";

export const alt = "Sunlit Network — Fast & Reliable Internet in Bangladesh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const logoBuffer = readFileSync(join(process.cwd(), "public", "logo.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #041a28 0%, #07263a 55%, #10405c 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={340} height={132} alt="" />

        <div style={{ display: "flex", marginTop: 56, fontSize: 62, fontWeight: 800, color: "white", maxWidth: 900, lineHeight: 1.1 }}>
          Internet That Moves With You.
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 26, color: "#b7d9e6", maxWidth: 820 }}>
          {company.description}
        </div>
      </div>
    ),
    { ...size }
  );
}
