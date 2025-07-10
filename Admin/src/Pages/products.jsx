import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import AddProductForm from "../components/addproductForm";
import { BASE_IMG_URL } from "../../../user/src/utils/Constants";
import { useNavigate } from "react-router-dom";
const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await fetch("api/Account/getallproducts");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data?.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  // Delete product
  const handleDelete = async (product_id) => {
    try {
      const response = await fetch(`api/Account/deleteproduct/${product_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(
        products.filter((product) => product.product_id !== product_id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Update product
  const handleUpdate = (product) => {
    setEditingProduct(product);
    setShowAddForm(true);
    const navigate = useNavigate();

    navigate("/addproduct", {
      state: { product: productToEdit },
    });
  };

  // Close form and refresh products
  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    // Refresh product list
    fetch("api/Account/getallproducts")
      .then((res) => res.json())
      .then((data) => setProducts(data?.data))
      .catch((err) => setError(err.message));
  };

  if (loading)
    return <div className="text-center py-8">Loading products...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
        >
          <FiPlus className="mr-2" /> Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => {
              const imageArray = product.product_image?.split(",") || [];
              const mainImage = BASE_IMG_URL + imageArray[0];
              return (
                <tr key={product.product_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={mainImage}
                      alt={product.product_title}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.product_title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.category_id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${product.selling_price}
                    </div>
                    {product.discount > 0 && (
                      <div className="text-xs text-gray-500 line-through">
                        ${product.price}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleUpdate(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <FiEdit className="inline mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.product_id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="inline mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Product Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={handleFormClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <AddProductForm
                onClose={handleFormClose}
                productData={editingProduct}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
