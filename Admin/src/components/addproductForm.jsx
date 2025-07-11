import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiX, FiUpload, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const AddProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productToEdit = location.state?.product;
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
  const [activeTab, setActiveTab] = useState('basic');

  // Initialize form
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/Account/getcategory');
        const json = await res.json();
        setCategories(json?.data || []);
      } catch (err) {
        console.error('Category fetch error:', err);
        setMessage({ text: 'Failed to load categories', type: 'error' });
      }
    };

    fetchCategories();

    if (isEditMode && productToEdit) {
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
        const images = Array.isArray(productToEdit.image) 
          ? productToEdit.image 
          : productToEdit.image.split(',');
        setExistingImages(images.filter(img => img.trim() !== ''));
      }
    }
  }, [isEditMode, productToEdit]);

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

  const clearAllNewImages = () => {
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Basic validation
      if (!form.title || !form.cid) {
        throw new Error('Title and category are required');
      }

      let finalImageString = existingImages.join(',');

      // Upload new images if any
      if (imagePreviews.length > 0) {
        const base64List = imagePreviews.map(img => img.split(',')[1]);
        const uploadRes = await fetch('/api/Account/uploadfile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ docBase64List: base64List }),
        });

        if (!uploadRes.ok) throw new Error('Image upload failed');
        
        const uploadData = await uploadRes.json();
        if (!uploadData.requestnumber) throw new Error('Image upload failed');
        
        finalImageString = existingImages.length > 0 
          ? `${existingImages.join(',')},${uploadData.requestnumber}`
          : uploadData.requestnumber;
      }

      // Prepare product data with proper type conversion
      const productData = {
        title: form.title.trim(),
        description: form.description.trim(),
        price: parseFloat(form.price) || 0,
        discount: parseFloat(form.discount) || 0,
        selling_price: parseFloat(form.selling_price) || 0,
        quantity: parseInt(form.quantity) || 0,
        rating: parseFloat(form.rating) || 0,
        cid: parseInt(form.cid),
        image: finalImageString,
        ...(isEditMode && { id: productToEdit.id }),
      };

      // API endpoint
      const endpoint = isEditMode
        ? `/api/Account/updateproduct/${productToEdit.id}`
        : '/api/Account/addproduct';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const result = await res.json();

      if (result?.status?.toLowerCase() === 'succeed') {
        setMessage({
          text: `Product ${isEditMode ? 'updated' : 'added'} successfully!`,
          type: 'success'
        });
        
        setTimeout(() => navigate('/products'), 1500);
      } else {
        throw new Error(result?.message || 'Operation failed');
      }
    } catch (err) {
      setMessage({
        text: err.message || `Failed to ${isEditMode ? 'update' : 'add'} product`,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberInput = (field, operation = '') => {
    setForm(prev => {
      const currentValue = parseFloat(prev[field]) || 0;
      let newValue = currentValue;
      
      if (operation === 'increment') newValue = currentValue + 1;
      if (operation === 'decrement' && currentValue > 0) newValue = currentValue - 1;
      
      return { ...prev, [field]: operation ? newValue.toString() : prev[field] };
    });
  };

  return (
    <div className="w-full overflow-y-auto mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md ">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={() => navigate('/products')}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`px-6 py-3 rounded-b-lg ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border-t-2 border-green-200' 
              : 'bg-red-50 text-red-800 border-t-2 border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              type="button"
              onClick={() => setActiveTab('basic')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'basic'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Basic Information
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pricing')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'pricing'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pricing & Inventory
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'media'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Media
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="px-6 w-full py-5 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Premium Cotton T-Shirt"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your product in detail..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="cid" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="cid"
                  name="cid"
                  value={form.cid}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.category_title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (0-5)
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    value={form.rating}
                    onChange={handleChange}
                    className="block w-full pr-12 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="4.5"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
                    /5
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pricing & Inventory Tab */}
          {activeTab === 'pricing' && (
            <div className="px-6 py-5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Base Price ($)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={handleChange}
                      className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      min="0"
                      max="100"
                      value={form.discount}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-sm">
                      %
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="selling_price" className="block text-sm font-medium text-gray-700 mb-1">
                    Selling Price ($)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="selling_price"
                      name="selling_price"
                      min="0"
                      step="0.01"
                      value={form.selling_price}
                      onChange={handleChange}
                      className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity
                </label>
                <div className="flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => handleNumberInput('quantity', 'decrement')}
                    className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0"
                    value={form.quantity}
                    onChange={handleChange}
                    className="flex-1 block w-full px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleNumberInput('quantity', 'increment')}
                    className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="px-6 py-5 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600 justify-center">
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
                      PNG, JPG, JPEG up to 10MB each
                    </p>
                  </div>
                </div>
              </div>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Current Product Images
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {existingImages.map((img, index) => (
                      <div key={`existing-${index}`} className="relative group">
                        <img
                          src={`data:image/jpeg;base64,${img}`}
                          alt={`Product ${index}`}
                          className="w-full h-32 object-cover rounded-md border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, true)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-100"
                          title="Remove image"
                        >
                          <FiX className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images */}
              {imagePreviews.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      New Uploads ({imagePreviews.length})
                    </h4>
                    <button
                      type="button"
                      onClick={clearAllNewImages}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiTrash2 className="mr-1.5 h-3 w-3" /> Clear All
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={`new-${index}`} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="w-full h-32 object-cover rounded-md border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, false)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-100"
                          title="Remove image"
                        >
                          <FiX className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 flex justify-between">
            <div className="flex space-x-3">
              {activeTab !== 'basic' && (
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === 'pricing' ? 'basic' : 'pricing')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Previous
                </button>
              )}
            </div>
            
            <div className="flex space-x-3">
              {activeTab !== 'media' ? (
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === 'basic' ? 'pricing' : 'media')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : isEditMode ? (
                    'Update Product'
                  ) : (
                    'Add Product'
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;