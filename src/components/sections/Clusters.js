"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { clusters } from "@/data/clusters";

/**
 * Clusters Section
 *
 * States:
 *   "cta"      → shows the "CLICK TO EXPLORE CLUSTERS →" prompt
 *   "explorer" → shows the full cluster explorer (list + detail)
 *
 * GSAP drives all visual transitions.
 * React state drives which cluster is selected.
 */
export default function Clusters() {
  const sectionRef = useRef(null);
  const ctaRef = useRef(null);
  const explorerRef = useRef(null);
  const detailRef = useRef(null);

  const [mode, setMode] = useState("cta"); // "cta" | "explorer"
  const [activeId, setActiveId] = useState(clusters[0].id);
  const [displayedCluster, setDisplayedCluster] = useState(clusters[0]);

  // ─── Open explorer ───────────────────────────────────────────────────────
  const openExplorer = useCallback(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setMode("explorer");
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setMode("explorer"),
    });

    // Fade + shrink CTA out
    tl.to(ctaRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.35,
      ease: "power2.in",
    });
  }, []);

  // ─── When mode changes to "explorer", animate explorer in ────────────────
  useEffect(() => {
    if (mode !== "explorer" || !explorerRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Reveal explorer panel
    gsap.fromTo(
      explorerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
    );

    // Stagger cluster name items
    const items = explorerRef.current.querySelectorAll(".cluster-item");
    gsap.fromTo(
      items,
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: "power2.out", delay: 0.1 }
    );

    // Stagger detail lines
    const lines = explorerRef.current.querySelectorAll(".detail-line");
    gsap.fromTo(
      lines,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out", delay: 0.3 }
    );
  }, [mode]);

  // ─── Cluster selection ───────────────────────────────────────────────────
  const selectCluster = useCallback(
    (cluster) => {
      if (cluster.id === activeId || !detailRef.current) return;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        setActiveId(cluster.id);
        setDisplayedCluster(cluster);
        return;
      }

      // Fade detail content out → swap data → fade in
      const lines = detailRef.current.querySelectorAll(".detail-line");
      gsap.to(lines, {
        opacity: 0,
        y: -12,
        duration: 0.22,
        stagger: 0.04,
        ease: "power2.in",
        onComplete: () => {
          setActiveId(cluster.id);
          setDisplayedCluster(cluster);
          // Next tick: content has updated, animate back in
          requestAnimationFrame(() => {
            const newLines = detailRef.current?.querySelectorAll(".detail-line");
            if (!newLines) return;
            gsap.fromTo(
              newLines,
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }
            );
          });
        },
      });
    },
    [activeId]
  );

  // ─── Close / back ────────────────────────────────────────────────────────
  const closeExplorer = useCallback(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setMode("cta");
      return;
    }

    gsap.to(explorerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setMode("cta");
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      },
    });
  }, []);

  // ─── Keyboard nav in explorer ────────────────────────────────────────────
  const handleExplorerKey = useCallback(
    (e) => {
      if (mode !== "explorer") return;
      const idx = clusters.findIndex((c) => c.id === activeId);
      if (e.key === "ArrowUp" && idx > 0) selectCluster(clusters[idx - 1]);
      if (e.key === "ArrowDown" && idx < clusters.length - 1) selectCluster(clusters[idx + 1]);
      if (e.key === "Escape") closeExplorer();
    },
    [mode, activeId, selectCluster, closeExplorer]
  );

  return (
    <section
      id="clusters"
      ref={sectionRef}
      onKeyDown={handleExplorerKey}
      style={{
        backgroundColor: "var(--cream)",
        borderTop: "1px solid rgba(13,13,13,0.12)",
        minHeight: mode === "explorer" ? "80vh" : "auto",
        transition: "min-height 0.5s ease",
      }}
    >
      {/* ── CTA state ────────────────────────────────────────────────────── */}
      {mode === "cta" && (
        <div
          ref={ctaRef}
          style={{
            padding: "clamp(4rem, 8vw, 7rem) clamp(1.25rem, 4vw, 2.5rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1rem",
          }}
        >
          <p
            className="text-label"
            style={{ opacity: 0.45, fontSize: "0.625rem", marginBottom: "0.5rem" }}
          >
            Find your cluster in ACE
          </p>

          <button
            id="clusters-cta-btn"
            onClick={openExplorer}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
            aria-label="Open cluster explorer"
          >
            <span
              className="text-display"
              style={{
                fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
                color: "var(--black)",
                lineHeight: 1,
                textAlign: "center",
              }}
            >
              Click to Explore Clusters
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "clamp(36px, 5vw, 52px)",
                height: "clamp(36px, 5vw, 52px)",
                borderRadius: "50%",
                backgroundColor: "var(--blue)",
                color: "var(--white)",
                fontSize: "clamp(1rem, 2vw, 1.375rem)",
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              →
            </span>
          </button>

          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.8125rem",
              opacity: 0.5,
              maxWidth: "36ch",
              lineHeight: 1.6,
            }}
          >
            Design, development, data, hardware, and everything in between.
          </p>
        </div>
      )}

      {/* ── Explorer state ───────────────────────────────────────────────── */}
      {mode === "explorer" && (
        <div
          ref={explorerRef}
          style={{ opacity: 0 }} // will be animated in via useEffect
        >
          {/* Explorer header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "clamp(2rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2.5rem)",
              borderBottom: "1px solid rgba(13,13,13,0.12)",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <p
                className="text-label"
                style={{ opacity: 0.45, fontSize: "0.625rem", marginBottom: "0.5rem" }}
              >
                Cluster Explorer
              </p>
              <h2
                className="text-display"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", color: "var(--black)" }}
              >
                Explore Clusters
              </h2>
            </div>
            <button
              onClick={closeExplorer}
              aria-label="Close cluster explorer"
              style={{
                background: "none",
                border: "1.5px solid rgba(13,13,13,0.2)",
                borderRadius: "2px",
                padding: "0.375rem 0.875rem",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--black)",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--black)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(13,13,13,0.2)")}
            >
              ← Back
            </button>
          </div>

          {/* Two-column layout: list | detail */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
            }}
            className="clusters-layout"
          >
            {/* ── Cluster list ─────────────────────────────────────────── */}
            <div
              style={{
                borderRight: "0px solid rgba(13,13,13,0.12)",
                padding: "0",
              }}
              className="clusters-list-col"
            >
              <ul
                style={{ listStyle: "none", padding: 0, margin: 0 }}
                role="listbox"
                aria-label="Clusters"
                aria-orientation="vertical"
              >
                {clusters.map((cluster, i) => {
                  const isActive = cluster.id === activeId;
                  return (
                    <li
                      key={cluster.id}
                      role="option"
                      aria-selected={isActive}
                      className="cluster-item"
                    >
                      <button
                        id={`cluster-btn-${cluster.id}`}
                        onClick={() => selectCluster(cluster)}
                        style={{
                          width: "100%",
                          background: "none",
                          border: "none",
                          borderBottom: "1px solid rgba(13,13,13,0.1)",
                          borderTop: i === 0 ? "1px solid rgba(13,13,13,0.1)" : "none",
                          padding: "1.25rem clamp(1.25rem, 4vw, 2.5rem)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          textAlign: "left",
                          backgroundColor: isActive ? "var(--black)" : "transparent",
                          color: isActive ? "var(--white)" : "var(--black)",
                          transition: "background-color 0.25s, color 0.25s",
                        }}
                        aria-label={`Select ${cluster.name}`}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = "rgba(13,13,13,0.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <span
                            className="text-display"
                            style={{
                              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                              opacity: isActive ? 1 : 0.35,
                              transition: "opacity 0.25s",
                              lineHeight: 1,
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <p
                              style={{
                                fontWeight: 700,
                                fontSize: "clamp(0.9375rem, 2vw, 1.125rem)",
                                textTransform: "uppercase",
                                letterSpacing: "0.03em",
                                lineHeight: 1.2,
                                marginBottom: "0.25rem",
                              }}
                            >
                              {cluster.name}
                            </p>
                            <p
                              style={{
                                fontSize: "0.75rem",
                                opacity: isActive ? 0.65 : 0.45,
                                transition: "opacity 0.25s",
                              }}
                            >
                              {cluster.shortDescription}
                            </p>
                          </div>
                        </div>

                        <span
                          aria-hidden="true"
                          style={{
                            fontSize: "1.25rem",
                            opacity: isActive ? 1 : 0.25,
                            transition: "opacity 0.25s, transform 0.25s",
                            transform: isActive ? "translateX(0)" : "translateX(-4px)",
                          }}
                        >
                          →
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ── Cluster detail ───────────────────────────────────────── */}
            <div
              ref={detailRef}
              style={{
                padding: "clamp(2rem, 5vw, 3.5rem) clamp(1.25rem, 4vw, 2.5rem)",
                backgroundColor: "var(--black)",
                color: "var(--white)",
                minHeight: "360px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              className="clusters-detail-col"
            >
              {/* Detail content — animated on cluster change */}
              <div>
                <p
                  className="text-label detail-line"
                  style={{
                    fontSize: "0.625rem",
                    opacity: 0.45,
                    marginBottom: "1.5rem",
                    color: "var(--white)",
                  }}
                >
                  {displayedCluster.members}
                </p>

                <h3
                  className="text-display detail-line"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 4rem)",
                    color: "var(--white)",
                    lineHeight: 0.92,
                    marginBottom: "1.5rem",
                  }}
                >
                  {displayedCluster.name}
                </h3>

                <p
                  className="detail-line"
                  style={{
                    fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                    lineHeight: 1.7,
                    opacity: 0.7,
                    maxWidth: "40ch",
                    color: "var(--white)",
                  }}
                >
                  {displayedCluster.description}
                </p>
              </div>

              {/* Cluster CTA */}
              <div className="detail-line" style={{ marginTop: "2.5rem" }}>
                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.625rem 1.25rem",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    color: "var(--white)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderRadius: "2px",
                    transition: "border-color 0.2s, background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--white)";
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Join this Cluster →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .clusters-layout {
            grid-template-columns: 1fr 1fr !important;
          }
          .clusters-list-col {
            border-right: 1px solid rgba(13,13,13,0.12) !important;
          }
        }
      `}</style>
    </section>
  );
}
