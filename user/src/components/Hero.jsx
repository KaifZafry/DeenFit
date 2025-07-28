import React, { useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BASE_IMG_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from '../redux/categorySlice';
import Slider from "react-slick";
import { motion } from "framer-motion";
const Hero = () => {

  const settings = {
    dots: false,
  infinite: true,
  autoplay: true,
  speed: 800,
  fade: true, // ✅ This enables fade transition
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  };

  const banners = [
     "/banner3.png",
    "/banner4.png",
    "/banner5.png",
    "/banner2.png",
   
  ];
  //const [categories, setCategories] = useState([]);
  const categories = useSelector((state) => state.category.list);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/Account/getcategory");
        const json = await res.json();
        console.log(json?.data);
        dispatch(setCategories(json?.data));
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="flat-spacing-34 line-top">
        <div className="image mb-5 img-style h-full bg-gray-100">
         <Slider {...settings}>
        {banners.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`banner-${index + 1}`}
              className="w-full h-[400px] md:h-[600px] object-cover"
            />
          </div>
        ))}
      </Slider>
        </div>
        <div className="container-full">
          <h2 className="text-center my-5 title font-7 uppercase">Featured Categories</h2>
         

          {loading ? (
            <div
              className="row wow justify-center fadeInUp"
              data-aos="zoom-in"
              data-aos-duration="500"
            >
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <div className="col-2" key={idx}>
                  <div
                  style={{borderRadius:'100%'}}
                    
                    className="h-[100px] w-[100px] bg-gray-200 m-auto  rounded-full animate-pulse"
                  ></div>
                  <div className="w-1/2 my-2 mx-auto rounded-2xl h-8 bg-gray-200 animate-pulse"> </div>
                  </div>
                  
                ))}
            </div>
          ) : (
            <div className="row overflow-x-scroll no-scrollbar flex-nowrap justify-center">
            {categories.map((category) => {
              console.log(category)
              return (
                <div
                key={category.category_id}
                  className="col-4 col-md-2"
                  data-aos="fade-up"
                  data-aos-duration="500"
                >
                  <div className="card-product flex items-center flex-col category">
                    <div className="card-product-wrapper hover-img rounded-full asp-ratio-1">
                      <Link to={`/products?category=${category?.category_id}`} className="image img-style h-100 d-block">
                        <img
                          className="img-product"
                          src={BASE_IMG_URL+category?.category_image}
                          alt={category?.category_title}
                          width={100}
                        />
                      </Link>
                    </div>

                    <div className="card-product-info text-center">
                      <p
                        className="name-product font-extrabold mb-0 link fw-lg text-md"
                      >
                       {category?.category_title}
                      </p>
                    
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Hero;
