import React, { useState } from "react";
import axios from "axios";

const AdminProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    quantity: "",
    description: "",
    about: "",
    rating: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    for (let key in formData) data.append(key, formData[key]);

    try {
      await axios.post("https://your-api.com/products", data);
      setToast({ show: true, message: "Product added successfully!", type: "success" });
      setFormData({
        title: "",
        price: "",
        quantity: "",
        description: "",
        about: "",
        rating: "",
        image: null,
      });
      setPreview(null);
    } catch {
      setToast({ show: true, message: "Something went wrong!", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Product</h2>
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Image</label>
          <input type="file" name="image" onChange={handleChange} required />
          {preview && <img src={preview} alt="Preview" className="preview" />}
        </div>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} min={1} max={5} step={0.1} required />
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" rows="3" value={formData.description} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label>About</label>
          <textarea name="about" rows="2" value={formData.about} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminProductForm;
