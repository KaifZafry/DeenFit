import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiX, FiUpload, FiTrash2 } from 'react-icons/fi';

const AddProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productToEdit = location.state?.product;
  const isEditMode = !!productToEdit;
  console.log(productToEdit)

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
        title: productToEdit.title || '',
        price: productToEdit.price || '',
        discount: productToEdit.discount || '',
        selling_price: productToEdit.selling_price || '',
        quantity: productToEdit.quantity || '',
        description: productToEdit.description || '',
        rating: productToEdit.rating || '',
        cid: productToEdit.cid || ''
      });

      if (productToEdit.image) {
        const images = productToEdit.image.split(',');
        setExistingImages(images);
      }
    }
  }, [productToEdit]);

  // Handle multiple image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
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

  // Remove individual image
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

  // Clear all new images
  const clearAllNewImages = () => {
    setImageFiles([]);
    setImagePreviews([]);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      let finalImageString = existingImages.join(',');

      // Upload new images if any
      if (imagePreviews.length > 0) {
        const base64List = imagePreviews.map(img => img.split(',')[1]);
        const uploadRes = await fetch('/api/Account/uploadfile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ docBase64List: base64List }),
        });

        const uploadData = await uploadRes.json();
        if (!uploadData.requestnumber) throw new Error('Image upload failed');
        
        // Combine existing and new images
        finalImageString = existingImages.length > 0 
          ? `${existingImages.join(',')},${uploadData.requestnumber}`
          : uploadData.requestnumber;
      }

      // Prepare product data
      const productData = {
        ...form,
        image: finalImageString,
        price: parseFloat(form.price),
        discount: parseFloat(form.discount),
        selling_price: parseFloat(form.selling_price),
        quantity: parseInt(form.quantity),
        rating: parseFloat(form.rating),
        cid: parseInt(form.cid),
        ...(isEditMode && { id: productToEdit.id }),
      };

      // API endpoint
      const endpoint = isEditMode
        ? `/api/Account/updateproduct/${productToEdit.id}`
        : '/api/Account/addproduct';

      const method = isEditMode ? 'PUT' : 'POST';

      // Submit product
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const result = await res.json();

      if (result?.status?.toLowerCase() === 'succeed') {
        setMessage({
          text: `Product ${isEditMode ? 'updated' : 'added'} successfully!`,
          type: 'success'
        });
        
        if (!isEditMode) {
          // Reset form for new products
          resetForm();
        }
        
        // Redirect after 2 seconds
        setTimeout(() => navigate('/products'), 2000);
      } else {
        throw new Error(result?.message || 'Operation failed');
      }
    } catch (err) {
      setMessage({
        text: err.message || `Failed to ${isEditMode ? 'update' : 'add'} product`,
        type: 'error'
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
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
  };

  // Form field handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isEditMode ? '✏️ Edit Product' : '🧢 Add New Product'}
      </h2>

      {message.text && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
       <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="p-2 border rounded" />
          <input type="number" name="discount" value={form.discount} onChange={handleChange} placeholder="Discount" className="p-2 border rounded" />
          <input type="number" name="selling_price" value={form.selling_price} onChange={handleChange} placeholder="Selling Price" className="p-2 border rounded" />
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" className="p-2 border rounded" />
          <input type="number" step="0.1" name="rating" value={form.rating} onChange={handleChange} placeholder="Rating" className="p-2 border rounded" />
          <select name="cid" value={form.cid} onChange={handleChange} className="p-2 border rounded">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category_title}
              </option>
            ))}
          </select>
        </div>

        {/* Enhanced Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images (Multiple allowed)
          </label>
          
          {/* Upload Area */}
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
            {/* Existing Images (for edit mode) */}
            {existingImages.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Current Product Images
                </h4>
                <div className="flex flex-wrap gap-3">
                  {existingImages.map((img, index) => (
                    <div key={`existing-${index}`} className="relative group">
                      <img
                        src={`data:image/jpeg;base64,${img}`}
                        alt={`Product ${index}`}
                        className="w-24 h-24 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index, true)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Newly Added Images */}
            {imagePreviews.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    Newly Added Images ({imagePreviews.length})
                  </h4>
                  <button
                    type="button"
                    onClick={clearAllNewImages}
                    className="text-sm text-red-600 hover:text-red-800 flex items-center"
                  >
                    <FiTrash2 className="mr-1" /> Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
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
                        title="Remove image"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/products')}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : isEditMode ? (
              'Update Product'
            ) : (
              'Add Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;