// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Update = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [image, setImage] = useState('');
//   const [imageFile, setImageFile] = useState(null);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     axios.get(`http://localhost:5000/${id}`)
//       .then((res) => {
//         setName(res.data.name);
//         setEmail(res.data.email);
//         setImage(`/images/${res.data.image}`); // Assuming the image URL is relative to the public/images folder
//       })
//       .catch((err) => console.log(err));
//   }, [id]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//     setImage(URL.createObjectURL(file)); // Preview the selected image
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Simple form validation
//     if (!name || !email) {
//       setErrors({
//         name: !name ? 'Name is required' : '',
//         email: !email ? 'Email is required' : ''
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     if (imageFile) {
//       formData.append('image', imageFile);
//     }

//     try {
//       await axios.put(`http://localhost:5000/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       navigate('/');
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   return (
//     <div style={{ backgroundColor: "#121212", color: "#ffffff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//       <div className="card bg-dark text-white" style={{ width: "600px", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(255,255,255,0.2)" }}>
//         <div className="text-center">
//           {image && <img src={image} alt="Current" className="card-img-top rounded-circle mb-4" style={{ width: "150px", height: "150px", objectFit: "cover" }} />}
//           <input type="file" onChange={handleImageChange} className="form-control mb-3" style={{ backgroundColor: "#495057", color: "#ffffff" }} />
//           {errors.name && <small className="text-danger">{errors.name}</small>}
//           <input className="form-control mb-3" style={{ backgroundColor: "#495057", color: "#ffffff" }} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
//           {errors.email && <small className="text-danger">{errors.email}</small>}
//           <input className="form-control mb-3" style={{ backgroundColor: "#495057", color: "#ffffff" }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//           <button className="btn btn-primary btn-block mt-3" onClick={handleSubmit}>Update</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Update;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'react-bootstrap'; // Assuming you have react-bootstrap installed
import 'bootstrap/dist/css/bootstrap.min.css';

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for confirmation modal

  useEffect(() => {
    axios.get(`http://localhost:5000/${id}`)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setImage(`/images/${res.data.image}`); // Assuming the image URL is relative to the public/images folder
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImage(URL.createObjectURL(file)); // Preview the selected image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!name || !email) {
      setErrors({
        name: !name ? 'Name is required' : '',
        email: !email ? 'Email is required' : ''
      });
      return;
    }

    // Show confirmation modal before updating
    setShowConfirmModal(true);
  };

  const handleUpdateConfirmed = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await axios.put(`http://localhost:5000/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(`User with ID ${id} updated successfully`);
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setShowConfirmModal(false); // Close the confirmation modal
    }
  };

  return (
    <div style={{ backgroundColor: "#121212", color: "#ffffff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="card bg-dark text-white" style={{ width: "600px", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(255,255,255,0.2)" }}>
        <div className="text-center">
          {image && <img src={image} alt="Current" className="card-img-top rounded-circle mb-4" style={{ width: "150px", height: "150px", objectFit: "cover" }} />}
          <input type="file" onChange={handleImageChange} className="form-control mb-3" style={{ backgroundColor: "#495057", color: "#ffffff" }} />
          {errors.name && <small className="text-danger">{errors.name}</small>}
          <input className="form-control mb-3" style={{ backgroundColor: "#495057", color: "#ffffff" }} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          {errors.email && <small className="text-danger">{errors.email}</small>}
          <input className="form-control mb-3" style={{ backgroundColor: "#495057", color: "#ffffff" }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <button className="btn btn-primary btn-block mt-3" onClick={handleSubmit}>Update</button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>تأیید آپدیت</Modal.Title>
        </Modal.Header>
        <Modal.Body>آیا مطمئن هستید که می‌خواهید این کاربر را آپدیت کنید؟</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>لغو</button>
          <button className="btn btn-primary" onClick={handleUpdateConfirmed}>تأیید</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Update;
