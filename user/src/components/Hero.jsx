import React, { useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BASE_IMG_URL } from "../utils/Constants";

const Hero = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/Account/getcategory");
        const json = await res.json();
        console.log(json?.data);
        setCategories(json?.data);
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
        <div className="image mb-5 img-style h-full">
          <img src="/banner2.png" alt="banner" className="lazyload" />
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
                  className="col-2"
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
