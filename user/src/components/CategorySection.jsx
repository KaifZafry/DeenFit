import React from 'react'
import { GoArrowUpRight } from 'react-icons/go'

const CategorySection = () => {
    return (
        <div className='container my-5'>
            <div className="row">
                <div className="col-md-4" data-aos="fade-up" data-aos-duration="500">
                    <div className="wg-cls style-abs asp-1 hover-img">
                        <a href="shop-default.html" className="image img-style d-block">
                            <img src="/cls-1.jpg" alt="" className="lazyload" />
                        </a>
                        <div className="cls-btn text-center">
                            <a href="shop-default.html"
                                className="tf-btn btn-cls btn-white hover-dark hover-icon-2">
                                Spring Steps
                                 <span className='icon text-white'>
                                     <GoArrowUpRight style={{ color: "white", fontSize: "20px" }} />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4" data-aos="fade-up" data-aos-duration="600">
                    <div className="wg-cls style-abs asp-1 hover-img">
                        <a href="shop-default.html" className="image img-style d-block">
                            <img src="/cls-2.jpg" alt="" className="lazyload" />
                        </a>
                        <div className="cls-btn text-center">
                            <a href="shop-default.html"
                                className="tf-btn btn-cls btn-white hover-dark hover-icon-2">
                                Spring Steps
                                <span className='icon text-white'>
                                     <GoArrowUpRight style={{ color: "white", fontSize: "20px" }} />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4" data-aos="fade-up" data-aos-duration="700">
                    <div className="wg-cls style-abs asp-1 hover-img">
                        <a href="shop-default.html" className="image img-style d-block">
                            <img src="cls-3.jpg" alt="" className="lazyload" />
                        </a>
                        <div className="cls-btn text-center">
                            <a href="shop-default.html"
                                className="tf-btn btn-cls btn-white hover-dark hover-icon-2">
                                Spring Steps
                                <span className='icon text-white'>
                                     <GoArrowUpRight style={{ color: "white", fontSize: "20px" }} />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategorySection