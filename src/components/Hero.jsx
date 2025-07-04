import React from 'react'
import footwearImg from '../assets/images/footwear-1.jpg'
import footwearImg2 from '../assets/images/footwear-2.jpg'
import footwearImg3 from '../assets/images/footwear-3.jpg'
import footwearImg4 from '../assets/images/footwear-4.jpg'

const Hero = () => {
  return (
    <>
    <div class="flat-spacing-34 line-top">
            <div class="container-full">
                <div class="grid-cls grid-cls-v6 wow fadeInUp">
                    <div class="item1 s-cls radius-20 style-absolute abs-top-center hover-img">
                        <div class="image img-style h-100">
                            <img src={footwearImg}  alt="banner" class="lazyload"/>
                        </div>
                        <div class="content">
                            <div class="box-title">
                                <div class="text-white display-lg">
                                    New Arrivals
                                </div>
                            </div>
                            <div class="box-btn">
                                <a href="shop-default.html" class="tf-btn btn-white hover-primary">
                                    View Collection
                                    <i class="icon icon-arrow-top-left"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="item2 s-cls radius-20 style-absolute abs-top-center hover-img">
                        <div class="image img-style">
                             <img src={footwearImg2}  alt="banner" class="lazyload"/>
                        </div>
                        <div class="content">
                            <div class="box-title">
                                <div class="text-white display-lg">
                                    Sneakers
                                </div>
                            </div>
                            <div class="box-btn">
                                <a href="shop-default.html" class="d-flex align-items-center text-white text-md fw-medium gap-10 link">
                                    <span class="text-transform-none">
                                        Explore Now
                                    </span>
                                    <i class="icon-arrow-top-left fs-8"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="item3 s-cls radius-20 style-absolute abs-top-center hover-img">
                        <div class="image img-style">
                           <img src={footwearImg3}  alt="banner" class="lazyload"/>
                        </div>
                        <div class="content">
                            <div class="box-title">
                                <div class="text-white display-lg">
                                    Sandals
                                </div>
                            </div>
                            <div class="box-btn">
                                <a href="shop-default.html" class="d-flex align-items-center text-white text-md fw-medium gap-10 link">
                                    <span class="text-transform-none">
                                        Explore Now
                                    </span>
                                    <i class="icon-arrow-top-left fs-8"></i>
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
                                    <i class="icon-arrow-top-left fs-8"></i>
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