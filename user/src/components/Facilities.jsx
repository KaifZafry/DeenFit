import React from 'react'
import { GoGift } from 'react-icons/go'
import { MdLocalShipping, MdOutlineSupportAgent } from 'react-icons/md'
import { ImLoop2 } from "react-icons/im";

const Facilities = () => {
    return (
        <div className='container-full my-5'>
            <div className="row">
                <div className="col-md-3" data-aos="fade-up" data-aos-duration="400">
                    <div className="tf-icon-box style-2">
                        <div className="box-icon">
                            <MdLocalShipping style={{fontSize:'25px'}} />
                        </div>
                        <div className="content">
                            <div className="title ">Free Delivery</div>
                            <p className="desc font-2">Enjoy Free Delivery on All Order</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3" data-aos="fade-up" data-aos-duration="500">
                    <div className="tf-icon-box style-2">
                        <div className="box-icon">
                            <GoGift  style={{fontSize:'25px'}}/>
                        </div>
                        <div className="content">
                            <div className="title ">GIFT PACKAGE</div>
                            <p className="desc font-2">Perfectly packaged for gifting</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3" data-aos="fade-up" data-aos-duration="600">
                    <div className="tf-icon-box style-2">
                        <div className="box-icon">
                           <ImLoop2 style={{fontSize:'25px'}} />

                        </div>
                        <div className="content">
                            <div className="title ">EASY RETURNS</div>
                            <p className="desc font-2">Within 7 days for a return</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3" data-aos="fade-up" data-aos-duration="700">
                    <div className="tf-icon-box style-2">
                        <div className="box-icon">
                           <MdOutlineSupportAgent style={{fontSize:'25px'}} />
                        </div>
                        <div className="content">
                            <div className="title ">GIFT PACKAGE</div>
                            <p className="desc font-2">Perfectly packaged for gifting</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Facilities