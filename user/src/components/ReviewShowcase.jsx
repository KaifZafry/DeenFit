import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const ratings = [
  { title: "FABRIC", rating: 5.0 },
  { title: "FIT", rating: 4.7 },
  { title: "DESIGN", rating: 5.0 },
  { title: "SHIPPING", rating: 4.7 },
];

const reviewImages = [
  "/cls-1.jpg",
  "/cls-2.jpg",
  "/cls-3.jpg",
  "/cls-2.jpg",
  "/cls-3.jpg",
  "/cls-1.jpg",
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} />
      ))}
      {halfStar && <FaStarHalfAlt />}
    </div>
  );
};

const ReviewShowcase = () => {
  return (
    <section className="bg-[#FFF9F5] py-12 review-padding">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left side */}
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold text-black leading-snug">
            <span className="text-yellow-500 font-bold">400+</span>{" "}
            PEOPLE LOVE  CalliWear
          </h2>

          <div className="mt-8 space-y-4">
            {ratings.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-1"
              >
                <span className="text-lg font-medium">{item.title}</span>
                <div className="flex items-center gap-2">
                  {renderStars(item.rating)}
                  <span className="ml-2 font-semibold">{item.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="grid grid-cols-3 gap-3">
          {reviewImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`review-${index}`}
              className="rounded-md   h-20 md:h-40 shadow"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewShowcase;
