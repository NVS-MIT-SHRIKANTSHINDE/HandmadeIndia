import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SellerHomePage.css"
import { useNavigate } from "react-router-dom";
const SellerHomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("USER");
    const userData = JSON.parse(auth);
    if (!auth || userData.accountType=="user" ) {

      navigate("/");
      
    }
  }, [navigate]);
  return (
    <div className="seller-homepage">
      <h2>Welcome to Handmade India</h2>
      <p>
        Handmade India is dedicated to supporting handmade products and promoting
        Indian cultures. We believe in the beauty of handcrafted items and the
        stories they tell. Join us in celebrating the richness of Indian traditions
        through unique, handmade creations.
      </p>
      <img
        src="https://gaatha.com/wp-content/webpc-passthru.php?src=https://gaatha.com/wp-content/uploads/2022/03/Moonj-grass-craft-808x550.jpg&nocache=1"
        alt="Handmade India"
        className="homepage-image"
      />
      <Link to="/sellproductpage" className="sell-button">
        Sell Your Product
      </Link>
      <Link to="/sellerproducts" className="sell-button">
        Your Products
      </Link>
    </div>
  );
};

export default SellerHomePage;
