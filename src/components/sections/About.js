"use client";

export default function About() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: "var(--cream)",
        padding: "clamp(4rem, 8vw, 8rem) clamp(1.25rem, 4vw, 2.5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section number + label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "clamp(2rem, 4vw, 3.5rem)",
        }}
      >
        <span
          className="text-display"
          style={{ fontSize: "1.125rem", color: "var(--black)" }}
        >
          01
        </span>
        <span
          className="text-label"
          style={{ opacity: 0.5, fontSize: "0.625rem" }}
        >
          About ACE
        </span>
      </div>

      {/* Main layout: heading left, content right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(2rem, 6vw, 5rem)",
        }}
        className="about-grid"
      >
        {/* Heading */}
        <h2
          className="text-display"
          style={{
            fontSize: "clamp(2.75rem, 8vw, 8rem)",
            color: "var(--black)",
            maxWidth: "20ch",
          }}
        >
          We Build the People Behind the Code.
        </h2>

        {/* Right column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          {/* Body copy */}
          <p
            style={{
              fontSize: "clamp(0.875rem, 1.5vw, 1.0625rem)",
              lineHeight: 1.7,
              maxWidth: "40ch",
              opacity: 0.8,
            }}
          >
            ACE is the Association of Computing Engineers — a campus community
            for learners who turn questions into projects. We connect classrooms,
            clubs, and real-world practice through workshops, conversations, and
            collaboration.
          </p>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {[
              { value: "05+", label: "Years of Building" },
              { value: "200+", label: "Curious Members" },
              { value: "24", label: "Events This Year" },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  borderTop: "1px solid rgba(13,13,13,0.12)",
                  paddingTop: "0.75rem",
                }}
              >
                <span
                  className="text-display"
                  style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", color: "var(--black)" }}
                >
                  {value}
                </span>
                <span
                  className="text-label"
                  style={{ fontSize: "0.6875rem", opacity: 0.55 }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Learn More */}
          <div>
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "var(--black)",
                borderBottom: "1.5px solid var(--black)",
                paddingBottom: "2px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.55")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Learn More
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Blue diagonal block — decorative */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "clamp(180px, 30vw, 340px)",
          height: "clamp(120px, 18vw, 220px)",
          backgroundColor: "var(--blue)",
          clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
        }}
      />

      {/* "Join ACE" rotated label on blue block */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 3vw, 2.5rem)",
          right: "clamp(1.25rem, 4vw, 2.5rem)",
          color: "var(--white)",
          fontSize: "0.625rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        Join ACE
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr 1fr !important;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
