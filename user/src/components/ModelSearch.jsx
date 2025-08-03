// components/SearchPopup.jsx

import { useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { BASE_IMG_URL } from "../utils/Constants";
import { Link } from "react-router-dom";

const ModelSearch = ({ onClose }) => {

const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
     const FetchAllProduct = async () => {
       const res = await fetch("/api/Account/getallproducts");
       const data = await res.json();
       setProducts(data?.data);
       console.log(data?.data);
     };
     FetchAllProduct();
   }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
    } else {
      const matches = products.filter(product =>
        product.product_title.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(matches);
    }
  }, [query, products]);


  useEffect(() => {
    // Close modal on Escape key
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto flex flex-col items-center  px-4">
      {/* Close Button */}
      <button
        className="absolute top-6 right-6 text-3xl text-black"
        onClick={onClose}
      >
        <IoClose />
      </button>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold my-4 text-center">
        What are you looking for?
      </h2>

      {/* Search Input */}
      <div className="flex items-center w-full max-w-2xl mb-5 rounded-full border border-gray-300 px-4  shadow-sm">
        <input
          type="text"
          placeholder="Search"
          className="w-full outline-none text-lg bg-transparent border-none focus:ring-0"
          style={{border:'none'}}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <IoSearch className="text-2xl text-gray-500" />
      </div>
      {filtered.length > 0 && (
        <div className="w-full max-w-2xl  mt-6 grid grid-cols-1  gap-4">
          {filtered.map(product => (
            <Link to={`/product/${product.product_id}`} onClick={onClose} key={product.product_id}>
             <div  className="border d-flex gap-2 items-center p-4 rounded shadow-sm">
              <img src={BASE_IMG_URL + product.product_image?.split(",")[0]} alt={product.product_title} className="w-12 h-12 object-cover rounded mb-2" />
              <h3 className="text-lg font-medium">{product.product_title}</h3>
              <p className="text-gray-600">₹{product.price}</p>
            </div>
            </Link>
           
          ))}
        </div>
      )}

      {query && filtered.length === 0 && (
        <p className="mt-6 text-gray-500">No results found.</p>
      )}

      {/* Popular Searches */}
      <div className="text-center">
        <p className="mb-3 text-sm text-gray-600">Popular searches:</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {["Featured", "Trendy", "New", "Sale"].map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-200 transition"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelSearch;
