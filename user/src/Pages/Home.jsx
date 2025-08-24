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
        title="CalliWear | Islamic Streetwear & Caps"
        description="Welcome to CalliWear – where faith meets fashion. Shop Islamic calligraphy caps and more."
        image="https://CalliWear.store/banner2.png"
        url="https://CalliWear.store/"
      />
      <Hero />
       <Products categoryId={"2"} title="Crown Your Deen"/>
       <Products categoryId={"1"} title="Faith in Every Thread"/>
       <BrandMarquee/>
        <CategorySection/>
        <BannerSection/>
        <ReviewShowcase/>
        <Facilities/>
    </div>
  );
};

export default Home;
