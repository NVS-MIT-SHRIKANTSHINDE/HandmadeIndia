import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Payment from "../Payment";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("USER");
  const userData = JSON.parse(auth);
  const userId = userData.id;

  // State to store cart items fetched from the server
  const [cartItems, setCartItems] = useState([]);
  // State to store product details
  const [productDetails, setProductDetails] = useState([]);
  // State to store item IDs
  const [itemIds, setItemIds] = useState([]);
  // State to store product IDs
  const [productIds, setProductIds] = useState([]);
  // State to store availability status for each product
  const [productAvailability, setProductAvailability] = useState([]);

  // Fetch cart items based on the user ID
  useEffect(() => {
    fetch(`http://localhost:8082/cart/cart/user/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        return response.json();
      })
      .then((data) => {
        setCartItems(data);
        // Extract item IDs and product IDs from cart items
        const ids = data.map((item) => item.id);
        const productIds = data.map((item) => item.productId);
        setItemIds(ids);
        setProductIds(productIds);
        // Fetch product details for each product ID
        fetchProductDetails(productIds);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error.message);
        // Handle the error (e.g., display an error message to the user)
      });
  }, [userId]);

  // Function to fetch product details based on product IDs
  const fetchProductDetails = (ids) => {
    Promise.all(
      ids.map((productId) =>
        fetch(`http://localhost:8082/product/products/${productId}`).then(
          (response) => {
            if (!response.ok) {
              throw new Error(
                `Failed to fetch product details for product ID ${productId}`
              );
            }
            return response.json();
          }
        )
      )
    )
      .then((details) => {
        setProductDetails(details);

        // Check product availability and update the state
        const availability = details.map((product) => !product.soldOut);
        setProductAvailability(availability);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error.message);
        // Handle the error (e.g., display an error message to the user)
      });
  };

  const handleBuyNow = () => {
    const expectedPrice = calculateTotal();
    // Store item IDs and product IDs in local storage
    localStorage.setItem("cart", JSON.stringify({ itemIds, productIds, expectedPrice }));
    navigate("/checkout");
    console.log("Buy Now clicked");
  };

  const calculateTotal = () => {
    return productDetails.reduce(
      (total, item) => total + parseFloat(item.expectedPrice || 0),
      0
    );
  };

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {productDetails.map((product, index) => (
              <li key={index}>
                {product.productName} -  ₹
                {parseFloat(productDetails[index].expectedPrice || 0).toFixed(2)}
                {productAvailability[index] ? null : (
                  <span style={{ color: "red" }}> - Sold Out</span>
                )}
              </li>
            ))}
          </ul>
          <p>Total:  ₹{calculateTotal()}</p>
          <Link to="/checkout">
            <button
              onClick={handleBuyNow}
              style={{ backgroundColor: productAvailability.every((available) => available) ? "" : "red" }}
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
