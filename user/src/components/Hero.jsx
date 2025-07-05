import React from 'react'
import footwearImg from '../assets/images/footwear-1.jpg'
import capmodel from  '../assets/images/capmodel.png'
import cap1 from  '../assets/images/cap-1.png'
import cap2 from  '../assets/images/cap-2.png'
import footwearImg2 from '../assets/images/footwear-2.jpg'
import footwearImg3 from '../assets/images/footwear-3.jpg'
import footwearImg4 from '../assets/images/footwear-4.jpg'
import { GoArrowUpRight } from 'react-icons/go'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <>
    <div class="flat-spacing-34 line-top">
            <div class="container-full">
                <div class="grid-cls grid-cls-v6 wow fadeInUp">
                    <div class="item1 s-cls radius-20 style-absolute abs-top-center hover-img">
                        <div class="image img-style h-100">
                            <img src={capmodel}  alt="banner" class="lazyload"/>
                        </div>
                        <div class="content">
                            <div class="box-title">
                                <div class="text-white display-lg">
                                    New Arrivals
                                </div>
                            </div>
                            <div class="box-btn">
                                <Link to='/products' class="tf-btn btn-white hover-primary">
                                    View Collection
                                    <GoArrowUpRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div class="item2 s-cls radius-20 style-absolute abs-top-center hover-img">
                        <div class="image img-style">
                             <img src={cap1}  alt="banner" class="lazyload"/>
                        </div>
                        <div class="content">
                            <div class="box-title">
                                <div class="text-white display-lg">
                                premium Cotton
                                </div>
                            </div>
                            <div class="box-btn">
                                <a href="shop-default.html" class="d-flex align-items-center text-white text-md fw-medium gap-10 link">
                                    <span class="text-transform-none">
                                        Explore Now
                                    </span>
                                    <GoArrowUpRight />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="item3 s-cls radius-20 style-absolute abs-top-center hover-img">
                        <div class="image img-style">
                           <img src={cap2}  alt="banner" class="lazyload"/>
                        </div>
                        <div class="content">
                            <div class="box-title">
                                <div class="text-white display-lg">
                                    Cotton
                                </div>
                            </div>
                            <div class="box-btn">
                                <a href="shop-default.html" class="d-flex align-items-center text-white text-md fw-medium gap-10 link">
                                    <span class="text-transform-none">
                                        Explore Now
                                    </span>
                                   <GoArrowUpRight />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="item4 s-cls radius-20 style-absolute abs-top-center hover-img">
                        <div class="image img-style">
                           <img src={footwearImg4}  alt="banner" class="lazyload"/>
                        </div>
                        <div class="content">
                            <div class="box-title">
                                <div class="text-white display-lg">
                                    Boots
                                </div>
                            </div>
                            <div class="box-btn">
                                <a href="shop-default.html" class="d-flex align-items-center text-white text-md fw-medium gap-10 link">
                                    <span class="text-transform-none">
                                        Explore Now
                                    </span>
                                    <GoArrowUpRight />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Hero