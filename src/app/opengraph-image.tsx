import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "CEO Hosting U — Furnished Housing & Property Management in the Triad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          backgroundColor: "#065f46",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontSize: "72px",
                fontWeight: 800,
                color: "#d4a847",
              }}
            >
              CEO
            </span>
            <span
              style={{
                fontSize: "72px",
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              Hosting
            </span>
            <span
              style={{
                fontSize: "72px",
                fontWeight: 800,
                color: "#d4a847",
              }}
            >
              U
            </span>
          </div>
          <div
            style={{
              width: "80px",
              height: "4px",
              backgroundColor: "#d4a847",
              borderRadius: "2px",
            }}
          />
          <p
            style={{
              fontSize: "28px",
              color: "#ffffff",
              opacity: 0.9,
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            Furnished Housing & Property Management in the Triad
          </p>
          <p
            style={{
              fontSize: "18px",
              color: "#d4a847",
              letterSpacing: "2px",
            }}
          >
            WINSTON-SALEM · GREENSBORO · HIGH POINT · LEXINGTON
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
