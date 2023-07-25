
import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'; 

import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

function HomePage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [cookieValue, setCookieValue] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state;

  let checkLogin = () => {
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
      // setCookieValue(cookieValue);
    } else {
      console.log('Token not found or expired.');
    }
    
    const isLogined = Cookies.get('isLogined');
    if (isLogined) {
      console.log("isLogined found", isLogined);
      setCookieValue(isLogined);
    } else {
      console.log('Login Cookie not found or expired.');
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        // console.log( response);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    checkLogin();
    fetchData();
  }, []);

  useEffect(() => {

    if (stateData !== null) {
      Cookies.set('isLogined', JSON.stringify(false), { expires: 1 }); // Expires in 1 day
      checkLogin();
    }

  }, [stateData && stateData.logout === false]);

  const AccountHandler = () => {
    if(cookieValue === "true" ){
      navigate('/account');
    }else{
      navigate('/login');
    }
    
    
    
  };

  const logoutHandler = () => {
    
      navigate("/logout");
    
   
    
  };

  console.log("products", products);
  return (
    <div>
      <header >
        <Link style={{ margin: 5 }} to="/">PIPCORN</Link>

        <button onClick={AccountHandler} style={{ margin: 5 }}  >account</button>

        {cookieValue === "true" &&
        <Link style={{ margin: 5 }} to="/logout">logout</Link>}

        <div className='icon'>
          {/* <img src ="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" className='icon' alt=" " onClick={()=>navigate("/login")} /> */}
          <img src="https://cdn.iconscout.com/icon/free/png-256/free-account-avatar-profile-human-man-user-30448.png?f=webp" className="accounticon" alt=" " onClick={() => navigate("/login")} />
        </div>
        {/* <Link to="/login">Login</Link> */}
      </header>
      <main>
        <Routes>
          <Route path="/home" element={<HomePage products={products} addToCart={addToCart} />} // Pass the addToCart function as a prop
          />
        </Routes>

        <h1>Featured Products</h1>
        <div className="products">
          {products.map((product) => (
            <div className="product" key={product._id}>
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="prod-info">
                <Link to={`/product/${product._id}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>{product.price}</strong>
                </p>

                <button><Link to={`/product/${product._id}`}>Add to cart</Link></button>

              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;


