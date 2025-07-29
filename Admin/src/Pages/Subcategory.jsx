import React, { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { BASE_IMG_URL } from "../../../user/src/utils/Constants";

const SubCategory = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editingSubcategory, setEditingSubcategory] = useState(null);

  const fetchSubcategories = async () => {
    const res = await fetch("/api/account/getsubcategory");
    const data = await res.json();
    setSubcategories(data?.data || []);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/account/getcategory");
    const data = await res.json();
    setCategories(data?.data || []);
  };

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        uploadImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (base64Data) => {
    try {
      const response = await fetch("/api/Account/uploadfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docBase64List: [base64Data] })
      });
      const data = await response.json();
      if (data?.urls?.length > 0) {
        setImage(data?.urls[0]);
        console.log(data.url?.[0])
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      cid: categoryId,
      title,
      image
    };

    const url = editingSubcategory
      ? `/api/account/updatesubcategory/${editingSubcategory.subcategory_id}`
      : "/api/account/addsubcategory";

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    setTitle("");
    setImage("");
    setCategoryId("");
    setEditingSubcategory(null);
    fetchSubcategories();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/account/deletesubcategory/${id}`, {
      method: "POST"
    });
    fetchSubcategories();
  };

  const handleEdit = (subcategory) => {
    setEditingSubcategory(subcategory);
    setTitle(subcategory?.title);
    setCategoryId(subcategory?.cid);
    setImage(subcategory?.image);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Subcategory Management</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category_title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
            required={!editingSubcategory}
          />
          {image && (
            <img
              src={image.startsWith("data") ? image : BASE_IMG_URL + image}
              alt="Preview"
              className="h-20 mt-2 rounded"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {editingSubcategory ? "Update" : "Add"} Subcategory
        </button>
      </form>

      <div className="bg-white shadow-md rounded overflow-hidden">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((sub) => (
              <tr key={sub.subcategory_id} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={sub.image.startsWith("data") ? sub.image : BASE_IMG_URL + sub.image}
                    alt={sub.title}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{sub.title}</td>
                <td className="px-4 py-2">
                  {
                    categories.find((c) => c.category_id === sub.cid)?.category_title || "-"
                  }
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(sub)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <FiEdit className="inline mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sub.subcategory_id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="inline mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubCategory;
