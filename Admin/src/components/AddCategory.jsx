import React, { useState, useEffect } from 'react';
import { BASE_IMG_URL } from '../../../user/src/utils/Constants';

const AddCategoryForm = ({ categoryData, onclose }) => {
    const categorytoEdit = categoryData;
    const isEditMode = !!categorytoEdit;

    const [formData, setFormData] = useState({
        title: '',
        image: null
    });

    const [existingImages, setExistingImages] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    // ✅ Prefill form in edit mode
    useEffect(() => {
        if (categorytoEdit) {
            setFormData(prev => ({
                ...prev,
                title: categorytoEdit.category_title || ''
            }));

            if (categorytoEdit.category_image) {
                setExistingImages(categorytoEdit.category_image);
                setImagePreview(categorytoEdit.category_image);
            }
        }
    }, [categorytoEdit]);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prev => ({
                ...prev,
                image: null
            }));
            setImagePreview(null);
        }
    };

    // Convert file to base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = error => reject(error);
        });
    };

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => {
            setMessage({ text: '', type: '' });
        }, 5000);
    };

    const uploadFile = async (base64Data) => {
        try {
            const response = await fetch('/api/Account/uploadfile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    docBase64List: [base64Data],
                }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`File upload error: ${error.message}`);
        }
    };


    const addCategory = async (imageUrl, title) => {
        const isEditMode = !!categorytoEdit;
        const endpoint = isEditMode
            ? '/api/Account/updatecategory'
            : '/api/Account/addcategory';

        const body = isEditMode
            ? {
                id: categorytoEdit.category_id, // required only in edit
                image: imageUrl,
                title: title
            }
            : {
                image: imageUrl,
                title: title
            };

            console.log("Payload sent to API:", body);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            console.log("API response:", data);
            return data;
        } catch (error) {
            throw new Error(`Add/Update category error: ${error.message}`);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            showMessage('Please enter a category title', 'error');
            return;
        }

        try {
            setLoading(true);

            let imageUrl = existingImages;

            if (formData.image) {
                const base64Data = await fileToBase64(formData.image);
                const uploadResponse = await uploadFile(base64Data);

                if (uploadResponse.status !== 'succeed') {
                    throw new Error(uploadResponse.message || 'File upload failed');
                }

                imageUrl = uploadResponse.requestnumber;
            }

            const result = await addCategory(imageUrl, formData.title);

            if (result.status === 'succeed') {
                showMessage(isEditMode ? 'Category updated successfully!' : 'Category added successfully!', 'success');

                // Optional: Refresh parent list (if you pass a prop like onSave)
                if (onclose) onclose();  // Close modal or reload
            } else {
                throw new Error(result.message || 'Something went wrong');
            }

            // Reset form
            setFormData({ title: '', image: null });
            setImagePreview(null);
            const fileInput = document.getElementById('categoryImage');
            if (fileInput) fileInput.value = '';

        } catch (error) {
            console.error('Error:', error);
            showMessage(`Error: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="overflow-y-scroll flex items-center justify-center p-5">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md backdrop-blur-sm bg-opacity-95">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        {isEditMode ? 'Edit Category' : 'Add Category'}
                    </h1>
                    <p className="text-gray-600">
                        {isEditMode ? 'Update the category details' : 'Create a new category with image and title'}
                    </p>
                </div>

                {!loading ? (
                    <div className="space-y-6">
                        {/* Category Title */}
                        <div>
                            <label htmlFor="categoryTitle" className="block text-sm font-semibold text-gray-700 mb-2">
                                Category Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="categoryTitle"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter category title"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all bg-gray-50 focus:bg-white"
                                required
                            />
                        </div>

                        {/* Category Image */}
                        <div>
                            <label htmlFor="categoryImage" className="block text-sm font-semibold text-gray-700 mb-2">
                                Category Image {isEditMode ? '(Optional)' : <span className="text-red-500">*</span>}
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="categoryImage"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="categoryImage"
                                    className={`block w-full p-4 border-2 border-dashed rounded-xl cursor-pointer text-center transition-all ${formData.image
                                            ? 'border-green-400 bg-green-50 text-green-700'
                                            : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                                        }`}
                                >
                                    {formData.image ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {formData.image.name}
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center text-gray-600">
                                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                />
                                            </svg>
                                            Choose Image File
                                        </span>
                                    )}
                                </label>
                            </div>

                            {imagePreview && (
                                <div className="mt-4 text-center">
                                    {/* <img
                                        src={BASE_IMG_URL + imagePreview}
                                        alt="Preview"
                                        className="max-w-24 max-h-24 mx-auto rounded-xl shadow-lg object-cover"
                                    /> */}
                                    <img className="max-w-24 max-h-24 mx-auto rounded-xl shadow-lg object-cover"
  src={imagePreview.startsWith('data') ? imagePreview : BASE_IMG_URL + imagePreview}
/>

                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isEditMode ? 'UPDATE CATEGORY' : 'ADD CATEGORY'}
                        </button>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
                        <p className="text-gray-600 font-medium">Processing your request...</p>
                    </div>
                )}

                {/* Message */}
                {message.text && (
                    <div
                        className={`mt-6 p-4 rounded-xl text-center font-medium ${message.type === 'success'
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}
                    >
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddCategoryForm;
