import React, { useEffect, useState } from "react";
import AddCategoryForm from "../components/AddCategory";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { BASE_IMG_URL } from "../../../user/src/utils/Constants";

const Category = () => {
    const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const FetchCategory= async()=>{
    const response= await fetch('/api/account/getcategory')
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data= await response.json();
      console.log(data)
      setCategories(data?.data)
  }

  useEffect(()=>{
    FetchCategory()
  },[categories])

  const handleDelete = async (category_id) => {
    try {
      const response = await fetch(`api/Account/deletecategory/${category_id}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      setCategories(
        categories.filter((category) => category.category_id !== category_id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = (category) => {
  setEditingCategory(category);  // Prefill the form
  setShowAddForm(true);        // Show the modal
};

  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingCategory(null);
    // Refresh product list
    fetch("api/Account/getcategory")
      .then((res) => res.json())
      .then((data) => setCategories(data?.data))
      .catch((err) => setError(err.message));
  };


  return (
    <div className="container overflow-y-scroll h-auto mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">category Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
        >
          <FiPlus className="mr-2" /> Add category
        </button>
      </div>


       <div className="flex flex-col-reverse">
{/* categorys Table */}
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories?.map((category) => {
              const imageArray = category.category_image?.split(",") || [];
              const mainImage = BASE_IMG_URL + imageArray[0];
              return (
                <tr key={category.category_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={mainImage}
                      alt={category.category_title}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.category_title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {category.category_id}
                    </div>
                  </td>
                  
                 
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleUpdate(category)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <FiEdit className="inline mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.category_id)}
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

      {/* Add/Edit category Form Modal */}
      {showAddForm && (
        <div className="  h-auto bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <button
                  onClick={handleFormClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <AddCategoryForm
                onClose={handleFormClose}
                categoryData={editingCategory}
              />
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Category;
