"use client";

import { members } from "@/data/members";

const colorMap = {
  blue: "var(--blue)",
  black: "var(--black)",
  yellow: "var(--yellow)",
  salmon: "var(--salmon)",
};

const textColorMap = {
  blue: "var(--white)",
  black: "var(--white)",
  yellow: "var(--black)",
  salmon: "var(--white)",
};

export default function Members() {
  return (
    <section
      id="members"
      style={{
        backgroundColor: "var(--cream)",
        padding: "clamp(4rem, 8vw, 8rem) clamp(1.25rem, 4vw, 2.5rem)",
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <span
              className="text-display"
              style={{ fontSize: "1.125rem", color: "var(--black)" }}
            >
              03
            </span>
            <span
              className="text-label"
              style={{ opacity: 0.5, fontSize: "0.625rem" }}
            >
              Meet the Team
            </span>
          </div>
          <h2
            className="text-display"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 7rem)",
              color: "var(--black)",
              lineHeight: 0.92,
            }}
          >
            The Humans
            <br />
            of ACE.
          </h2>
        </div>

        <p
          style={{
            fontSize: "0.8125rem",
            lineHeight: 1.6,
            maxWidth: "22ch",
            opacity: 0.6,
            alignSelf: "flex-end",
          }}
        >
          Different disciplines.
          <br />
          One curious community.
        </p>
      </div>

      {/* Member grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))",
          gap: "2px",
        }}
      >
        {members.map((member) => (
          <MemberCard key={member.number} member={member} />
        ))}
      </div>

      {/* See all members */}
      <div style={{ marginTop: "2rem" }}>
        <a
          href="#"
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--black)",
            textDecoration: "none",
            opacity: 0.5,
            borderBottom: "1px solid rgba(13,13,13,0.4)",
            paddingBottom: "2px",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
        >
          See All Members →
        </a>
      </div>
    </section>
  );
}

function MemberCard({ member }) {
  const bg = colorMap[member.color] || "var(--black)";
  const fg = textColorMap[member.color] || "var(--white)";

  return (
    <div
      style={{
        backgroundColor: bg,
        color: fg,
        padding: "1.5rem",
        aspectRatio: "1 / 1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        minHeight: "180px",
      }}
    >
      {/* Large initials */}
      <div
        aria-hidden="true"
        className="text-display"
        style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          opacity: 1,
          lineHeight: 1,
        }}
      >
        {member.initials}
      </div>

      {/* Number (top right) */}
      <span
        aria-hidden="true"
        className="text-display"
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
          opacity: 0.35,
          lineHeight: 1,
        }}
      >
        {member.number}
      </span>

      {/* Bottom info */}
      <div>
        <p
          className="text-label"
          style={{
            fontSize: "0.5625rem",
            opacity: 0.65,
            marginBottom: "0.375rem",
          }}
        >
          {member.number} / {member.name} / {member.role}
        </p>
        <p
          style={{
            fontSize: "0.75rem",
            lineHeight: 1.45,
            opacity: 0.85,
          }}
        >
          {member.description}
        </p>
      </div>
    </div>
  );
}
