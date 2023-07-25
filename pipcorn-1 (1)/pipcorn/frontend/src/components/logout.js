
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Logout() {
  const navigate = useNavigate();
  const dataToSend = { logout: false };
  const handleLogout = () => {
    Cookies.remove('userDetails');
    Cookies.remove('profilePicture');
    Cookies.remove('token');
    Cookies.remove('userData');
    navigate('/', { state: dataToSend });
   
    
  };
  return (
    <div>
      <h2>Do you want to logout</h2>
      
        <button onClick={handleLogout}>Logout</button>
      
    </div>
  );
}

export default Logout;