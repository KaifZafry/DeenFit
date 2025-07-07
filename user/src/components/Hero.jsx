import React from 'react'
import capmodel from  '../assets/images/capmodel.png'
import cap2 from  '../assets/images/cap-2.png'
import banner from '../assets/images/banner.png'

import { GoArrowUpRight } from 'react-icons/go'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <>
    <div className="flat-spacing-34 line-top">
            <div className="container-full">
                <div className="grid-cls grid-cls-v6 wow fadeInUp" data-aos="fade-up" data-aos-duration="500">
                    <div className="item1 s-cls radius-20 style-absolute abs-top-center hover-img">
                        <div className="image img-style h-100">
                            <img src={capmodel}  alt="banner" className="lazyload"/>
                        </div>
                        <div className="content">
                            <div className="box-title">
                                <div className="text-white display-lg">
                                    New Arrivals
                                </div>
                            </div>
                            <div className="box-btn">
                                <Link to='/products' className="tf-btn btn-white hover-primary">
                                    View Collection
                                    <GoArrowUpRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="item2 s-cls radius-20 style-absolute abs-top-center hover-img">
                         <Link to='/products'  className="h-100">
                         <div className="image h-100 img-style">
                             <img src="/product-7.png"  alt="banner" className="lazyload"/>
                        </div>
                        <div className="content">
                            <div className="box-title">
                                <div className="text-white display-lg">
                               Sunnah Line
                                </div>
                            </div>
                            <div className="box-btn">
                                <a href="shop-default.html" className="d-flex align-items-center text-white text-md fw-medium gap-10 link">
                                    <span className="text-transform-none">
                                        Explore Now
                                    </span>
                                    <GoArrowUpRight style={{color:'white'}} />
                                </a>
                            </div>
                        </div>
                          </Link>
                        
                    </div>
                    <div className="item3 s-cls radius-20 style-absolute abs-top-center hover-img">
                        <Link to='/products' className="h-100"> 
                         <div className="image img-style">
                           <img src={cap2}  alt="banner" className="lazyload"/>
                        </div>
                        <div className="content">
                            <div className="box-title">
                                <div className="text-dark display-lg" >
                                   DeenFit Original
                                </div>
                            </div>
                            <div className="box-btn">
                                <a href="#" className="d-flex text-black align-items-center text-white text-md fw-medium gap-10 link">
                                    <span className="text-transform-none text-black">
                                        Explore Now
                                    </span>
                                   <GoArrowUpRight />
                                </a>
                            </div>
                        </div>
                        
                        </Link>
                       
                    </div>
                    <div className="item4 s-cls radius-20 style-absolute abs-top-center hover-img">
                        <Link to='/products' className="h-100">
                         <div className="image img-style">
                           <img src={banner}  alt="banner" className="lazyload"/>
                        </div>
                        <div className="content">
                            <div className="box-title">
                                <div className="text-white display-lg">
                                   DeenFit Youth
                                </div>
                            </div>
                            <div className="box-btn">
                                <a href="shop-default.html" className="d-flex align-items-center text-white text-md fw-medium gap-10 link">
                                    <span className="text-transform-none">
                                        Explore Now
                                    </span>
                                    <GoArrowUpRight className='text-white' />
                                </a>
                            </div>
                        </div>
                        </Link>
                       
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Hero