
import React, { useState, useEffect } from 'react';
import SubmitForm from './components/register';
import Login from './components/login';
import Logout from './components/logout';
import HomePage from './components/home';
// import  Home from'./compontents/accountin';
// import  Account from'./compontents/account';
import AccountPage from './components/Accountpage';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Link, Switch, Routes } from 'react-router-dom';
import axios from 'axios';
import ProductScreen from './components/productscreen';
// const result = await axios.get('http://localhost:3000/api/Products' )
const Navbar = () => (
  <nav style={{
    background: '#333',
    padding: '10px',
  }}>
    <ul style={{
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'flex-start',
    }}>
      <li style={{
        margin: '0 10px',
      }}>
        <Link to="/" style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '16px',
        }}>Home</Link>
      </li>
      <li style={{
        margin: '0 10px',
      }}>
        <Link to="/login" style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '16px',
        }}>Login</Link>
      </li>
      <li style={{
        margin: '0 10px',
      }}>
        <Link to="/register" style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '16px',
        }}>Register</Link>
      </li>
    </ul>
  </nav>
);

const Homepage = () => <h1>Home Page</h1>;

const Loginpage = () => <h1>Login Page</h1>;
const Registerpage = () => <h1>Register Page</h1>;



const App = () => {
  const [cookieValue, setCookieValue] = useState(null)
  const [isLogined, setIsLogined] = useState(null)
  let loadCookies = () => {
    const cookieValue = Cookies.get('userData');
    if (cookieValue) {
      console.log("Cookie found", cookieValue);
      setCookieValue(cookieValue);
    } else {
      console.log('Cookie not found or expired.');
    }

    const token = Cookies.get('token');
    if (token) {
      console.log("Token found", token);
     
    } else {
      console.log('Token not found or expired.');
    }
    const isLogined = Cookies.get('isLogined');
    if (isLogined) {
      console.log("isLogined found", isLogined);
      setIsLogined(isLogined);
    } else {
      console.log('Login Cookie not found or expired.');
    }
  }
  useEffect(() => {
    loadCookies();
  }, []);
  return (

    <Router>
      <div>
       <Navbar />
        <Routes>
          {/* <Switch> */}
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/login" element={AccountPage}/> */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<SubmitForm />} />
//             <Route path="/product/:id" element={<ProductScreen />} />
//             <Route path="/account" element={<AccountPage />} />
          <Route path="/logout" element={<Logout />} />
          {/* <Route path="/account" component={Account} /> */}
        </Routes>
        {/* </Switch> */}
      </div>
    </Router>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));


export default App;