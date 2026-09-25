"use client";

import { members } from "@/data/members";

const cardColors = {
  blue:   { bg: "#2D5BFF", color: "#ffffff" },
  black:  { bg: "#111111", color: "#F4F0E8" },
  yellow: { bg: "#F2D66B", color: "#111111" },
  salmon: { bg: "#E97960", color: "#111111" },
};

export default function Members() {
  return (
    <section
      id="members"
      style={{
        backgroundColor: "var(--cream)",
        padding: "8rem 3rem",
      }}
    >
      <div style={{ maxWidth: "1760px", margin: "0 auto" }}>

        {/* ── Section header: 3-col grid ─────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr auto",
            alignItems: "flex-end",
            gap: "2rem",
          }}
          className="members-header"
        >
          {/* Number */}
          <div
            style={{
              fontWeight: 900,
              color: "var(--blue)",
              fontSize: "3rem",
              lineHeight: 1,
            }}
          >
            03
          </div>

          {/* Label + heading */}
          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--black)",
              }}
            >
              Meet the Team
            </p>
            <h2
              style={{
                fontSize: "clamp(4rem, 8vw, 9rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                lineHeight: 1,
                letterSpacing: "-0.07em",
                marginTop: "1.5rem",
                color: "var(--black)",
              }}
            >
              The Humans of ACE.
            </h2>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontWeight: 700,
              fontSize: "1.125rem",
              maxWidth: "16rem",
              color: "var(--black)",
              lineHeight: 1.5,
            }}
            className="members-tagline"
          >
            Different disciplines.
            <br />
            One curious community.
          </p>
        </div>

        {/* ── Member card grid ───────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            columnGap: "1.5rem",
            rowGap: "4rem",
            marginTop: "5rem",
          }}
          className="members-grid"
        >
          {members.map((member) => {
            const { bg, color } = cardColors[member.color] || cardColors.black;
            return (
              <article
                key={member.number}
                style={{ paddingTop: member.offset ? "4rem" : "0" }}
              >
                {/* Coloured card */}
                <div
                  style={{
                    backgroundColor: bg,
                    color: color,
                    fontWeight: 900,
                    fontSize: "3.75rem",    /* text-6xl */
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    padding: "1.5rem",
                    height: "20rem",        /* h-80 */
                  }}
                >
                  <span>{member.initials}</span>
                  <span style={{ fontSize: "6rem" /* text-8xl */ }}>
                    {member.number}
                  </span>
                </div>

                {/* Role label */}
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginTop: "1.25rem",
                    color: "var(--black)",
                  }}
                >
                  {member.number} / {member.name} / {member.role}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontSize: "1.125rem",
                    marginTop: "0.75rem",
                    color: "var(--black)",
                    lineHeight: 1.6,
                  }}
                >
                  {member.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* ── See all members ─────────────────────────────────────────────── */}
        <a
          href="#footer"
          style={{
            fontWeight: 700,
            color: "var(--blue)",
            fontSize: "0.75rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            display: "inline-block",
            marginTop: "4rem",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          SEE ALL MEMBERS ↗
        </a>
      </div>

      <style>{`
        /* Tablet: 2 cols, hide tagline from header */
        @media (max-width: 900px) {
          .members-header {
            grid-template-columns: 80px 1fr !important;
          }
          .members-tagline {
            display: none;
          }
          .members-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        /* Mobile: 1 col, remove stagger offset */
        @media (max-width: 540px) {
          .members-header {
            grid-template-columns: 60px 1fr !important;
          }
          .members-grid {
            grid-template-columns: 1fr !important;
          }
          .members-grid article {
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
