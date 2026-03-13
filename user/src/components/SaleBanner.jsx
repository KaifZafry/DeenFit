import { useState, useEffect, useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Link } from "react-router-dom";

function pad(n) {
  return String(n).padStart(2, "0");
}

const CountdownItem = ({ value, label }) => (
  <div className="sale-countdown-item text-center">
    <span className="sale-countdown-num d-block">{value}</span>
    <span className="sale-countdown-label d-block mt-1">{label}</span>
  </div>
);

const Colon = () => (
  <span className="sale-colon align-self-center mb-3">:</span>
);

export default function SaleBanner() {
  const [secs, setSecs] = useState(8 * 3600 + 47 * 60 + 33);
  const ref = useRef(null);
  const visible = useScrollReveal(ref);

  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;

  return (
    <div
      ref={ref}
      className={`sale-wrapper overflow-hidden${visible ? " sale-visible" : " sale-hidden"}`}
    >
      <div className="sale-inner position-relative">
        {/* Background glow */}
        <div className="sale-glow position-absolute top-0 start-0 w-100 h-100" />

        <div className="sale-grid">
          {/* Left — Text */}
          <div className="sale-left position-relative d-flex flex-column justify-content-center">
            <p className="sale-eyebrow mb-3">Limited Time Offer</p>
            <h2 className="sale-title mb-3">
              Biggest
              <strong className="sale-title-accent d-block">Sale Is Live</strong>
            </h2>
            <p className="sale-desc mb-4">
              Get 20% off on all headwear.<br />Early Bird pricing — ends soon.
            </p>

            {/* Countdown */}
            <div className="d-flex align-items-end gap-2 mb-4 mb-sm-5">
              <CountdownItem value={pad(h)} label="Hours" />
              <Colon />
              <CountdownItem value={pad(m)} label="Mins" />
              <Colon />
              <CountdownItem value={pad(s)} label="Secs" />
            </div>

            <Link to="/products" className="sale-btn position-relative overflow-hidden border-0 align-self-start">
              <span className="position-relative" style={{ zIndex: 1 }}>Shop the Sale</span>
              <span className="sale-btn-shine position-absolute top-0 start-0 w-100 h-100" />
            </Link>
          </div>

          {/* Right — Image */}
          <div className="sale-right position-relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"
              alt="Sale"
              className="sale-img position-absolute top-0 start-0 w-100 h-100"
            />
            {/* Left fade */}
            <div className="sale-img-fade position-absolute top-0 start-0 w-100 h-100" />

            {/* Discount badge */}
            <div className="sale-badge position-absolute text-center">
              <span className="sale-badge-num d-block">20%</span>
              <p className="sale-badge-label mb-0 mt-2">OFF Everything</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ─── Wrapper ───────────────────────────────── */
        .sale-wrapper {
          margin: 0 1rem;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        @media (min-width: 576px) { .sale-wrapper { margin: 0 2rem; } }
        @media (min-width: 992px) { .sale-wrapper { margin: 0 4rem; } }
        @media (min-width: 1200px) { .sale-wrapper { margin: 0 5rem; } }

        .sale-visible { opacity: 1; transform: translateY(0); }
        .sale-hidden  { opacity: 0; transform: translateY(2rem); }

        /* ─── Inner card ────────────────────────────── */
        .sale-inner { background: #1A1815; }
        .sale-glow {
          background: radial-gradient(ellipse at 40% 50%, rgba(201,168,76,0.10) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        /* ─── Two-column grid ───────────────────────── */
        .sale-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 992px) {
          .sale-grid { grid-template-columns: 1fr 1fr; }
        }

        /* ─── Left panel ────────────────────────────── */
        .sale-left {
          position: relative;
          z-index: 10;
          padding: 3rem 1.75rem;
        }
        @media (min-width: 576px) { .sale-left { padding: 4rem 3rem; } }
        @media (min-width: 992px) { .sale-left { padding: 5rem 3.5rem; } }

        /* ─── Eyebrow ───────────────────────────────── */
        .sale-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #C9A84C;
          font-weight: 500;
        }

        /* ─── Title ─────────────────────────────────── */
        .sale-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          color: #F5F0E8;
          line-height: 0.95;
          font-size: clamp(42px, 8vw, 64px);
        }
        .sale-title-accent {
          font-weight: 300;
          font-style: italic;
          color: #C9A84C;
        }

        /* ─── Description ───────────────────────────── */
        .sale-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(212,197,169,0.50);
          line-height: 1.8;
          font-weight: 300;
        }
        @media (min-width: 576px) { .sale-desc { font-size: 11px; } }

        /* ─── Countdown item ────────────────────────── */
        .sale-countdown-item {
          border: 1px solid rgba(201,168,76,0.20);
          padding: 0.75rem 0.75rem;
          min-width: 52px;
        }
        @media (min-width: 576px) {
          .sale-countdown-item {
            padding: 0.75rem 1.25rem;
            min-width: 64px;
          }
        }
        .sale-countdown-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.75rem;
          font-weight: 300;
          color: #E8C97A;
          line-height: 1;
        }
        @media (min-width: 576px) { .sale-countdown-num { font-size: 2.25rem; } }
        .sale-countdown-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 7px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #8A7D6B;
        }
        @media (min-width: 576px) { .sale-countdown-label { font-size: 8px; } }

        /* ─── Colon ─────────────────────────────────── */
        .sale-colon {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          color: #C9A84C;
          opacity: 0.6;
          animation: blink 1s step-end infinite;
        }
        @media (min-width: 576px) { .sale-colon { font-size: 1.75rem; } }

        /* ─── Button ────────────────────────────────── */
        .sale-btn {
          background: #C9A84C;
          color: #0D0C0A;
          padding: 1rem 2rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 500;
          cursor: pointer;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .sale-btn:hover {
          box-shadow: 0 12px 36px rgba(201,168,76,0.3);
          transform: translateY(-2px);
        }
        .sale-btn-shine {
          background: rgba(255,255,255,0.15);
          transform: translateX(-100%) skewX(12deg);
          transition: transform 0.5s ease;
        }
        .sale-btn:hover .sale-btn-shine { transform: translateX(100%) skewX(12deg); }

        /* ─── Right panel ───────────────────────────── */
        .sale-right { min-height: 260px; }
        @media (min-width: 576px) { .sale-right { min-height: 340px; } }
        @media (min-width: 992px) { .sale-right { min-height: 0; } }

        .sale-img {
          object-fit: cover;
          filter: brightness(0.65) contrast(1.05);
        }
        .sale-img-fade {
          background: linear-gradient(to right, #1A1815 0%, transparent 60%);
          pointer-events: none;
        }
        @media (min-width: 992px) {
          .sale-img-fade {
            background: linear-gradient(to right, #1A1815 0%, rgba(26,24,21,0.30) 40%, transparent 100%);
          }
        }

        /* ─── Discount badge ────────────────────────── */
        .sale-badge {
          top: 50%;
          right: 1.25rem;
          transform: translateY(-50%);
          background: rgba(13,12,10,0.70);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(201,168,76,0.30);
          padding: 1.25rem 1.25rem;
        }
        @media (min-width: 576px) {
          .sale-badge {
            right: 2.5rem;
            padding: 1.75rem 2rem;
          }
        }
        .sale-badge-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 300;
          color: #C9A84C;
          line-height: 1;
        }
        @media (min-width: 576px) { .sale-badge-num { font-size: 3.75rem; } }
        .sale-badge-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #F5F0E8;
        }

        /* ─── Keyframes ─────────────────────────────── */
        @keyframes blink {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}