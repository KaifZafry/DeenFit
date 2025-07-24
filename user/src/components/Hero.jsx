import React, { useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BASE_IMG_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from '../redux/categorySlice';
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
const Hero = () => {
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
        <div className="image mb-5 img-style h-full container-full bg-gray-100">
          <section className="min-h-[80vh] flex items-center justify-center  px-6 py-12">
      <div className="max-w-6xl h-[80vh] w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl mb-4 md:text-5xl font-bold text-gray-800">
            Stay Modest. Stay Stylish.
          </h1>
          <p className="text-lg text-gray-600">
            Discover premium Islamic caps crafted for modern style and comfort.
          </p>
          <button className="text-base flex items-center gap-2 px-6 py-3 rounded-2xl">
            Shop Now <FaArrowRightLong />
          </button>
        </motion.div>

        {/* Image or 3D Cap */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <img
            src="/product-3.png"
            alt="DeenFit Cap"
            className="w-1/2 max-w-sm rounded-2xl shadow-xl"
          />
        </motion.div>
      </div>
    </section>
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
                          alt={`kaif`}
                          width={100}
                        />
                      </Link>
                    </div>

                    <div className="card-product-info text-center">
                      <p
                        className="name-product font-bold mb-0 link fw-lg text-sm"
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
