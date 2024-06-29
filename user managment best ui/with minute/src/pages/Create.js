
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import 'bootstrap/dist/css/bootstrap.min.css';

const Create = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl);

      // Clean up the URL object when the component unmounts or image changes.
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const handleBtn = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !image) {
      setErrors({
        name: !name ? 'Name is required' : '',
        email: !email ? 'Email is required' : '',
        image: !image ? 'Image is required' : ''
      });
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('email', email);

    try {
      await axios.post('http://localhost:5000/create', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      enqueueSnackbar('User Created successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: "#343a40", color: "white" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "500px", backgroundColor: "#495057", color: "white" }}>
        <h3 className="text-center mb-4">افزودن کاربر جدید</h3>
        <form onSubmit={handleBtn}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">نام</label>
            <input
              id="name"
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              onChange={(e) => setName(e.target.value)}
              placeholder='نام خود را وارد کنید'
              value={name}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">ایمیل</label>
            <input
              id="email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='ایمیل خود را وارد کنید'
              value={email}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">عکس</label>
            <input
              id="image"
              type="file"
              accept='image/*'
              className={`form-control ${errors.image ? 'is-invalid' : ''}`}
              onChange={(e) => setImage(e.target.files[0])}
            />
            {errors.image && <div className="invalid-feedback">{errors.image}</div>}
          </div>
          {imagePreview && <div className="text-center mb-3">
            <img src={imagePreview} alt="Preview" className="img-thumbnail" width={100} height={100} />
          </div>}
          <div className="d-grid">
            <button type="submit" className='btn btn-primary'>افزودن کاربر</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;

