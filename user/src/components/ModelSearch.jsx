import React from 'react'
import { CgClose } from 'react-icons/cg'

const ModelSearch = () => {
  return (
    <div className="modal fade popup-search" id="search">
        <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
                <div className="header">
                   <span
                                 className="icon-close icon-close-popup cursor-pointer"
                                 onClick={onClose}
                               ><CgClose /></span>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="looking-for-wrap">
                                <div className="heading">What are you looking for?</div>
                                <form className="form-search">
                                    <fieldset className="text">
                                        <input type="text" placeholder="Search" className="" name="text" tabindex="0"
                                            value="" aria-required="true" required=""/>
                                    </fieldset>
                                    <button type="submit">
                                        <i className="icon icon-search"></i>
                                    </button>
                                </form>
                                <div className="popular-searches justify-content-md-center">
                                    <div className="text fw-medium">Popular searches:</div>
                                    <ul>
                                        <li><a className="link" href="#">Featured</a></li>
                                        <li><a className="link" href="#">Trendy</a></li>
                                        <li><a className="link" href="#">New</a></li>
                                        <li><a className="link" href="#">Sale</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ModelSearch