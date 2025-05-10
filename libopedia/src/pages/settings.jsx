import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../AuthContext';

const Settings = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Login',
        text: 'You need to log in to access settings.',
        confirmButtonText: 'Login',
      }).then(() => {
        navigate('/signlog');
      });
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Settings Updated!',
      text: 'Your settings have been updated.',
    });
  };

  return (
    <div className="settings-container">
      <header className="settings-header">
        <h1>Settings</h1>
      </header>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" defaultValue={user.name} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" defaultValue={user.email} required />
        </div>
        <button type="submit" className="button primary">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;