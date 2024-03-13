// Import necessary libraries
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewProduct.css"; // Import your CSS file for styling
import swal from 'sweetalert';
// Define the ViewProduct component
const ViewProduct = () => {
  const { id } = useParams();// Get the product ID from route parameters
  const navigate = useNavigate(); // Get the navigate function for navigation
  const auth = localStorage.getItem("USER");
  const userData = JSON.parse(auth);
  // Initialize state for the product data
  const [product, setProduct] = useState({
    category: "",
    productName: "",
    state: "",
    storyCulture: "",
    daysRequired: "",
    lifeOfProduct: "",
    howToUse: "",
    expectedPrice: "",
    confirmPrice: "",
    quantity: "",
    image: "",
    // ratings: {
    //   average: 0,
    //   totalRatings: 0,
    //   fiveStar: 0,
    //   fourStar: 0,
    //   threeStar: 0,
    //   twoStar: 0,
    //   oneStar: 0,
    // },
    // reviews: [],
  });

  // Fetch product details from the API when the component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch(`http://localhost:8082/product/products/${id}`);
        const data = await response.json();
        setProduct(data); // Update the state with the fetched product details
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);
  

  const handleAddToCart = () => {
    // Assuming productId and userId are available in your component state or props
    const productId = id;
    const userId = userData.id;
    if(product.status !== "sold")
    {

    console.log(userData.status);
    // Prepare the data to be sent in the request body
    const requestData = {
      userId: userId,
      productId: productId,
    };
  
    // Make a POST request to your server endpoint
    fetch('http://localhost:8082/cart/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add product to cart');
        }
        return response.json();
      })
      .then(data => {
        swal("Good job!", "Product added to cart", "success")
        // Display an alert
        
        alert('Product added to cart!');
        // Redirect to the cart page if needed
        navigate('/cart');
      })
      .catch(error => {
        console.error('Error adding product to cart:', error.message);
        // Handle the error (e.g., display an error message to the user)
      });
    }
    else{
      
      swal({
        title: "bad luck 👎",
        text: "sold out 🛒",
        type: "warning",
      }
      );
    }
  };
  
  const handleBuyNow = () => {
    // Implement your logic for initiating the checkout process
    localStorage.setItem("cart", JSON.stringify(product));
    navigate("/checkout");
    console.log("Buy Now clicked");
  };

  return (
    <div className="view-product">
      <h2>{product.productName}</h2>
      <div className="product-details">
        <div className="product-image">
          <img src={`data:image/jpeg;base64,${product.image}`} alt={product.productName} />
        </div>
        <br></br>
        <div className="view-product" >
        <hr></hr>
        </div>
        
        <div className="product-info">
          <p>Category: {product.category}</p>
          <p>State: {product.state}</p>
          <p>Story/Culture: {product.storyCulture}</p>
          <p>Days Required: {product.daysRequired}</p>
          <p>Life of Product: {product.lifeOfProduct}</p>
          <p>How to Use: {product.howToUse}</p>
          <p>MRP: {product.expectedPrice} ₹</p>
          {/* <p>Confirm Price: {product.confirmPrice}</p> */}
          <p>Quantity: {product.quantity}</p>
          <button onClick={handleAddToCart}>ADD TO CART</button>
          {/* <button onClick={handleBuyNow}>BUY NOW</button> */}
        </div>
      </div>
      {/* <div className="ratings-reviews">
        <p>Ratings & Reviews</p>
        <div className="average-rating">
          <p>{product.ratings.average}★</p>
          <p>{product.ratings.totalRatings} Ratings</p>
        </div>
        <div className="individual-ratings">
          <p>5★: {product.ratings.fiveStar}</p>
          <p>4★: {product.ratings.fourStar}</p>
          <p>3★: {product.ratings.threeStar}</p>
          <p>2★: {product.ratings.twoStar}</p>
          <p>1★: {product.ratings.oneStar}</p>
        </div>
      </div>
      <div className="reviews">
        <p>Reviews</p>
        {product.reviews.map((review, index) => (
          <div key={index} className="review">
            <p>{review.rating}★</p>
            <p>{review.reviewText}</p>
            <p>By {review.reviewer}</p>
          </div>
        ))}
      </div>
      <div className="questions-answers">
        <p>Questions and Answers</p>
       
      </div> */}

    </div>
  );
};

export default ViewProduct;
