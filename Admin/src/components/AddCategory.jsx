import React, { useRef, useState } from 'react';
import axios from 'axios';

const AddCategoryForm = () => {
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [base64Image, setBase64Image] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const formRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64Image(reader.result); // 👈 will be used for /uploadfile
        };
        if (file) reader.readAsDataURL(file);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!title || !base64Image) {
            setMessage('Please enter title and upload an image.');
            setLoading(false);
            return;
        }

        try {
            // Step 1: Upload image and get back URL
            const base64WithoutPrefix = base64Image.split(',')[1];
            const uploadResponse = await axios.post(
                '/api/Account/uploadfile',
                { docBase64: base64WithoutPrefix }
            );

            const imageUrl = uploadResponse?.data?.requestnumber;
            console.log("Uploaded image URL:", imageUrl);
            console.log("Full Upload Response:", uploadResponse.data);
            console.log("Uploading file:", imageFile?.name, imageFile?.size);



            if (!imageUrl) {
                setMessage('❌ Failed to upload image.');
                setLoading(false);
                return;
            }

            // Step 2: Send to addcategory API
            const categoryResponse = await axios.post(
                '/api/Account/addcategory',
                {
                    title,
                    image: imageUrl,
                }
            );

            const resStatus = categoryResponse?.data?.status;

            if (resStatus?.toLowerCase() === 'succeed') {
                setMessage('✅ Category added successfully!');
                formRef.current?.reset();
                setTitle('');
                setImageFile(null);
                setBase64Image('');
            } else {
                setMessage(`❌ Failed to add category: ${categoryResponse?.data?.message || ''}`);
            }
        } catch (err) {
            console.error(err);
            setMessage('⚠️ Error while adding category.');
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mt-10">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Category</h2>

            <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
                <input
                    type="text"
                    className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
                    placeholder="Category Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="file"
                    accept="image/*"
                    className="w-full p-3 border rounded-lg"
                    onChange={handleImageChange}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
                >
                    {loading ? 'Uploading...' : 'Add Category'}
                </button>

                {message && <p className="text-center text-sm text-red-500">{message}</p>}
            </form>
        </div>

    );
};

export default AddCategoryForm;
