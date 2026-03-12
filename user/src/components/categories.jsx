import SectionHeader from "./SectionHeader";
import { Link } from "react-router-dom";
import { resolveImageUrl } from "../utils/resolveImageUrl";

const TAGS = ["Bestseller", "New", "Featured", "Limited", "Trending"];

const ArrowIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CategoryCard = ({ category, index }) => {
  const categoryId = category?.category_id ?? category?.id;
  const title = category?.category_title ?? category?.title ?? "";
  const imagePath = category?.category_image ?? category?.image ?? "";
  const imageUrl = resolveImageUrl(imagePath);
  const tag = category?.tag ?? TAGS[index % TAGS.length];
  const span = Boolean(category?.span ?? index === 0);

  return (
    <Link
      to={categoryId ? `/products?category=${encodeURIComponent(String(categoryId))}` : "/products"}
      className={`cat-card position-relative overflow-hidden cursor-pointer${span ? " cat-card-span" : ""}`}
      aria-label={title ? `Shop ${title}` : "Shop products"}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="cat-img position-absolute top-0 start-0 w-100 h-100"
          loading="lazy"
        />
      ) : (
        <div className="cat-img-fallback position-absolute top-0 start-0 w-100 h-100" />
      )}

      {/* Gradient overlay */}
      <div className="cat-overlay position-absolute top-0 start-0 w-100 h-100" />

      {/* Content */}
      <div className="cat-content position-absolute bottom-0 start-0 end-0 d-flex flex-column justify-content-end p-4 p-sm-5">
        <span className="cat-tag d-block mb-2">{tag}</span>
        <h3 className="cat-title mb-0">{title}</h3>
        <div className="cat-cta d-inline-flex align-items-center gap-2 mt-3">
          Shop Now <ArrowIcon />
        </div>
      </div>

      <style>{`
        .cat-card {
          background: #1A1815;
          min-height: 300px;
          display: block;
          text-decoration: none;
        }
        .cat-card-span {
          min-height: 360px;
        }
        @media (min-width: 576px) {
          .cat-card       { min-height: 360px; }
          .cat-card-span  { min-height: 440px; }
        }
        .cat-img {
          object-fit: cover;
          filter: brightness(0.65) contrast(1.05);
          transition: transform 0.7s ease;
        }
        .cat-card:hover .cat-img { transform: scale(1.05); }
        .cat-img-fallback {
          background: linear-gradient(135deg, #1A1815 0%, #0D0C0A 100%);
        }
        .cat-overlay {
          background: linear-gradient(to top, rgba(13,12,10,0.85) 0%, transparent 60%);
        }
        .cat-tag {
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C9A84C;
          font-weight: 500;
        }
        @media (min-width: 576px) { .cat-tag { font-size: 9px; } }
        .cat-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.5rem;
          font-weight: 300;
          color: #fff !important;
          line-height: 1.15;
          white-space: pre-line;
        }
        @media (min-width: 576px) { .cat-title { font-size: 1.75rem; } }
        @media (min-width: 992px) { .cat-title { font-size: 2rem; } }
        .cat-cta {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C9A84C;
          font-weight: 500;
          gap: 0.5rem;
          transition: gap 0.3s ease;
          text-decoration: none;
        }
        .cat-card:hover .cat-cta { gap: 1rem; }
      `}</style>
    </Link>
  );
};

export default function Categories({ categories = [], loading = false }) {
  return (
    <section className="categories-section position-relative overflow-hidden">
      {/* Decorative circles */}
      <div className="cat-deco-circle cat-deco-tr position-absolute rounded-circle" />
      <div className="cat-deco-circle cat-deco-bl position-absolute rounded-circle" />

      <SectionHeader
        tag="Our Collections"
        title="Shop by"
        titleItalic="Category"
        description="Discover our curated range of premium Islamic headwear, designed for the discerning believer."
        dark
      />

      {/* Grid */}
      <div className="cat-grid">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`sk-${i}`}
              className={`cat-skeleton skeleton skeleton-dark${i === 0 ? " cat-card-span" : ""}`}
            />
          ))
        ) : categories.length === 0 ? (
          <div className="cat-empty text-center py-5 col-span-full">
            No categories found.
          </div>
        ) : (
          categories.map((cat, i) => (
            <CategoryCard key={cat?.category_id ?? cat?.id ?? i} category={cat} index={i} />
          ))
        )}
      </div>

      <style>{`
        .categories-section {
          background: #0D0C0A;
          padding: 4rem 1rem;
        }
        @media (min-width: 576px) {
          .categories-section { padding: 5rem 2rem; }
        }
        @media (min-width: 992px) {
          .categories-section { padding: 6rem 4rem; }
        }
        @media (min-width: 1200px) {
          .categories-section { padding: 6rem 5rem; }
        }

        /* Decorative circles */
        .cat-deco-circle {
          border: 1px solid rgba(201,168,76,0.06);
          pointer-events: none;
        }
        .cat-deco-tr {
          width: 24rem;
          height: 24rem;
          top: -6rem;
          right: -6rem;
        }
        .cat-deco-bl {
          width: 16rem;
          height: 16rem;
          bottom: -4rem;
          left: -4rem;
          border-color: rgba(201,168,76,0.05);
        }

        /* Grid */
        .cat-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2px;
        }
        @media (min-width: 576px) {
          .cat-grid { grid-template-columns: repeat(2, 1fr); }
          .cat-card-span { grid-row: span 2; }
        }
        @media (min-width: 992px) {
          .cat-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* Skeleton */
        .cat-skeleton {
          min-height: 200px;
        }
        @media (min-width: 576px) {
          .cat-skeleton       { min-height: 260px; }
          .cat-skeleton.cat-card-span { min-height: 440px; }
        }

        /* Empty state */
        .cat-empty {
          color: rgba(245,240,232,0.6);
          font-family: 'Montserrat', sans-serif;
          font-size: 0.875rem;
        }
      `}</style>
    </section>
  );
}
