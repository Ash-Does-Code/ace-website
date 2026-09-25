"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        backgroundColor: "var(--cream)",
        position: "relative",
        padding: "3rem",
        minHeight: "820px",
        overflow: "hidden",
      }}
    >
      {/* Decorative circle outline — top right (no fill, just border) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "5rem",
          right: "-120px",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          border: "1px solid rgba(13,13,13,0.2)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative blue dot — upper area */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "19%",
          right: "31%",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "var(--blue)",
        }}
      />

      {/* Decorative blue dot — left side */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "43%",
          left: "9%",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "var(--blue)",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1760px",
          margin: "0 auto",
        }}
      >
        {/* Top meta row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <p
            style={{
              fontWeight: 700,
              fontSize: "0.75rem",
              lineHeight: 1.6,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--black)",
            }}
          >
            Association of Computing Engineers
            <br />
            2024—25
          </p>
          <p
            style={{
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              textAlign: "right",
              color: "var(--black)",
            }}
          >
            Coders / Creators / Collaborators
          </p>
        </div>

        {/* Main heading block */}
        <div
          style={{
            marginTop: "6rem",
            maxWidth: "1500px",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(9rem, 20vw, 22rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 0.78,
              letterSpacing: "-0.09em",
              color: "var(--black)",
            }}
          >
            ACE
            <br />
            <span>COMPUTE LOUD.</span>
          </h1>

          {/* TOGETHER — absolute, italic, rotated, blue */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "54%",
              right: "17%",
              fontSize: "clamp(3rem, 6vw, 7rem)",
              fontStyle: "italic",
              fontWeight: 900,
              color: "var(--blue)",
              letterSpacing: "-0.06em",
              transform: "rotate(-7deg)",
              transformOrigin: "center center",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            TOGETHER
          </span>
          {/* Accessible version of TOGETHER for screen readers */}
          <span className="sr-only">Together</span>
        </div>

        {/* Bottom row: description + scroll indicator */}
        <div
          style={{
            display: "flex",
            marginTop: "4rem",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {/* Left: body + CTAs */}
          <div style={{ maxWidth: "36rem" }}>
            <p
              style={{
                fontSize: "1.25rem",
                lineHeight: 1.6,
                color: "var(--black)",
              }}
            >
              A student-led community building curious minds, bold ideas, and
              the future of computing.
            </p>
            <div
              style={{
                display: "flex",
                marginTop: "2rem",
                alignItems: "center",
                gap: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              <a
                href="#about"
                style={{
                  display: "inline-block",
                  fontWeight: 700,
                  backgroundColor: "var(--blue)",
                  color: "var(--white)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  padding: "1.5rem 1.75rem",
                  borderRadius: 0,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                EXPLORE ACE
              </a>
              <a
                href="#members"
                style={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--black)",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                MEET THE COMMUNITY ↗
              </a>
            </div>
          </div>

          {/* Right: scroll indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--black)",
            }}
            aria-label="Scroll to discover"
          >
            <div
              aria-hidden="true"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid var(--black)",
                flexShrink: 0,
              }}
            >
              {/* Arrow Down SVG */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M8 3v10M8 13L4 9M8 13l4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>SCROLL TO DISCOVER</span>
          </div>
        </div>
      </div>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border-width: 0;
        }
        @media (max-width: 640px) {
          /* TOGETHER goes below heading on small screens to avoid overlap */
          #hero .together-tag {
            position: static !important;
            display: block;
            transform: none !important;
            margin-top: 1rem;
            font-size: clamp(2rem, 10vw, 4rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
