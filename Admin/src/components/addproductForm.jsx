import React, { useEffect, useState } from 'react';

const AddProductForm = () => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    discount: '',
    selling_price: '',
    quantity: '',
    description: '',
    rating: '',
    cid: '',
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imageBase64List, setImageBase64List] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const IMAGE_BASE_URL = 'http://deenfit-001-site1.qtempurl.com/ServiceProduct/';

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
  }, []);

  // 🔁 Convert multiple files to base64
  const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  setImageFiles(files);

  const readers = files.map(file => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        const base64 = result.split(',')[1]; // ⬅️ remove prefix
        resolve(base64);
      };
      reader.readAsDataURL(file);
    });
  });

  Promise.all(readers).then(setImageBase64List);
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      // Step 1: Upload images
      const uploadRes = await fetch('/api/Account/uploadfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docBase64List: imageBase64List,
        }),
      });

      const uploadData = await uploadRes.json();
      console.log(uploadData)

      if (!uploadData.requestnumber) throw new Error('Upload failed');

      

      const imageString = uploadData.requestnumber;

      // Step 3: Post product
      const productData = {
        ...form,
        image: imageString,
        price: parseFloat(form.price),
        discount: parseFloat(form.discount),
        selling_price: parseFloat(form.selling_price),
        quantity: parseInt(form.quantity),
        rating: parseFloat(form.rating),
        cid: parseInt(form.cid),
      };

      const postRes = await fetch('/api/Account/addproduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const result = await postRes.json();

      if (result?.status?.toLowerCase() === 'succeed') {
        setMessage('✅ Product added successfully!');
        setForm({
          title: '',
          price: '',
          discount: '',
          selling_price: '',
          quantity: '',
          description: '',
          rating: '',
          cid: '',
        });
        setImageFiles([]);
        setImageBase64List([]);
      } else {
        setMessage('❌ Failed to add product');
      }
    } catch (err) {
      console.error(err);
      setMessage('⚠️ Error uploading product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">🧢 Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full p-2 border rounded" />

        <div className="flex flex-wrap gap-2 mt-2">
          {imageBase64List.map((img, idx) => (
            <img key={idx} src={img} alt={`preview-${idx}`} className="w-20 h-20 object-cover rounded" />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          {loading ? 'Uploading...' : 'Add Product'}
        </button>

        {message && <p className="text-center text-sm mt-3 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default AddProductForm;
