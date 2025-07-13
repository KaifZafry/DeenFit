import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiX, FiUpload, FiTrash2 } from 'react-icons/fi';
import { BASE_IMG_URL } from '../../../user/src/utils/Constants';

const AddProductForm = ({ productData, onClose }) => {
  const navigate = useNavigate();
  const productToEdit = productData;
  console.log(productToEdit)
  const isEditMode = !!productToEdit;

  // Form state
  const [form, setForm] = useState({
    title: '',
    price: '',
    discount: '',
    selling_price: '',
    quantity: '',
    description: '',
    rating: '',
    cid: ''
  });

  // Image states
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Initialize form
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/Account/getcategory');
        const json = await res.json();
        setCategories(json?.data || []);
      } catch (err) {
        console.error('Category fetch error:', err);
      }
    };

    fetchCategories();

    if (productToEdit) {
      setForm({
        title: productToEdit.product_title || '',
        price: productToEdit.price || '',
        discount: productToEdit.discount || '',
        selling_price: productToEdit.selling_price || '',
        quantity: productToEdit.quantity || '',
        description: productToEdit.description || '',
        rating: productToEdit.rating || '',
        cid: productToEdit.category_id || ''
      });

      if (productToEdit?.product_image) {
        const images = productToEdit?.product_image.split(',');
        setExistingImages(images);
      }
      
    }
  }, [productToEdit]);

  // Handle image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 10) {
      setMessage({ text: 'Maximum 10 images allowed', type: 'error' });
      return;
    }

    const newImageFiles = [...imageFiles, ...files];
    setImageFiles(newImageFiles);

    const newPreviews = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviews).then(results => {
      setImagePreviews(prev => [...prev, ...results]);
    });
  };

  // Remove image
  const removeImage = (index, isExisting) => {
    if (isExisting) {
      setExistingImages(existingImages.filter((_, i) => i !== index));
    } else {
      const updatedFiles = [...imageFiles];
      const updatedPreviews = [...imagePreviews];
      updatedFiles.splice(index, 1);
      updatedPreviews.splice(index, 1);
      setImageFiles(updatedFiles);
      setImagePreviews(updatedPreviews);
    }
  };


 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage({ text: '', type: '' });

  try {
    // Basic validation
    if (!form.title || !form.cid) {
      throw new Error('Product title and category are required');
    }

    let finalImageString = existingImages.join(',');

    // Upload new images if any were added
    if (imagePreviews.length > 0) {
      const base64List = imagePreviews.map(img => img.split(',')[1]);
      
      const uploadRes = await fetch('/api/Account/uploadfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docBase64List: base64List }),
      });

      if (!uploadRes.ok) {
        throw new Error('Failed to upload images');
      }

      const uploadData = await uploadRes.json();
      
      if (!uploadData.requestnumber) {
        throw new Error('Image upload failed - no filenames returned');
      }

      // Combine existing and new images
      finalImageString = existingImages.length > 0 
        ? `${existingImages.join(',')},${uploadData.requestnumber}`
        : uploadData.requestnumber;
    }

    // Prepare the product data with proper type conversions
    const productData = {
     
  title: form.title,
  description: form.description,
  price: parseFloat(form.price) || 0,
  discount: parseFloat(form.discount) || 0,
  selling_price: parseFloat(form.selling_price) || 0,
  quantity: parseInt(form.quantity) || 0,
  rating: parseFloat(form.rating) || 0,
  cid: parseInt(form.cid),
  image: finalImageString,
      ...(isEditMode && { id: productToEdit.product_id }), // Include ID if in edit mode
    };

    // Calculate selling price if not provided
    if (!productData.selling_price && productData.price && productData.discount) {
      productData.selling_price = productData.price * (1 - (productData.discount / 100));
    }

  

    const endpoint = isEditMode 
  ? '/api/Account/updateproduct' 
  : '/api/Account/addproduct';   

    const method = 'POST'; // Typically both add and update use POST

    // Submit to API
    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();

    if (result?.status?.toLowerCase() === 'succeed') {
      setMessage({
        text: `Product ${isEditMode ? 'updated' : 'added'} successfully!`,
        type: 'success'
      });
      setTimeout(() => onClose(), 1500);
      
      // Reset form if not in edit mode
      if (!isEditMode) {
        setForm({
          title: '',
          price: '',
          discount: '',
          selling_price: '',
          quantity: '',
          description: '',
          rating: '',
          cid: ''
        });
        setImageFiles([]);
        setImagePreviews([]);
        setExistingImages([]);
      }

      // Redirect after success
      setTimeout(() => navigate('/products'), 1500);
    } else {
      throw new Error(result?.message || 'Operation failed');
    }
  } catch (err) {
    console.error('Submission error:', err);
    setMessage({
      text: err.message || `Failed to ${isEditMode ? 'update' : 'add'} product`,
      type: 'error'
    });
  } finally {
    setLoading(false);
  }
};

console.log(`finalaimagestring- ${imagePreviews}`)
console.log(`existingimages- ${existingImages}`)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </h2>
        <button 
          onClick={() => navigate('/products')} 
          className="text-gray-500 hover:text-gray-700"
        >
          <FiX className="w-6 h-6" />
        </button>
      </div>

      {message.text && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="cid"
                value={form.cid}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
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
          </div>

          {/* Pricing & Inventory */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
                <input
                  type="number"
                  name="discount"
                  value={form.discount}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
                <input
                  type="number"
                  name="selling_price"
                  value={form.selling_price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <FiUpload className="w-10 h-10 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                  <span>Upload files</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, JPEG up to 5MB each
              </p>
            </div>
          </div>

          {/* Image Previews */}
          <div className="mt-4">
            {(existingImages.length > 0 || imagePreviews.length > 0) && (
              <div className="flex flex-wrap gap-3">
                {existingImages.map((img, index) => (
                  
                  <div key={`existing-${index}`} className="relative group">
                    
                    <img
                      src={`${BASE_IMG_URL}${img}`}
                      alt={`Product ${index}`}
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index, true)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {imagePreviews.map((preview, index) => (
                  <div key={`new-${index}`} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index, false)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
           onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
          >
            {loading ? 'Processing...' : isEditMode ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;