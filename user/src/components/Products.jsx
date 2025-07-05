import React from "react"
import { CiShoppingCart } from "react-icons/ci"
import { FaRegHeart } from "react-icons/fa"
import { Link } from "react-router-dom"

const productData = [
  {
    id: 1,
    name: "Nike Air Force 1 '07",
    price: 125,
    oldPrice: 145,
    image: "/product-1.png",
    hoverImage: "/product-2.png"
  },
  {
    id: 2,
    name: "Adidas Superstar",
    price: 99,
    oldPrice: 120,
    image: "/product-3.png",
    hoverImage: "/product-4.png"
  },
  {
    id: 3,
    name: "Jordan Retro 4",
    price: 185,
    oldPrice: 200,
    image: "/product-5.jpg",
    hoverImage: "/product-6.jpg"
  },
  {
    id: 4,
    name: "Puma Suede Classic",
    price: 79,
    oldPrice: 95,
    image: "/product-7.jpg",
    hoverImage: "/product-8.jpg"
  }
]

const Products = () => {
  return (
    <div className="container-full">
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
                <Link to={`/product/${item.id}`}  className="product-img d-block">
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
                </Link>

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

    
    </div>
  )
}

export default Products
