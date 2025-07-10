import React from "react";
import Hero from "../components/Hero";
import Products from "../components/Products";
import BrandMarquee from "../components/MarqueeText";
import CategorySection from "../components/CategorySection";
import Facilities from "../components/Facilities";
import BannerSection from "../components/BannerSection";
// import ScrollVelocity from "../components/ScrollText";

const Home = () => {
  return (
    <div>
      <Hero />
      <Products />
      {/* <ScrollVelocity
        texts={["DeenFit", "Free Shiping"]}
       
        className="custom-scroll-text"
      /> */}
       <BrandMarquee/>
        <CategorySection/>
        <BannerSection/>
        <Facilities/>
    </div>
  );
};

export default Home;
