
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductScreen() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("popop",id)
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      <header>
        <a href="/">PIPCORN</a>
      </header>
      <main>
        <div className="product-details">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>
              <strong>Price: {product.price}</strong>
            </p>
           
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductScreen;
