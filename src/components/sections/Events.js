"use client";

import { useRef, useState, useCallback, useEffect, forwardRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { events } from "@/data/events";

// Card dimensions
const CARD_WIDTH_PX = 360;
const CARD_GAP_PX = 24;
const ACTIVE_SCALE = 1;
const INACTIVE_SCALE = 0.95;
const INACTIVE_OPACITY = 0.45;

// Card background per event index
function getCardBg(index) {
  if (index === 1) return "var(--blue-light)";
  return "var(--cream)";
}

// ─── Event Card ───────────────────────────────────────────────────────────────

const EventCard = forwardRef(function EventCard(
  { event, isActive, onClick, ...rest },
  ref
) {
  return (
    <article
      ref={ref}
      onClick={onClick}
      role="group"
      aria-roledescription="slide"
      aria-label={`Event ${event.number}: ${event.title}`}
      style={{
        flexShrink: 0,
        width: `${CARD_WIDTH_PX}px`,
        minHeight: "260px",
        backgroundColor: getCardBg(event.id - 1),
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        willChange: "transform, opacity",
        userSelect: "none",
        borderRadius: "2px",
      }}
      {...rest}
    >
      {/* Card header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}
      >
        <span
          className="text-label"
          style={{ fontSize: "0.625rem", color: "var(--black)", opacity: 0.5 }}
        >
          {event.number}
        </span>
        <span
          className="text-label"
          style={{
            fontSize: "0.625rem",
            color: "var(--black)",
            opacity: 0.6,
            backgroundColor: "rgba(13,13,13,0.08)",
            padding: "0.2rem 0.5rem",
            borderRadius: "1px",
          }}
        >
          {event.category}
        </span>
      </div>

      {/* Date */}
      <div>
        <p
          className="text-display"
          style={{
            fontSize: "clamp(2rem, 5vw, 2.75rem)",
            color: "var(--black)",
            lineHeight: 1,
            marginBottom: "0.625rem",
          }}
        >
          {event.date}
        </p>

        {/* Title */}
        <h3
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            fontWeight: 700,
            color: "var(--black)",
            lineHeight: 1.2,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            marginBottom: "0.75rem",
          }}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "0.8125rem",
            lineHeight: 1.6,
            color: "var(--black)",
            opacity: 0.65,
            marginBottom: "1.5rem",
          }}
        >
          {event.description}
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          className="text-label"
          style={{ fontSize: "0.625rem", color: "var(--black)", opacity: 0.5 }}
        >
          {event.venue}
        </span>
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "var(--blue)",
          }}
        />
      </div>
    </article>
  );
});

// ─── Events Section ───────────────────────────────────────────────────────────

