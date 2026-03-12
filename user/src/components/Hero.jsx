import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cap1Img from "../assets/img/cap1.png";
import cap2Img from "../assets/img/tshirt2.png";
import cap4Img from "../assets/img/tshirt4.png";
import Categories from "./categories";
import { setCategories } from "../redux/categorySlice";
import { apiFetch } from "../utils/api";

const slides = [
 
  {
    image: cap1Img,
    name: "Classic Taqiyah",
    tag: "Signature Headwear · Bestseller",
    price: "₹899",
    label: "Bestseller 2025",
  },
  {
    image: cap2Img,
    name: "ActiveDeen Sport",
    tag: "Sport Series · Premium Fit",
    price: "₹1,499",
    label: "Sport Collection",
  },
  {
    image: cap4Img,
    name: "Heritage Edition",
    tag: "Luxury Line · Limited Drop",
    price: "₹1,799",
    label: "Limited Edition",
  },
];

const StatItem = ({ number, label }) => (
  <div className="text-start">
    <span className="hero-stat-number d-block">{number}</span>
    <span className="hero-stat-label d-block mt-1">{label}</span>
  </div>
);

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.list);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const res = await apiFetch("/api/Account/getcategory");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) dispatch(setCategories(json?.data || []));
      } catch (error) {
        console.error("Error fetching categories:", error);
        if (!cancelled) dispatch(setCategories([]));
      } finally {
        if (!cancelled) setCategoriesLoading(false);
      }
    };

    fetchCategories();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  useEffect(() => {
    const id = setInterval(() => {
      triggerSlide((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [current]);

  const triggerSlide = (next) => {
    if (fading || next === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(next);
      setDisplayIdx(next);
      setFading(false);
    }, 1000);
  };

  const goTo = (i) => triggerSlide(i);

  const slide = slides[displayIdx];

  return (
    <>
    <section className="hero-section">

      {/* ══════════════════════════════════════
          MOBILE — Full Portrait Hero
          Hidden on lg and above
      ══════════════════════════════════════ */}
      <div className="d-lg-none d-flex flex-column">

        {/* Portrait image container */}
        <div className="hero-portrait-wrap position-relative overflow-hidden w-100">
          <img
            key={`mob-${displayIdx}`}
            src={slide.image}
            alt={slide.name}
            className="hero-slide-img position-absolute top-0 start-0 w-100 h-100"
            style={{
              clipPath: visible && displayIdx === 0 ? "inset(0 0% 0 0)" : "none",
              opacity: fading ? 0 : 1,
              transition: displayIdx === 0
                ? "clip-path 1.4s cubic-bezier(0.77,0,0.18,1), opacity 0.5s ease"
                : "opacity 0.5s ease",
              zIndex: 2,
            }}
          />

          {/* Gradients */}
          <div className="hero-grad-bottom position-absolute bottom-0 start-0 w-100 h-100" style={{ zIndex: 3, pointerEvents: "none" }} />
          <div className="hero-grad-side position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 3, pointerEvents: "none" }} />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A] via-[#0D0C0A]/25 to-transparent pointer-events-none z-[3]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0C0A]/30 via-transparent to-[#0D0C0A]/10 pointer-events-none z-[3]" />

          {/* Spinning 20% OFF badge */}
          <div
            className="hero-badge-spin position-absolute d-flex align-items-center justify-content-center rounded-circle shadow"
            style={{ top: "1.25rem", right: "1.25rem", zIndex: 5, animation: "heroSpin 18s linear infinite" }}
          >
            <div className="text-center" style={{ animation: "heroSpinRev 18s linear infinite" }}>
              <span className="hero-badge-num d-block">20%</span>
              <span className="hero-badge-label d-block">OFF</span>
            </div>
          </div>

          {/* Collection label — top left */}
          <div
            className={`position-absolute d-flex align-items-center gap-2 hero-collection-label${visible ? " hero-visible" : " hero-hidden"}`}
            style={{ top: "1.25rem", left: "1.25rem", zIndex: 5 }}
          >
            <div className="hero-line-short" />
            <span
              key={`mob-label-${displayIdx}`}
              className="hero-eyebrow"
              style={{ animation: "heroFadeUp 0.6s ease forwards" }}
            >
              {slide.label}
            </span>
          </div>

          {/* Dot indicators */}
          <div
            className="position-absolute d-flex gap-2"
            style={{ bottom: "0", right: "0%", transform: "translateX(-50%)", zIndex: 5 }}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`hero-dot rounded-pill border-0 p-0${i === current ? " hero-dot-active" : ""}`}
              />
            ))}
          </div>

          {/* Title + product info overlaid at bottom */}
          <div className="position-absolute bottom-0 start-0 end-0 px-4 pb-4 pt-5 hero-overlay-text" style={{ zIndex: 4 }}>
            <h1
              className={`hero-title${visible ? " hero-visible" : " hero-hidden"}`}
            >
              Crown<br />
              Your <em className="hero-title-accent">Deen</em>
              <br />in Style
            </h1>

            <div
              className={`hero-divider mt-4 mb-3${visible ? " hero-visible" : " hero-hidden"}`}
            />

            <div
              key={`mob-info-${displayIdx}`}
              className="d-flex align-items-end justify-content-between"
              style={{
                opacity: fading ? 0 : 1,
                transition: "opacity 0.5s ease",
                animation: !fading ? "heroFadeUp 0.5s ease forwards" : undefined,
              }}
            >
              <div>
                <p className="hero-tag mb-1">{slide.tag}</p>
                <p className="hero-name-small">{slide.name}</p>
              </div>
              <span className="hero-price">{slide.price}</span>
            </div>
          </div>
        </div>

        {/* Text content below portrait */}
        <div className="position-relative px-4 px-sm-5 pt-4 pb-5 overflow-hidden">
          <div className="hero-radial-glow position-absolute top-0 start-0 w-100 h-100" style={{ pointerEvents: "none" }} />

          <p className={`hero-desc mb-4${visible ? " hero-visible" : " hero-hidden"}`}>
            Premium Islamic headwear crafted<br />
            for the modern believer.<br />
            Where faith meets refined aesthetics.
          </p>

          <div className={`d-flex flex-column gap-2 mb-4${visible ? " hero-visible" : " hero-hidden"}`}>
            <button className="hero-btn-primary w-100 position-relative overflow-hidden border-0">
              <span className="position-relative" style={{ zIndex: 1 }}>Explore Collection</span>
              <span className="hero-btn-shine position-absolute top-0 start-0 w-100 h-100" />
            </button>
            <button className="hero-btn-secondary w-100">Our Story</button>
          </div>

          <div className={`d-flex justify-content-between hero-stats-row${visible ? " hero-visible" : " hero-hidden"}`}>
            {[["400+", "Customers"], ["4.9", "Avg. Rating"], ["12+", "Designs"]].map(([n, l]) => (
              <div key={l} className="text-center">
                <span className="hero-stat-number d-block">{n}</span>
                <span className="hero-stat-label d-block mt-1">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP — Side by side (lg+)
          Hidden on mobile
      ══════════════════════════════════════ */}
      <div className="d-none d-lg-grid hero-desktop-grid">

        {/* Left — Text */}
        <div className="hero-left position-relative d-flex flex-column justify-content-center px-5 py-5 overflow-hidden">
          <div className="hero-radial-glow position-absolute top-0 start-0 w-100 h-100" style={{ pointerEvents: "none" }} />

          {/* Eyebrow */}
          <div
            className={`d-flex align-items-center gap-3 mb-4${visible ? " hero-visible" : " hero-hidden"}`}
            style={{ transitionDelay: "0.15s" }}
          >
            <div className="hero-line-short" />
            <span
              key={`desk-label-${displayIdx}`}
              className="hero-eyebrow"
              style={{
                opacity: fading ? 0 : 1,
                transition: "opacity 0.4s ease",
                animation: !fading ? "heroFadeUp 0.5s ease forwards" : undefined,
              }}
            >
              {slide.label}
            </span>
          </div>

          <h1
            className={`hero-title hero-title-lg mb-3${visible ? " hero-visible" : " hero-hidden"}`}
            style={{ transitionDelay: "0.28s" }}
          >
            Crown<br />
            Your <em className="hero-title-accent">Deen</em>
            <br />in Style
          </h1>

          <p
            className={`hero-desc mb-5${visible ? " hero-visible" : " hero-hidden"}`}
            style={{ transitionDelay: "0.42s" }}
          >
            Premium Islamic headwear crafted<br />
            for the modern believer.<br />
            Where faith meets refined aesthetics.
          </p>

          <div
            className={`d-flex gap-3 mb-4${visible ? " hero-visible" : " hero-hidden"}`}
            style={{ transitionDelay: "0.56s" }}
          >
            <button className="hero-btn-primary position-relative overflow-hidden border-0">
              <span className="position-relative" style={{ zIndex: 1 }}>Explore Collection</span>
              <span className="hero-btn-shine position-absolute top-0 start-0 w-100 h-100" />
            </button>
            <button className="hero-btn-secondary">Our Story</button>
          </div>

          {/* Desktop slide indicators */}
          <div className="d-flex gap-2 mb-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`hero-dot rounded-pill border-0 p-0${i === current ? " hero-dot-active" : ""}`}
              />
            ))}
          </div>

          <div
            className={`d-flex gap-5 mt-auto pt-4 hero-stats-row hero-stats-border${visible ? " hero-visible" : " hero-hidden"}`}
            style={{ transitionDelay: "0.7s" }}
          >
            <StatItem number="400+" label="Happy Customers" />
            <StatItem number="4.9" label="Avg. Rating" />
            <StatItem number="12+" label="Designs" />
          </div>
        </div>

        {/* Right — Image with crossfade */}
        <div className="hero-right position-relative overflow-hidden">
          <img
            key={`desk-${displayIdx}`}
            src={slide.image}
            alt={slide.name}
            className="hero-slide-img position-absolute top-0 start-0 w-100 h-100"
            style={{
              clipPath: visible && displayIdx === 0 ? "inset(0 0% 0 0)" : "none",
              opacity: fading ? 0 : 1,
              transition: displayIdx === 0
                ? "clip-path 1.4s cubic-bezier(0.77,0,0.18,1), opacity 0.5s ease"
                : "opacity 0.5s ease",
              zIndex: 2,
            }}
          />

          <div className="hero-grad-desk position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 3, pointerEvents: "none" }} />

          {/* Spinning badge */}
          <div
            className="hero-badge-spin hero-badge-spin-lg position-absolute d-flex align-items-center justify-content-center rounded-circle"
            style={{ top: "2.5rem", right: "2.5rem", zIndex: 4, animation: "heroSpin 18s linear infinite" }}
          >
            <div className="text-center" style={{ animation: "heroSpinRev 18s linear infinite" }}>
              <span className="hero-badge-num hero-badge-num-lg d-block">20%</span>
              <span className="hero-badge-label d-block">OFF</span>
            </div>
          </div>

          {/* Product info strip */}
          <div className="hero-info-strip position-absolute bottom-0 start-0 end-0 d-flex justify-content-between align-items-center px-4 py-3" style={{ zIndex: 4 }}>
            <div
              key={`desk-info-${displayIdx}`}
              style={{
                opacity: fading ? 0 : 1,
                transition: "opacity 0.4s ease",
                animation: !fading ? "heroFadeUp 0.5s ease forwards" : undefined,
              }}
            >
              <h3 className="hero-product-name mb-1">{slide.name}</h3>
              <p className="hero-tag mb-0">{slide.tag}</p>
            </div>
            <span
              key={`desk-price-${displayIdx}`}
              className="hero-price"
              style={{
                opacity: fading ? 0 : 1,
                transition: "opacity 0.4s ease",
              }}
            >
              {slide.price}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        /* ─── CSS Variables ─────────────────────────── */
        :root {
          --hero-bg:        #0D0C0A;
          --hero-gold:      #C9A84C;
          --hero-gold-lt:   #E8C97A;
          --hero-cream:     #F5F0E8;
          --hero-muted:     #8A7D6B;
          --hero-warm:      #D4C5A9;
          --font-display:   'Montserrat', sans-serif;
          --font-body:      'Montserrat', sans-serif;
        }

        /* ─── Section ───────────────────────────────── */
        .hero-section {
          background: var(--hero-bg);
        }

        /* ─── Desktop grid ──────────────────────────── */
        .hero-desktop-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 92vh;
        }
        .hero-left  { background: var(--hero-bg); }
        .hero-right { background: var(--hero-bg); }

        /* ─── Portrait (mobile) ─────────────────────── */
        .hero-portrait-wrap {
          aspect-ratio: 1/2;
          min-height: 75vw;
        }

        /* ─── Slide image ───────────────────────────── */
        .hero-slide-img {
          object-fit: cover;
          object-position: center;
          filter: brightness(0.9) contrast(1.05);
        }

        /* ─── Gradients ─────────────────────────────── */
        .hero-grad-bottom {
          background: linear-gradient(to top, #0D0C0A 0%, rgba(13,12,10,0.25) 50%, transparent 100%);
        }
        .hero-grad-side {
          background: linear-gradient(to right, rgba(13,12,10,0.30) 0%, transparent 60%, rgba(13,12,10,0.10) 100%);
        }
        .hero-grad-desk {
          background: linear-gradient(135deg, rgba(13,12,10,0.20) 0%, transparent 60%);
        }
        .hero-radial-glow {
          background: radial-gradient(ellipse at 30% 60%, rgba(201,168,76,0.08) 0%, transparent 70%);
        }

        /* ─── Spinning badge ────────────────────────── */
        .hero-badge-spin {
          width: 78px;
          height: 78px;
          background: var(--hero-gold);
          box-shadow: 0 8px 24px rgba(201,168,76,0.4);
        }
        .hero-badge-spin-lg {
          width: 110px;
          height: 110px;
          box-shadow: 0 8px 32px rgba(201,168,76,0.35);
        }
        .hero-badge-num {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          color: #0D0C0A;
          line-height: 1;
        }
        .hero-badge-num-lg { font-size: 30px; }
        .hero-badge-label {
          font-family: var(--font-body);
          font-size: 6px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 700;
          color: #1A1815;
        }

        /* ─── Eyebrow / collection label ────────────── */
        .hero-collection-label { transition: opacity 0.7s ease, transform 0.7s ease; }
        .hero-eyebrow {
          font-family: var(--font-body);
          font-size: 8px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--hero-gold);
          font-weight: 500;
        }
        .hero-line-short {
          width: 20px;
          height: 1px;
          background: var(--hero-gold);
          flex-shrink: 0;
        }

        /* ─── Title ─────────────────────────────────── */
        .hero-title {
          font-family: 'Cormorant Garamond', serif !important;
          font-weight: 300 !important;
          line-height: 0.9;
          color: var(--hero-cream);
          font-size: clamp(52px, 14vw, 72px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .hero-title-lg { font-size: clamp(72px, 6vw, 92px); }
        .hero-title-accent {
          font-style: italic;
          color: var(--hero-gold);
        }

        /* ─── Divider ───────────────────────────────── */
        .hero-divider {
          width: 48px;
          height: 1px;
          background: var(--hero-gold);
          transform-origin: left;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        /* ─── Description ───────────────────────────── */
        .hero-desc {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.14em;
          color: var(--hero-muted);
          text-transform: uppercase;
          line-height: 2;
          font-weight: 300;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        @media (min-width: 576px) { .hero-desc { font-size: 11px; } }

        /* ─── Product tag / name ────────────────────── */
        .hero-tag {
          font-family: var(--font-body);
          font-size: 8px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--hero-gold);
        }
        .hero-name-small {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.08em;
          color: rgba(212,197,169,0.6);
          font-weight: 300;
        }
        .hero-product-name {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 300;
          color: var(--hero-cream);
          line-height: 1;
        }

        /* ─── Price ─────────────────────────────────── */
        .hero-price {
          font-family: var(--font-display);
          font-size: 1.75rem;
          color: var(--hero-gold-lt);
          font-weight: 300;
          line-height: 1;
        }

        /* ─── Buttons ───────────────────────────────── */
        .hero-btn-primary {
          background: var(--hero-gold);
          color: #0D0C0A;
          padding: 1rem 2rem;
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 500;
          cursor: pointer;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .hero-btn-primary:hover {
          box-shadow: 0 12px 36px rgba(201,168,76,0.3);
          transform: translateY(-2px);
        }
        .hero-btn-shine {
          background: rgba(255,255,255,0.15);
          transform: translateX(-100%) skewX(12deg);
          transition: transform 0.5s ease;
        }
        .hero-btn-primary:hover .hero-btn-shine { transform: translateX(100%) skewX(12deg); }

        .hero-btn-secondary {
          border: 1px solid rgba(201,168,76,0.4);
          color: var(--hero-cream);
          background: transparent;
          padding: 1rem 2rem;
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 300;
          cursor: pointer;
          transition: border-color 0.3s ease, color 0.3s ease;
        }
        .hero-btn-secondary:hover {
          border-color: var(--hero-gold);
          color: var(--hero-gold);
        }

        /* ─── Dots ──────────────────────────────────── */
        .hero-dot {
          width: 6px;
          height: 6px;
          background: rgba(201,168,76,0.35);
          cursor: pointer;
          transition: width 0.5s ease, background 0.5s ease;
        }
        .hero-dot-active {
          width: 24px;
          background: var(--hero-gold);
        }

        /* ─── Stats ─────────────────────────────────── */
        .hero-stat-number {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 3vw, 1.75rem);
          font-weight: 300;
          color: var(--hero-gold-lt);
          line-height: 1;
        }
        .hero-stat-label {
          font-family: var(--font-body);
          font-size: 7px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--hero-muted);
        }
        .hero-stats-row {
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .hero-stats-border {
          border-top: 1px solid rgba(201,168,76,0.1);
        }

        /* ─── Info strip (desktop) ──────────────────── */
        .hero-info-strip {
          background: rgba(13,12,10,0.80);
          backdrop-filter: blur(12px);
        }

        /* ─── Overlay text container ────────────────── */
        .hero-overlay-text {
          background: linear-gradient(to top, rgba(13,12,10,1) 0%, rgba(13,12,10,0.6) 60%, transparent 100%);
        }

        /* ─── Visibility animation helpers ─────────── */
        .hero-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .hero-hidden {
          opacity: 0 !important;
          transform: translateY(1.5rem) !important;
        }

        /* ─── Keyframes ─────────────────────────────── */
        @keyframes heroSpin    { from { transform: rotate(0deg); }    to { transform: rotate(360deg); } }
        @keyframes heroSpinRev { from { transform: rotate(0deg); }    to { transform: rotate(-360deg); } }
        @keyframes heroFadeUp  {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
    <Categories categories={categories} loading={categoriesLoading} />
    </>
  );
}
