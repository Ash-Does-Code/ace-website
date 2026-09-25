"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ORBIT_RADIUS = 350; // half of the 700px decorative circle

export default function Hero() {
  const sectionRef  = useRef(null);
  const metaRef     = useRef(null);
  const headingRef  = useRef(null);
  const togetherRef = useRef(null);
  const orbitDotRef = useRef(null);
  const angleRef    = useRef(Math.PI * 1.5); // start at top of circle (12-o'clock)

  // ── Fade-in + orbit animation ──────────────────────────────────────────────
  useGSAP(
    () => {
      // Initial visibility (hidden before animation)
      gsap.set([metaRef.current, headingRef.current, togetherRef.current], {
        opacity: 0,
      });

      // Fade-in timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(metaRef.current,     { opacity: 1, y: 0, duration: 0.7, delay: 0.15 })
        .to(headingRef.current,  { opacity: 1, y: 0, duration: 0.85 }, "-=0.35")
        .to(togetherRef.current, { opacity: 1, scale: 1, rotation: -7, duration: 0.55 }, "-=0.4");

      // Initial state for TOGETHER (scale-down, rotation handled in tween target)
      gsap.set(togetherRef.current, { scale: 0.88, rotation: -7 });

      // Orbiting dot — runs every tick via gsap.ticker
      const tick = () => {
        angleRef.current += 0.006; // radians/frame — adjust for speed
        const x = Math.cos(angleRef.current) * ORBIT_RADIUS;
        const y = Math.sin(angleRef.current) * ORBIT_RADIUS;
        gsap.set(orbitDotRef.current, { x, y });
      };

      gsap.ticker.add(tick);
      return () => {
        tl.kill();
        gsap.ticker.remove(tick);
      };
    },
    { scope: sectionRef }
  );

  // ── Scroll-snap: one scroll wheel tick → About section ────────────────────
  useEffect(() => {
    let locked = false;
    let heroVisible = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting && entry.intersectionRatio >= 0.4;
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    const onWheel = (e) => {
      if (!heroVisible || locked || e.deltaY <= 0) return;
      locked = true;
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { locked = false; }, 1400);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      io.disconnect();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        backgroundColor: "var(--cream)",
        position: "relative",
        padding: "3rem",
        minHeight: "100svh",
        overflow: "hidden",
      }}
    >
      {/* ── Decorative circle outline ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "5rem",
          right: "-120px",
          width: `${ORBIT_RADIUS * 2}px`,
          height: `${ORBIT_RADIUS * 2}px`,
          borderRadius: "50%",
          border: "1px solid rgba(13,13,13,0.2)",
          pointerEvents: "none",
        }}
      />

      {/* ── Orbit container — same origin as circle ────────────────────────
          Center anchor sits at the geometric centre of the decorative ring.
          The dot is placed at (0,0) = centre, then GSAP moves it via x/y.  */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "5rem",
          right: "-120px",
          width: `${ORBIT_RADIUS * 2}px`,
          height: `${ORBIT_RADIUS * 2}px`,
          pointerEvents: "none",
        }}
      >
        {/* Anchor at circle centre */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 0,
            height: 0,
          }}
        >
          <div
            ref={orbitDotRef}
            style={{
              position: "absolute",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "var(--blue)",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>

      {/* ── Static accent dot ─────────────────────────────────────────────── */}
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
          pointerEvents: "none",
        }}
      />

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          maxWidth: "1760px",
          margin: "0 auto",
        }}
      >
        {/* Top meta row */}
        <div
          ref={metaRef}
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

        {/* Main heading */}
        <div
          ref={headingRef}
          style={{
            // marginTop: "4rem",
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

          {/* TOGETHER */}
          <span
            ref={togetherRef}
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
              transformOrigin: "center center",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            TOGETHER
          </span>
          <span className="sr-only">Together</span>
        </div>
      </div>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </section>
  );
}
