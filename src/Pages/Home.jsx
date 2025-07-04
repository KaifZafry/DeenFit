import React from "react";
import Hero from "../components/Hero";
import Products from "../components/Products";
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
    </div>
  );
};

export default Home;
