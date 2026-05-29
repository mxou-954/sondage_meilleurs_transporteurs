import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        background: "#08080E",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background geometric lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "linear-gradient(135deg, #0E0E18 0%, #08080E 50%, #0A0A14 100%)",
        }}
      />

      {/* Top-left corner accent */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 80,
          height: 1,
          background: "rgba(200,169,110,0.6)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 1,
          height: 80,
          background: "rgba(200,169,110,0.6)",
        }}
      />

      {/* Bottom-right corner accent */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: 80,
          height: 1,
          background: "rgba(200,169,110,0.6)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: 1,
          height: 80,
          background: "rgba(200,169,110,0.6)",
        }}
      />

      {/* Outer border */}
      <div
        style={{
          position: "absolute",
          inset: 28,
          border: "1px solid rgba(200,169,110,0.15)",
          borderRadius: 4,
        }}
      />

      {/* Diagonal gold band background */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -100,
          width: 500,
          height: 1200,
          background: "rgba(200,169,110,0.03)",
          transform: "rotate(-20deg)",
        }}
      />

      {/* RIGHT — Large trophy area */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 320,
        }}
      >
        {/* Glow behind trophy */}
        <div
          style={{
            position: "absolute",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,169,110,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            fontSize: 180,
            lineHeight: 1,
            position: "relative",
          }}
        >
          🏆
        </div>
      </div>

      {/* Vertical separator */}
      <div
        style={{
          position: "absolute",
          left: 720,
          top: 80,
          bottom: 80,
          width: 1,
          background:
            "linear-gradient(to bottom, transparent, rgba(200,169,110,0.3), transparent)",
        }}
      />

      {/* LEFT — Main content */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 700,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        {/* Edition pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#C8A96E",
            }}
          />
          <span
            style={{
              fontSize: 12,
              color: "#C8A96E",
              letterSpacing: "0.25em",
              fontFamily: "sans-serif",
              fontWeight: 400,
              textTransform: "uppercase",
            }}
          >
            1ère édition · Semestre 1 · 2026
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 90,
              color: "#F0EDE8",
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-2px",
            }}
          >
            Mon
          </span>
          <span
            style={{
              fontSize: 90,
              color: "#E2C98A",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-2px",
            }}
          >
            Transporteur
          </span>
          <span
            style={{
              fontSize: 90,
              color: "#F0EDE8",
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-2px",
            }}
          >
            Préféré
          </span>
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: 60,
            height: 2,
            background: "#C8A96E",
            marginBottom: 28,
            borderRadius: 1,
          }}
        />

        {/* Description */}
        <div
          style={{
            fontSize: 17,
            color: "#A8A4B8",
            fontFamily: "sans-serif",
            fontWeight: 300,
            lineHeight: 1.6,
            marginBottom: 40,
            maxWidth: 480,
          }}
        >
          L'élection du meilleur transporteur par les professionnels du
          transport et les expéditeurs.
        </div>

        {/* Transporteurs chips */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 44,
          }}
        >
          {["DHL", "UPS", "FedEx", "Chronopost", "Colissimo", "DPD", "GLS"].map(
            (name) => (
              <div
                key={name}
                style={{
                  padding: "5px 14px",
                  border: "1px solid rgba(200,169,110,0.2)",
                  borderRadius: 2,
                  background: "rgba(200,169,110,0.05)",
                  fontSize: 12,
                  color: "#C8A96E",
                  fontFamily: "sans-serif",
                  letterSpacing: "0.06em",
                }}
              >
                {name}
              </div>
            ),
          )}
        </div>

        {/* Bottom — ColisConsult */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 36,
              height: 1,
              background: "rgba(200,169,110,0.4)",
            }}
          />
          <span
            style={{
              fontSize: 13,
              color: "#C8A96E",
              fontFamily: "sans-serif",
              letterSpacing: "0.22em",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            COLISCONSULT
          </span>
          <span
            style={{
              fontSize: 12,
              color: "#6A677A",
              fontFamily: "sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            Cabinet expert transport
          </span>
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
