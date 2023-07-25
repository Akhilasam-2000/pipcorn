
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const navigate = useNavigate();
  const dataToSend = { logout: false };
  const [base64Image, setBase64Image] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
  const [token, setToken] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [cookieValue, setCookieValue] = useState('');

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setBase64Image(base64String);
        
      console.log("base",base64String)
      };

      if (file) {
        reader.readAsDataURL(file);
      }
      handleUpload();
    } else {
     
      setBase64Image('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
    }
  }


  const handleUpload = (e) => {
    let cleanedpic = cookieValue.replace(/"/g, '');
    let URL = "http://localhost:3000/editprofile";
    fetch(URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: cleanedpic,
        profilepic: base64Image

      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("data", data)
        if (data.message === "Updated Successfully") {
          alert('Updated Successfully')
        }
        else if (data.error === "Invalid Credentials") {
          alert('Invalid Credentials')
        }
      }
      )
  }

  const handleLogout = () => {
    Cookies.remove('userDetails');
    Cookies.remove('profilePicture');
    Cookies.remove('token');
    Cookies.remove('userData');
    navigate('/', { state: dataToSend });
   
    
  };


  useEffect(() => {
    const profilePic = Cookies.get('profilePicture');
    if (profilePic) {
      
      let cleanedpic = profilePic.replace(/"/g, '');
      console.log("profilePic found", profilePic);
      setBase64Image(cleanedpic);
    } else {
      console.log('profilePic not found or expired.');
    }

    const token = Cookies.get('token');
    if (token) {
      console.log("Token found", token);
      setToken(token);
    } else {
      console.log('Token not found or expired.');
    }

    const cookieValue = Cookies.get('userData');
    if (cookieValue) {
      console.log("Cookie found", cookieValue);
      setCookieValue(cookieValue);
    } else {
      console.log('Cookie not found or expired.');
    }

    let URL = "http://localhost:3000/userdata";
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({ email: cookieValue })
    })
      .then(res => res.json()).then(async data => {
        console.log("data", data.user.profilepic)
        if (data.message == 'User Found') {
          await Cookies.set('userDetails', JSON.stringify(data.user.name), { expires: 1 });
          await Cookies.set('profilePicture', JSON.stringify(data.user.profilepic), { expires: 1 });
        }
        else {
          alert('Token Expired')
          navigate('/login', { state: dataToSend });
        }
      })
      .catch(err => {
      })


    const userData = Cookies.get('userDetails');
    if (userData) {

      let cleanedName = userData.replace(/"/g, '');
      console.log("cleanedToken", cleanedName);
      setUserDetails(cleanedName);
    } else {
      console.log('userData not found or expired.');
    }

    

  }, [])

  return (
    <div style={{ marginTop: 100 }} className="loginpages">
      <form style={{ padding: 20, margin: -20}} className="inputform">
        <h2 className='headinglog'>Add Profile Picture</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',
          alignSelf: 'center',
          flexDirection: "column"
        }}>
          <label htmlFor="profilePictureInput" style={{
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center',
            alignSelf: 'center',
            width: 140,
            height: 140,
            borderRadius: 75,
            overflow: 'hidden',
            elevation: 3,
            cursor: 'pointer', 
          }}>
            <img
              style={{
                width: "100%",
                height: "100%",
              }}
              src={base64Image}
              alt=''
            />

            <input maxsize="500000" type="file" id="profilePictureInput" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          </label>
          <text style={{ fontWeight: "500" }}>{userDetails}</text>
          <div>
            <br />
            <button onClick={handleLogout}>Logout</button><br />
          </div>
          <br />
        </div>
       
      </form>
    </div>

  );
};

export default AccountPage;
