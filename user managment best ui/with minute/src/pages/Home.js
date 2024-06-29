import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { debounce } from 'lodash';
import { Modal } from 'react-bootstrap'; // Assuming you 
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Home = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('name');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const usersPerPage = 4;
  
  useEffect(() => {
    fetchUsers(searchQuery, currentPage, sortOrder);
  }, [currentPage, searchQuery, sortOrder]);

  const delayedFetchUsers = debounce((query, page, sort) => {
    fetchUsers(query, page, sort);
  }, 300);

  const fetchUsers = (query = '', page = 1, sort = 'name') => {
    axios.get(`http://localhost:5000?q=${query}&page=${page}&limit=${usersPerPage}&sort=${sort}`)
      .then((res) => setAllUsers(res.data.data))
      .catch((err) => console.log('Error fetching data from server:', err));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    delayedFetchUsers(e.target.value, 1, sortOrder);
  };

  const handleNext = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const confirmDelete = (userId) => {
    setUserIdToDelete(userId);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/${userIdToDelete}`)
      .then(() => {
        console.log(`User with ID ${userIdToDelete} deleted successfully`);
        setShowDeleteModal(false);
        fetchUsers(searchQuery, currentPage, sortOrder); // Refresh users after deletion
      })
      .catch((err) => console.log('Error deleting user:', err));
  };

  return (
    <div className="bg-dark text-white min-vh-100 py-5">
      <div className="container">
        <h1 className="text-center mb-5">مدیریت سیستم کاربران</h1>
        <div className="d-flex justify-content-between mb-4">
          <input
            type="text"
            className="form-control me-2"
            placeholder="جستجو کاربران..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <Link to="/create" className="btn btn-outline-primary">افزودن</Link>
          <select onChange={handleSortChange} value={sortOrder} className="form-select bg-dark text-white ms-2">
            <option value="name">مرتب‌سازی بر اساس نام</option>
            <option value="email">مرتب‌سازی بر اساس ایمیل</option>
          </select>
        </div>

        <div className="row">
          {allUsers.map((user, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card bg-dark text-white h-100">
                <img
                  src={`/images/${user.image}`}
                  className="card-img-top"
                  alt={user.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">{user.email}</p>
                  <p className="card-text">
                    <span style={{marginRight:"10px"}}> Cteated At </span>{formatDistanceToNow(new Date(user.createdAt))} ago</p>
                    <p className="card-text">
                    <span style={{marginRight:"10px"}}> last updated At </span>{formatDistanceToNow(new Date(user.updatedAt))} ago</p>
                  <div className="mt-auto">
                    <Link to={`/read/${user._id}`} className="btn btn-outline-primary btn-sm w-100 mb-2">نمایش</Link>
                    <Link to={`/update/${user._id}`} className="btn btn-outline-info btn-sm w-100 mb-2">ویرایش</Link>
                    <button onClick={() => confirmDelete(user._id)} className="btn btn-outline-danger btn-sm w-100">حذف</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between">
          <button onClick={handlePrev} className="btn btn-outline-primary" disabled={currentPage === 1}>قبلی</button>
          <button onClick={handleNext} className="btn btn-outline-primary">بعدی</button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>تأیید حذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>لغو</button>
          <button className="btn btn-danger" onClick={handleDelete}>حذف</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
