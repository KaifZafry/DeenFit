import React from 'react'
import { GoGift } from 'react-icons/go'
import { MdLocalShipping, MdOutlineSupportAgent } from 'react-icons/md'
import { ImLoop2 } from "react-icons/im";

const Facilities = () => {
    return (
        <div className='container-full my-5'>
            <div className="row">
                <div className="col-md-3">
                    <div class="tf-icon-box style-2">
                        <div class="box-icon">
                            <MdLocalShipping style={{fontSize:'25px'}} />
                        </div>
                        <div class="content">
                            <div class="title ">Free Delivery</div>
                            <p class="desc font-2">Enjoy Free Delivery on All Order</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div class="tf-icon-box style-2">
                        <div class="box-icon">
                            <GoGift  style={{fontSize:'25px'}}/>
                        </div>
                        <div class="content">
                            <div class="title ">GIFT PACKAGE</div>
                            <p class="desc font-2">Perfectly packaged for gifting</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div class="tf-icon-box style-2">
                        <div class="box-icon">
                           <ImLoop2 style={{fontSize:'25px'}} />

                        </div>
                        <div class="content">
                            <div class="title ">EASY RETURNS</div>
                            <p class="desc font-2">Within 7 days for a return</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div class="tf-icon-box style-2">
                        <div class="box-icon">
                           <MdOutlineSupportAgent style={{fontSize:'25px'}} />
                        </div>
                        <div class="content">
                            <div class="title ">GIFT PACKAGE</div>
                            <p class="desc font-2">Perfectly packaged for gifting</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Facilities