import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <>

 <section className="tf-page-title">
        <div className="container-full">
          <div
            className=" text-center"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            <h4 className="title mb-3"> About Us</h4>
            <div className="breadcrumb-list">
              <Link className="breadcrumb-item" to="/">
                Home
              </Link>
              <div className="breadcrumb-item dot">
                <span></span>
              </div>
              <Link className="breadcrumb-item" href="/about">
                About
              </Link>
              <div className="breadcrumb-item dot">
                <span></span>
              </div>
             
            </div>
         
          </div>
        </div>
      </section>

<section className="flat-spacing-3 pb-0">
            <div className="container-full">
                <div className="flat-title-2 d-xl-flex justify-content-xl-between">
                    <div className="box-title" data-aos="fade-up" data-aos-duration="500">
                        <p className="display-lg-2 fw-medium">
                            Welcome to Deenfit
                        </p>
                        <p className="text-xl">
                           Wear Your Sunnah with Pride
                        </p>
                    </div>
                    <div className="box-text" data-aos="fade-up" data-aos-duration="500">
                        <p className="text-md">
                          
                            At <span className="fw-medium">Deenfit</span>, we blend modest fashion with modern style—designed to reflect your faith with pride. <br className="d-none d-xl-block"/>
                            Our premium Islamic caps are crafted for those who carry their Deen wherever they go.<br className="d-none d-xl-block"/>
                           Stay rooted in your identity while embracing everyday elegance.

                           <b>Wear your Imaan. Wear DeenFit.</b>
                        </p>
                    </div>
                </div>
                {/* <div className="image radius-16 overflow-hidden banner-about">
                    <img src="images/section/about.jpg" data-src="images/section/about.jpg" alt="" className="w-100 h-100 object-fit-cover ls-is-cached lazyloaded"/>
                </div> */}
            </div>
            
        </section>

        <section className="flat-spacing-1">
            <div className="container-full">
                <div className="flat-title mb-4 text-center" data-aos="fade-up" data-aos-duration="500">
                    <p className="display-md-2 fw-medium">
                        Why Choose Deenfit
                    </p>
                    <p className="text-md text-main">
                        Our products are crafted with innovation and an eye for the latest trends. We push the
                        boundaries of <br className="d-none d-lg-block"/>
                        traditional fashion, delivering bold, fresh designs that inspire confidence and
                        individuality.
                    </p>
                </div>
                <div className="row">
                    <div className="col-xl-7 col-md-6">
                        <ul className="list-esd d-md-flex flex-md-column justify-content-md-center h-100">
                            <li className="item" data-aos="fade-up" data-aos-duration="500">
                                <h6>
                                    Ethics &amp; Responsibility
                                </h6>
                                <p className="text-md text-main">
                                    At Deenfit, we are dedicated to upholding the highest ethical standards in
                                    production.
                                    We ensure mindful manufacturing through regular audits, training, and a strong focus
                                    on responsible sourcing.
                                </p>
                            </li>
                            <li className="item" data-aos="fade-up" data-aos-duration="500">
                                <h6>
                                    Style Meets Durability
                                </h6>
                                <p className="text-md text-main">
                                    From classic tailoring to casual staples, our Deenfit collections embrace the latest
                                    trends while prioritizing comfort and long-lasting quality.
                                </p>
                            </li>
                            <li className="item" data-aos="fade-up" data-aos-duration="500">
                                <h6>
                                    Express Yourself
                                </h6>
                                <p className="text-md text-main">
                                    Our designs are crafted with the latest fashion trends in mind, offering flexibility
                                    for individual expression, especially for the modern, style-conscious youth.
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xl-5 col-md-6" data-aos="fade-up" data-aos-duration="600">
                        <div className="image radius-16 overflow-hidden w-100 h-100">
                            <img src="/product-2.png" alt="" className="w-100 h-100 object-fit-cover ls-is-cached lazyloaded"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default About