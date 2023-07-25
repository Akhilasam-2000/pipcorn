

import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  // const handleLogout = () => {
  //   setLoggedIn(false);
  //   navigate.push("/logout"); // Redirect to Logout component
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password !== '') {

      console.log(email, password);
      try {
        axios.post('http://localhost:3000/login', { email, password })
          .then(async res => {


            if (res.data.message === "exist") {

              alert("Login successful");
              await Cookies.set('userData',JSON.stringify(res.data.userData) , { expires: 1 }); // Expires in 1 day
              await Cookies.set('token',JSON.stringify(res.data.token) , { expires: 1 }); // Expires in 1 day
              await Cookies.set('isLogined',JSON.stringify(true) , { expires: 1 }); // Expires in 1 day
              // navigate.push("/")
              navigate("/");


            } else {
              alert("Invalid credentials");
            }
          });

      } catch (e) {
        console.log(e);
      }
    }

  }


  return (
    <>
      {loggedIn ? (
        <div>
          <h2>Welcome, {email}!</h2>
          <button >Logout</button>
        </div>
        // onClick={handleLogout}
      ) : (
        <div style={{marginTop:100}} className="loginpages">
          <form onSubmit={handleSubmit} style={{padding:20, margin:-40 }} className="inputform">
            <h1 className='headinglog'>Login</h1>
            <input type="text" style={{width:"90%"}} name="email" placeholder="Enter Email" className="loginpage" onChange={handleEmailChange} /><br />
            <input type="password" style={{width:"90%"}} name="password" placeholder="Enter Password" className="loginpage" onChange={handlePasswordChange} /><br />
            <button type="submit" style={{width:70}} className='loginbutton'>Login</button><br />
            <h5>don't have an account ? <Link to="/register" >Register</Link></h5>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
