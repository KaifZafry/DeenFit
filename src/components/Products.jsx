import React from "react"
import { CiShoppingCart } from "react-icons/ci"
import { FaRegHeart } from "react-icons/fa"

const productData = [
  {
    id: 1,
    name: "Nike Air Force 1 '07",
    price: 125,
    oldPrice: 145,
    image: "../assets/images/product-1.jpg",
    hoverImage: "/assets/images/product-2.jpg"
  },
  {
    id: 2,
    name: "Adidas Superstar",
    price: 99,
    oldPrice: 120,
    image: "/assets/images/product-3.jpg",
    hoverImage: "/assets/images/product-4.jpg"
  },
  {
    id: 3,
    name: "Jordan Retro 4",
    price: 185,
    oldPrice: 200,
    image: "/assets/images/product-5.jpg",
    hoverImage: "../assets/images/product-6.jpg"
  },
  {
    id: 4,
    name: "Puma Suede Classic",
    price: 79,
    oldPrice: 95,
    image: "/assets/images/product-7.jpg",
    hoverImage: "../assets/images/product-8.jpg"
  }
]

const Products = () => {
  return (
    <div className="container">
      <div className="flat-title wow fadeInUp">
        <h4 className="title font-7">Today’s Picks</h4>
        <p className="desc text-main font-13 fs-16">
          Explore our most popular pieces that customers can't get enough of
        </p>
      </div>

      <div className="row">
        {productData.map((item) => (
          <div className="col-md-3 mb-4" key={item.id}>
            <div className="card-product">
              <div className="card-product-wrapper asp-ratio-1">
                <a href={`/product/${item.id}`} className="product-img d-block">
                  <img
                    className="img-product"
                    src={item.image}
                    alt={item.name}
                  />
                  <img
                    className="img-hover"
                    src={item.hoverImage}
                    alt={item.name}
                  />
                </a>

                <ul className="list-product-btn">
                  <li>
                    <a
                      href="#quickAdd"
                      data-bs-toggle="modal"
                      className="hover-tooltip tooltip-left box-icon"
                    >
                      <CiShoppingCart />
                      <span className="tooltip">Quick Add</span>
                    </a>
                  </li>
                  <li className="wishlist">
                    <a
                      href="#"
                      className="hover-tooltip tooltip-left box-icon"
                    >
                      <FaRegHeart />
                      <span className="tooltip">Add to Wishlist</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card-product-info text-center mt-2">
                <a
                  href={`/product/${item.id}`}
                  className="name-product link fw-medium text-md"
                >
                  {item.name}
                </a>
                <p className="price-wrap fw-medium mt-1">
                  <span className="price-new text-xl text-primary">
                    ${item.price.toFixed(2)}
                  </span>
                  {item.oldPrice && (
                    <span className="price-old ms-2">
                      ${item.oldPrice.toFixed(2)}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

       <div  className="">
            <div  className="infiniteslide tf-brand style-2" data-clone="2" data-style="left" data-speed="80">
                <div  className="brand-item">
                    <p  className="display-2xl fw-semibold text-grey-7">Free Shipping</p>
                </div>
                <div  className="brand-item">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42 18.9H26.04L37.38 7.56L34.44 4.62L23.1 15.96V0H18.9V15.96L7.56 4.62L4.62 7.56L15.96 18.9H0V23.1H15.96L4.62 34.44L7.56 37.38L18.9 26.04V42H23.1V26.04L34.44 37.38L37.38 34.44L26.04 23.1H42V18.9Z" fill="#7B53FF"/>
                    </svg>
                </div>
                <div  className="brand-item">
                    <p  className="display-2xl fw-semibold text-clip-2">Shop Now, Pay Later</p>
                </div>
                <div  className="brand-item">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42 18.9H26.04L37.38 7.56L34.44 4.62L23.1 15.96V0H18.9V15.96L7.56 4.62L4.62 7.56L15.96 18.9H0V23.1H15.96L4.62 34.44L7.56 37.38L18.9 26.04V42H23.1V26.04L34.44 37.38L37.38 34.44L26.04 23.1H42V18.9Z" fill="#7B53FF"/>
                    </svg>
                </div>
                <div  className="brand-item">
                    <p  className="display-2xl fw-semibold text-grey-7">Free Shipping</p>
                </div>
                <div  className="brand-item">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42 18.9H26.04L37.38 7.56L34.44 4.62L23.1 15.96V0H18.9V15.96L7.56 4.62L4.62 7.56L15.96 18.9H0V23.1H15.96L4.62 34.44L7.56 37.38L18.9 26.04V42H23.1V26.04L34.44 37.38L37.38 34.44L26.04 23.1H42V18.9Z" fill="#7B53FF"/>
                    </svg>
                </div>
                <div  className="brand-item">
                    <p  className="display-2xl fw-semibold text-clip-2">Shop Now, Pay Later</p>
                </div>
                <div  className="brand-item">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42 18.9H26.04L37.38 7.56L34.44 4.62L23.1 15.96V0H18.9V15.96L7.56 4.62L4.62 7.56L15.96 18.9H0V23.1H15.96L4.62 34.44L7.56 37.38L18.9 26.04V42H23.1V26.04L34.44 37.38L37.38 34.44L26.04 23.1H42V18.9Z" fill="#7B53FF"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Products