export default function Events() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const isAnimating = useRef(false);

  // Measure container width
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Calculate track x-offset so active card is centred
  const getTrackX = useCallback(
    (index) => {
      if (!containerWidth) return 0;
      const cardTotal = CARD_WIDTH_PX + CARD_GAP_PX;
      const centerOffset = containerWidth / 2 - CARD_WIDTH_PX / 2;
      return centerOffset - index * cardTotal;
    },
    [containerWidth]
  );

  // Navigate to a card index with GSAP
  const goTo = useCallback(
    (index) => {
      if (isAnimating.current) return;
      const clamped = Math.max(0, Math.min(events.length - 1, index));
      isAnimating.current = true;

      gsap.to(trackRef.current, {
        x: getTrackX(clamped),
        duration: 0.65,
        ease: "power3.out",
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const active = i === clamped;
        gsap.to(card, {
          scale: active ? ACTIVE_SCALE : INACTIVE_SCALE,
          opacity: active ? 1 : INACTIVE_OPACITY,
          duration: 0.5,
          ease: "power2.out",
        });
      });

      setActiveIndex(clamped);
    },
    [getTrackX]
  );

  // Set initial positions without animation
  useGSAP(
    () => {
      if (!containerWidth || !trackRef.current) return;
      gsap.set(trackRef.current, { x: getTrackX(activeIndex) });
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, {
          scale: i === activeIndex ? ACTIVE_SCALE : INACTIVE_SCALE,
          opacity: i === activeIndex ? 1 : INACTIVE_OPACITY,
        });
      });
    },
    { scope: containerRef, dependencies: [containerWidth] }
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    },
    [activeIndex, goTo]
  );

  // Touch drag
  const touchStartX = useRef(null);
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(diff > 0 ? activeIndex + 1 : activeIndex - 1);
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="events"
      style={{
        backgroundColor: "var(--black)",
        color: "var(--white)",
        padding: "clamp(3.5rem, 7vw, 6rem) 0",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "0 clamp(1.25rem, 4vw, 2.5rem)",
          marginBottom: "clamp(2rem, 5vw, 4rem)",
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
              style={{ fontSize: "1.125rem", color: "var(--white)" }}
            >
              02
            </span>
            <span
              className="text-label"
              style={{ opacity: 0.45, fontSize: "0.625rem", color: "var(--white)" }}
            >
              Upcoming Events
            </span>
          </div>
          <h2
            className="text-display"
            style={{
              fontSize: "clamp(2.25rem, 6vw, 5.5rem)",
              color: "var(--white)",
              lineHeight: 0.92,
            }}
          >
            Put Ideas
            <br />
            in Motion.
          </h2>
        </div>

        {/* Arrow navigation */}
        <div
          style={{
            display: "flex",
            gap: "0.625rem",
            alignSelf: "flex-end",
          }}
        >
          {[
            { label: "Previous event", dir: -1, symbol: "←", disabled: activeIndex === 0 },
            { label: "Next event", dir: 1, symbol: "→", disabled: activeIndex === events.length - 1 },
          ].map(({ label, dir, symbol, disabled }) => (
            <button
              key={label}
              onClick={() => goTo(activeIndex + dir)}
              disabled={disabled}
              aria-label={label}
              style={{
                width: "40px",
                height: "40px",
                border: "1.5px solid rgba(255,255,255,0.3)",
                borderRadius: "50%",
                backgroundColor: "transparent",
                color: "var(--white)",
                fontSize: "1rem",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.3 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s, opacity 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!disabled) e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              }}
            >
              {symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div
        style={{
          padding: "0 clamp(1.25rem, 4vw, 2.5rem)",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span
          className="text-label"
          style={{ fontSize: "0.625rem", color: "var(--white)", opacity: 0.45 }}
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
        </span>
        <div
          style={{
            flex: 1,
            maxWidth: "120px",
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.15)",
            position: "relative",
            overflow: "hidden",
          }}
          role="progressbar"
          aria-valuenow={activeIndex + 1}
          aria-valuemin={1}
          aria-valuemax={events.length}
          aria-label="Event progress"
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              backgroundColor: "var(--white)",
              width: `${((activeIndex + 1) / events.length) * 100}%`,
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </div>

      {/* Card track */}
      <div
        ref={containerRef}
        style={{ position: "relative", overflow: "visible" }}
        onKeyDown={handleKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        tabIndex={0}
        role="region"
        aria-label="Events carousel"
        aria-roledescription="carousel"
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: `${CARD_GAP_PX}px`,
            willChange: "transform",
          }}
        >
          {events.map((event, i) => (
            <EventCard
              key={event.id}
              event={event}
              isActive={i === activeIndex}
              ref={(el) => { cardRefs.current[i] = el; }}
              onClick={() => goTo(i)}
              aria-selected={i === activeIndex}
            />
          ))}
        </div>
      </div>

      {/* See all events */}
      <div
        style={{
          padding: "2rem clamp(1.25rem, 4vw, 2.5rem) 0",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <a
          href="#"
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--white)",
            textDecoration: "none",
            opacity: 0.5,
            borderBottom: "1px solid rgba(255,255,255,0.4)",
            paddingBottom: "2px",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
        >
          See All Events →
        </a>
      </div>
    </section>
  );
}
