// UserProfile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './stylesuser.css'; // Import the CSS file

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('USER'));
    const userId= storedUser.id;
    if (userId) {
      axios.get(`http://localhost:8082/user/users/${userId}`)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  return (
    <div className="user-profile">
      {userData ? (
        <div>
          <h2>{userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Country Code: {userData.countryCode} </p>
          <p>Phone: {userData.phone}</p>
          <p>Account Type: {userData.accountType}</p>
        </div>
      ) : (
        <p className="user-profile-loading">Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
