// SellerProducts.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SellerProducts.css"; // Import your CSS file for styling

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const auth = localStorage.getItem("USER");
  const userData = JSON.parse(auth);

  // Fetch user-specific products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const ownerid = userData.id;

        // Replace the URL with your actual backend endpoint for fetching user products
        const response = await fetch(`http://localhost:8082/product/products/byOwner/${ownerid}`);
        const data = await response.json();

        // Update the state with the fetched products
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [userData.id]); // Trigger the effect whenever userData.id changes

  const handleSeeDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleGetMoney = (productId) => {
    // Implement the logic to get money for the sold product
    // You may want to make an API call or perform any other necessary actions
    console.log(`Getting money for product with ID ${productId}`);
  };

  return (
    <div className="seller-products">
      <h2>Your Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-row">
            <div className="product-info">
              <p>Product ID: {product.id}</p>
              {product.image && (
                <img src={`data:image/jpeg;base64,${product.image}`} alt={product.productName} />
              )}
              <p>Product Name: {product.productName}</p>
            </div>
            <div className="product-actions">
              {product.status === "sold" ? (
                <>
                <h3>Status: {product.status}</h3>
                <Link to={`/viewproduct/${product.id}`}>View Product</Link>
                <Link to="#">See Customer Details</Link>
                <Link to="#">Get Your Money</Link>
                  
                </>
              ) : (
                <>
                  <Link to={`/viewproduct/${product.id}`}>View Product</Link>
                  <p>Status: {product.status}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedProduct && (
        <div className="product-details-modal">
          <h2>Product Details</h2>
          <p>Product ID: {selectedProduct.id}</p>
          {/* Include other product details as needed */}
          <button onClick={() => setSelectedProduct(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
