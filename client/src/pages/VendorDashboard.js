import React, { useState } from 'react';
import api from '../api'; // ✅ centralized API instance
import '../Styles/VendorDashboard.css';

const VendorDashboard = ({ vendorEmail }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null, // image is a File object
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleAdd = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('price', product.price);
  formData.append('description', product.description);
  formData.append('category', product.category);
  formData.append('image', product.image);
  formData.append('vendorEmail', vendorEmail);

  try {
    const res = await api.post('/api/products/add-product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Product added successfully');
    console.log(res.data); // ✅ now defined
  } catch (err) {
    console.error('Error uploading product:', err);
    alert('Failed to add product');
  }
};


  return (
    <div className="vendor-dashboard">
      <h2>Welcome Vendor: {vendorEmail}</h2>
      <h3>Add New Product</h3>
      <form onSubmit={handleAdd} encType="multipart/form-data">
        <input name="name" placeholder="Product Name" onChange={handleChange} /><br />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} /><br />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea><br />
        <select name="category" onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="device">Health Device</option>
          <option value="medicine">Medicine</option>
          <option value="supplement">Supplement</option>
        </select><br />
        <input name="image" type="file" accept="image/*" onChange={handleChange} /><br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default VendorDashboard;
