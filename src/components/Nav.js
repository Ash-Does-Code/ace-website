"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1.25rem, 4vw, 2.5rem)",
        height: "52px",
        backgroundColor: scrolled ? "rgba(237,232,218,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(13,13,13,0.12)" : "1px solid transparent",
        transition: "background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          fontFamily: "var(--font-display), sans-serif",
          fontWeight: 700,
          fontSize: "1.125rem",
          letterSpacing: "0.04em",
          color: "var(--black)",
          textDecoration: "none",
        }}
        aria-label="ACE — Home"
      >
        ACE
      </a>

      {/* Nav links (hidden on mobile) */}
      <nav
        aria-label="Primary navigation"
        style={{
          display: "flex",
          gap: "2rem",
        }}
        className="ace-nav-links"
      >
        {["About", "Events", "Members", "Clusters"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--black)",
              textDecoration: "none",
              opacity: 0.7,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <a
        href="#"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          padding: "0.375rem 1rem",
          border: "1.5px solid var(--black)",
          borderRadius: "2px",
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--black)",
          textDecoration: "none",
          transition: "background-color 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--black)";
          e.currentTarget.style.color = "var(--cream)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "var(--black)";
        }}
      >
        Join ACE
        <span aria-hidden="true">→</span>
      </a>

      <style>{`
        @media (max-width: 640px) {
          .ace-nav-links {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
