import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import BrandMarquee from "../components/MarqueeText";
import Facilities from "../components/Facilities";
import Seo from "../components/Seo";
import Products from "../components/Products";
import SaleBanner from "../components/SaleBanner";
// import ScrollVelocity from "../components/ScrollText";

const Home = () => {
  const categories = useSelector((state) => state.category.list);
  const featured = Array.isArray(categories) ? categories.slice(0, 2) : [];

  return (
    <div>
        <Seo
        title="CalliWear | Islamic Streetwear & Caps"
        description="Welcome to CalliWear – where faith meets fashion. Shop Islamic calligraphy caps and more."
        image="https://CalliWear.store/banner2.png"
        url="https://CalliWear.store/"
      />
      <Hero />
      {featured.length > 0 ? (
        featured.map((cat) => (
          <Products
            key={cat.category_id}
            categoryId={String(cat.category_id)}
            title={cat.category_title}
          />
        ))
      ) : (
        <div className="container-full py-4 text-center text-gray-500">
          Loading products...
        </div>
      )}

      {featured.length > 0 ? (
        <div className="container-full text-center my-4" data-aos="fade-up" data-aos-duration="500">
          <Link to="/products" className="tf-btn btn-line-dark fw-normal">
            All products
          </Link>
        </div>
      ) : null}
       <BrandMarquee/>
        <SaleBanner/>
        <Facilities/>
    </div>
  );
};

export default Home;
