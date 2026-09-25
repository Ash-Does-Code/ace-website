"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        backgroundColor: "var(--cream)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 clamp(1.25rem, 4vw, 2.5rem)",
        paddingBottom: "clamp(3rem, 6vw, 5rem)",
        overflow: "hidden",
      }}
    >
      {/* Top meta row */}
      <div
        style={{
          position: "absolute",
          top: "52px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "1.25rem clamp(1.25rem, 4vw, 2.5rem)",
          borderBottom: "1px solid rgba(13,13,13,0.15)",
        }}
      >
        <div style={{ lineHeight: 1.4 }}>
          <p className="text-label" style={{ opacity: 0.5, fontSize: "0.625rem" }}>
            Association of Computing Engineers
          </p>
          <p className="text-label" style={{ opacity: 0.5, fontSize: "0.625rem" }}>
            2024–25
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.25rem",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {["Coders", "Creators", "Collaborators"].map((tag, i) => (
            <span
              key={tag}
              className="text-label"
              style={{
                fontSize: "0.625rem",
                opacity: 0.5,
              }}
            >
              {tag}
              {i < 2 ? " /" : ""}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative dot */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          right: "28%",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "var(--blue)",
        }}
      />

      {/* Display heading */}
      <div style={{ position: "relative", zIndex: 1, marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
        <h1
          className="text-display"
          style={{
            fontSize: "clamp(4.5rem, 16vw, 18rem)",
            lineHeight: 0.88,
            color: "var(--black)",
          }}
        >
          <span style={{ display: "block" }}>ACE</span>
          <span style={{ display: "block" }}>
            COMPU
            <span style={{ color: "var(--blue)" }}>TE</span>
          </span>
          <span style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0.15em" }}>
            <span>LOUD.</span>
            <span
              style={{
                color: "var(--blue)",
                fontSize: "0.45em",
                fontWeight: 900,
                letterSpacing: "0.08em",
                marginLeft: "0.25em",
                alignSelf: "flex-end",
                paddingBottom: "0.1em",
              }}
            >
              TOGETHER
            </span>
          </span>
        </h1>
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "clamp(0.8125rem, 1.5vw, 1rem)",
              lineHeight: 1.55,
              maxWidth: "28rem",
              marginBottom: "1.5rem",
              opacity: 0.8,
            }}
          >
            A student-led community building curious minds, bold ideas,
            and the future of computing.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href="#about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.625rem 1.25rem",
                backgroundColor: "var(--blue)",
                color: "var(--white)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Explore ACE
            </a>
            <a
              href="#members"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.625rem 1.25rem",
                backgroundColor: "transparent",
                color: "var(--black)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1.5px solid rgba(13,13,13,0.3)",
                borderRadius: "2px",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--black)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(13,13,13,0.3)")}
            >
              Meet the Community
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            opacity: 0.45,
          }}
          aria-hidden="true"
        >
          <span
            style={{
              width: "24px",
              height: "1px",
              backgroundColor: "var(--black)",
              display: "inline-block",
            }}
          />
          <span className="text-label" style={{ fontSize: "0.625rem" }}>
            Scroll to Discover
          </span>
        </div>
      </div>
    </section>
  );
}
