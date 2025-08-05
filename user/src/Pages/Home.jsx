import React from "react";
import Hero from "../components/Hero";
import BrandMarquee from "../components/MarqueeText";
import CategorySection from "../components/CategorySection";
import Facilities from "../components/Facilities";
import BannerSection from "../components/BannerSection";
import Seo from "../components/Seo";
import ReviewShowcase from "../components/ReviewShowcase";
import Products from "../components/Products";
// import ScrollVelocity from "../components/ScrollText";

const Home = () => {
  return (
    <div>
        <Seo
        title="DeenFit | Islamic Streetwear & Caps"
        description="Welcome to DeenFit – where faith meets fashion. Shop Islamic calligraphy caps and more."
        image="https://deenfit.store/banner2.png"
        url="https://deenfit.store/"
      />
      <Hero />
       <Products categoryId={"2"}/>
       <Products categoryId={"1"}/>
       <BrandMarquee/>
        <CategorySection/>
        <BannerSection/>
        <ReviewShowcase/>
        <Facilities/>
    </div>
  );
};

export default Home;
