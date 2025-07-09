import React, { useEffect } from 'react'
import { GoArrowUpRight } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Hero = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/Account/getcategory');
                const json = await res.json();
                console.log(json?.data)
                setCategories(json?.data);

            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);



    return (
        <>
            <div className="flat-spacing-34 line-top">
                <div className="container-full">

                    {loading ? (
                        <div className="grid-cls grid-cls-v6 wow fadeInUp" data-aos="zoom-in" data-aos-duration="500">
                            {Array(4).fill(0).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="h-[300px] bg-gray-200 rounded-2xl animate-pulse"
                                ></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid-cls grid-cls-v6 wow fadeInUp" data-aos="fade-up" data-aos-duration="500">
                            <div className="item1 s-cls radius-20 style-absolute abs-top-center hover-img">
                                <Link to='/products' className="h-100">
                                    <div className="image img-style h-100">
                                        <img src={categories[3]?.category_image} alt="banner" className="lazyload" />
                                    </div>
                                    <div className="content">
                                        <div className="box-title">
                                            <div className="text-white display-lg">
                                                {categories[3]?.category_title}
                                            </div>
                                        </div>
                                        <div className="box-btn">
                                            <p className="tf-btn btn-white hover-primary">
                                                View Collection
                                                <GoArrowUpRight />
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="item2 s-cls radius-20 style-absolute abs-top-center hover-img">
                                <Link to={`/products?category=${categories[2]?.category_id}`} className="h-100">
                                    <div className="image h-100 img-style">
                                        <img src={categories[2]?.category_image} alt="banner" className="lazyload" />
                                    </div>
                                    <div className="content">
                                        <div className="box-title">
                                            <div className="text-white display-lg">
                                                {categories[2]?.category_title}
                                            </div>
                                        </div>
                                        <div className="box-btn">
                                            <p className="d-flex align-items-center text-white text-md fw-medium gap-10 link">
                                                <span className="text-transform-none">
                                                    Explore Now
                                                </span>
                                                <GoArrowUpRight style={{ color: 'white' }} />
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                            <div className="item3 s-cls radius-20 style-absolute abs-top-center hover-img">
                                <Link to={`/products?category=${categories[3]?.category_id}`} className="h-100">
                                    <div className="image img-style">
                                        <img src={categories[1]?.category_image} alt="banner" className="lazyload" />
                                    </div>
                                    <div className="content">
                                        <div className="box-title">
                                            <div className="text-dark display-lg" >
                                                {categories[1]?.category_title}
                                            </div>
                                        </div>
                                        <div className="box-btn">
                                            <p className="d-flex align-items-center text-white text-md fw-medium gap-10 link">
                                                <span className="text-transform-none text-black">
                                                    Explore Now
                                                </span>
                                                <GoArrowUpRight />
                                            </p>
                                        </div>
                                    </div>

                                </Link>

                            </div>
                            <div className="item4 s-cls radius-20 style-absolute abs-top-center hover-img">
                                <Link to={`/products?category=${categories[4]?.category_id}`} className="h-100">
                                    <div className="image img-style">
                                        <img src={categories[0]?.category_image} alt="banner" className="lazyload" />
                                    </div>
                                    <div className="content">
                                        <div className="box-title">
                                            <div className="text-white display-lg">
                                                {categories[0]?.category_title}
                                            </div>
                                        </div>
                                        <div className="box-btn">
                                            <p className="d-flex align-items-center text-white text-md fw-medium gap-10 link">
                                                <span className="text-transform-none">
                                                    Explore Now
                                                </span>
                                                <GoArrowUpRight className='text-white' />
                                            </p>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        </div>
                    )}


                </div>
            </div>
        </>
    )
}

export default Hero