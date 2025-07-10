import React from 'react'

const BannerSection = () => {
  return (
    <section class="flat-spacing-3 pt-0">
            <div class="container-full">
                <div class="banner-lookbook">
                    <img class="img-banner" src="/footwear.jpg" alt=""/>
                    <div class="lookbook-item position1">
                        <div class="dropdown dropup-center dropdown-custom dropend">
                            <div role="dialog" class="tf-pin-btn" data-bs-toggle="dropdown" aria-expanded="false">
                                <span></span>
                            </div>
                            <div class="dropdown-menu">
                                <div class="loobook-product style-row">
                                    <div class="img-style">
                                        <img src="/footwear.jpg" alt="img"/>
                                    </div>
                                    <div class="content">
                                        <div class="info">
                                            <a href="product-detail.html" class="text-md fw-medium text-line-clamp-1 link">Nike Air Force 1 '07</a>
                                            <p class="price-wrap text-md fw-medium">
                                                <span class="price-new">$999<span class="zero">.00</span></span>
                                                <span class="price-old">$2,999<span class="zero">.00</span></span>
                                            </p>
                                        </div>
                                        <a href="#quickView" data-bs-toggle="modal" class="btn-lookbook hover-tooltip">
                                            <i class="icon-view"></i>
                                            <span class="tooltip">Quick view</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="lookbook-item position2">
                        <div class="dropdown dropup-center dropdown-custom dropend">
                            <div role="dialog" class="tf-pin-btn" data-bs-toggle="dropdown" aria-expanded="false">
                                <span></span>
                            </div>
                            <div class="dropdown-menu">
                                <div class="loobook-product style-row">
                                    <div class="img-style">
                                        <img src="/footwear/product-2.jpg" alt="img"/>
                                    </div>
                                    <div class="content">
                                        <div class="info">
                                            <a href="product-detail.html" class="text-md fw-medium text-line-clamp-1 link">Nike P-6000</a>
                                            <p class="price-wrap text-md fw-medium">
                                                <span class="price-new">$899<span class="zero">.00</span></span>
                                                <span class="price-old">$1,999<span class="zero">.00</span></span>
                                            </p>
                                        </div>
                                        <a href="#quickView" data-bs-toggle="modal" class="btn-lookbook hover-tooltip">
                                            <i class="icon-view"></i>
                                            <span class="tooltip">Quick view</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default BannerSection