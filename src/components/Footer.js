"use client";

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        backgroundColor: "var(--black)",
        color: "var(--cream)",
        position: "relative",
        padding: "4rem 3rem 2rem",
        overflow: "hidden",
      }}
    >
      {/* Decorative circle — top right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-420px",
          right: "-300px",
          width: "1000px",
          height: "1000px",
          borderRadius: "50%",
          border: "100px solid rgba(255,255,255,0.04)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: "1760px", margin: "0 auto" }}>

        {/* Top row: tagline + back-to-top */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <p
            style={{
              fontWeight: 900,
              textTransform: "uppercase",
              fontSize: "1.25rem",
              letterSpacing: "0.02em",
              maxWidth: "28rem",
              color: "var(--cream)",
              lineHeight: 1.4,
            }}
          >
            Make something worth sharing.
          </p>

          <a
            href="#"
            aria-label="Back to top"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "var(--cream)",
              color: "var(--black)",
              flexShrink: 0,
              transition: "opacity 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {/* Arrow Up SVG */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M10 15V5M10 5L5.5 9.5M10 5L14.5 9.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* 4-column link grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "3rem",
            marginTop: "4rem",
          }}
          className="footer-grid"
        >
          {/* EXPLORE */}
          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                color: "var(--cream)",
                opacity: 0.5,
              }}
            >
              EXPLORE
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                marginTop: "1.5rem",
                fontSize: "1.125rem",
              }}
            >
              {["About", "Events", "Members", "Clusters"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{
                    color: "var(--cream)",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.55")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* CONNECT */}
          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                color: "var(--cream)",
                opacity: 0.5,
              }}
            >
              CONNECT
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                marginTop: "1.5rem",
                fontSize: "1.125rem",
              }}
            >
              {["Instagram", "LinkedIn", "Email us"].map((item) => (
                <a
                  key={item}
                  href="#footer"
                  style={{
                    color: "var(--cream)",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.55")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* VISIT */}
          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                color: "var(--cream)",
                opacity: 0.5,
              }}
            >
              VISIT
            </p>
            <p
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.75,
                marginTop: "1.5rem",
                color: "var(--cream)",
              }}
            >
              Association of Computing Engineers
              <br />
              Your College Campus
            </p>
          </div>

          {/* NEWSLETTER */}
          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                color: "var(--cream)",
                opacity: 0.5,
              }}
            >
              NEWSLETTER
            </p>
            <p style={{ fontSize: "1.125rem", marginTop: "1.5rem", color: "var(--cream)" }}>
              Get the good stuff.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{
                display: "flex",
                marginTop: "1.25rem",
                width: "100%",
                overflow: "hidden",
                border: "1px solid rgba(237,232,218,0.35)",
                borderRadius: "9999px",
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address for newsletter"
                style={{
                  background: "transparent",
                  outline: "none",
                  border: "none",
                  padding: "0.75rem 1rem",
                  flexGrow: 1,
                  minWidth: 0,
                  color: "var(--cream)",
                  fontSize: "0.9375rem",
                }}
              />
              <button
                type="submit"
                style={{
                  fontWeight: 700,
                  backgroundColor: "var(--cream)",
                  color: "var(--black)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  padding: "0 1.25rem",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "0 9999px 9999px 0",
                  flexShrink: 0,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Giant ACE wordmark */}
        <div style={{ marginTop: "2rem" }}>
          <h2
            style={{
              fontSize: "clamp(6rem, 16vw, 17rem)",
              fontWeight: 900,
              textAlign: "center",
              textTransform: "lowercase",
              color: "var(--cream)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              opacity: 0.08,
              userSelect: "none",
            }}
            aria-hidden="true"
          >
            ace
          </h2>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2rem",
            padding: "1rem 1.5rem",
            border: "1px solid rgba(237,232,218,0.2)",
            borderRadius: "9999px",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              color: "var(--cream)",
              opacity: 0.5,
            }}
          >
            © 2024 ACE / BUILT BY STUDENTS, FOR STUDENTS
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              color: "var(--cream)",
              opacity: 0.5,
            }}
          >
            LEGAL — PRIVACY — COOKIES
          </span>
        </div>
      </div>

      {/* Responsive: collapse grid to 2 cols on tablet, 1 on mobile */}
      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
