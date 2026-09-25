"use client";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--black)",
        color: "var(--white)",
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2.5rem) clamp(1.5rem, 3vw, 2.5rem)",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(160px, 100%), 1fr))",
          gap: "clamp(2rem, 4vw, 4rem)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: "clamp(2.5rem, 5vw, 4rem)",
          marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
        }}
      >
        {/* Brand */}
        <div>
          <p
            className="text-display"
            style={{ fontSize: "1.5rem", color: "var(--white)", marginBottom: "0.5rem" }}
          >
            ACE
          </p>
          <p
            className="text-label"
            style={{ fontSize: "0.5625rem", opacity: 0.4, lineHeight: 1.6 }}
          >
            Make Something Worth Sharing.
          </p>
        </div>

        {/* Explore */}
        <div>
          <p
            className="text-label"
            style={{ fontSize: "0.5625rem", opacity: 0.4, marginBottom: "1rem" }}
          >
            Explore
          </p>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {["About", "Events", "Members", "Clusters"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--white)",
                    textDecoration: "none",
                    opacity: 0.7,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <p
            className="text-label"
            style={{ fontSize: "0.5625rem", opacity: 0.4, marginBottom: "1rem" }}
          >
            Connect
          </p>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {["Instagram", "LinkedIn", "X", "Email us"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--white)",
                    textDecoration: "none",
                    opacity: 0.7,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Visit */}
        <div>
          <p
            className="text-label"
            style={{ fontSize: "0.5625rem", opacity: 0.4, marginBottom: "1rem" }}
          >
            Visit
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--white)",
              opacity: 0.7,
              lineHeight: 1.7,
            }}
          >
            Association of Computing Engineers
            <br />
            Your College Campus
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <p
            className="text-label"
            style={{ fontSize: "0.5625rem", opacity: 0.4, marginBottom: "1rem" }}
          >
            Newsletter
          </p>
          <p
            style={{ fontSize: "0.8125rem", opacity: 0.6, marginBottom: "0.875rem", lineHeight: 1.5 }}
          >
            Get the good stuff.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", gap: "0", maxWidth: "240px" }}
          >
            <input
              type="email"
              placeholder="email@domain"
              aria-label="Email address for newsletter"
              style={{
                flex: 1,
                padding: "0.5rem 0.75rem",
                fontSize: "0.75rem",
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRight: "none",
                color: "var(--white)",
                outline: "none",
                borderRadius: "2px 0 0 2px",
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.5rem 0.75rem",
                backgroundColor: "var(--blue)",
                border: "none",
                color: "var(--white)",
                fontSize: "0.625rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: "0 2px 2px 0",
                flexShrink: 0,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <p
          className="text-label"
          style={{ fontSize: "0.5625rem", opacity: 0.35 }}
        >
          © 2024 ACE / Built by students, for students.
        </p>
        <a
          href="#"
          className="text-label"
          style={{
            fontSize: "0.5625rem",
            opacity: 0.35,
            color: "var(--white)",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
        >
          Back to Top ↑
        </a>
      </div>
    </footer>
  );
}
