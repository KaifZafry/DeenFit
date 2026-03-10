import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_IMG_URL } from '../utils/Constants';

const ProductList = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await fetch(`/api/Account/getproductbycategory?id=${categoryId}`);
        const data = await res.json();
        setProducts(data?.data || []);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    if (categoryId) fetchProductsByCategory();
  }, [categoryId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products in Category {categoryId}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.product_id} className="border rounded p-2 shadow">
            <img
              src={BASE_IMG_URL + (product.product_image?.split(',')?.[0] || '')}
              alt={product.product_title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-medium text-sm mt-2">{product.product_title}</h3>
            <p className="text-xs text-gray-500">₹{product.selling_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
