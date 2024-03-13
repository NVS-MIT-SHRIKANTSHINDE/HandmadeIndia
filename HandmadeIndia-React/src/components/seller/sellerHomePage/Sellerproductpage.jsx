
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatBot from "../../order/Chatbot";

// Import your CSS file if you have one
import "./SellProductPage.css";

const SellProductPage = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("USER");
  const userData = JSON.parse(auth);
  const [formData, setFormData] = useState({
    category: "",
    ownerid:userData.id,
    productName: "",
    state: "",
    storyCulture: "",
    daysRequired: "",
    lifeOfProduct: "",
    howToUse: "",
    expectedPrice: "",
    confirmPrice: "",
    quantity: "",
    image: null, // New field for image upload
  });
  console.log(userData.id);
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const selectedFile = files[0];
      if (selectedFile && selectedFile.type === "image/jpeg") {
        setFormData({ ...formData, image: selectedFile });
      } else {
        alert("Please select a valid JPG image.");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    // for (const key in formData) {
    //   if (formData.hasOwnProperty(key)) {
    //     if (!formData[key]) {
    //       alert(`Please fill in the ${key.replace(/([A-Z])/g, " $1").toLowerCase()} field.`);
    //       return;
    //     }
    //   }
    // }

    // Simulate API call
    try {
      const formDataForApi = new FormData();
      for (const key in formData) {
        formDataForApi.append(key, formData[key]);
      }

      const response = await fetch(
        "http://localhost:8082/product/products", // Replace with your actual API endpoint
        {
          method: "POST",
          body: formDataForApi,
        }
      );
      

      if (response.ok) {
        alert("Data saved successfully!");
        setFormData({
          ownerid:userData.id,
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
          image: null,
        });

        // Redirect to SellerHomePage after successful save
        navigate("/sellerHomePage");
      } else {
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving data.");
    }
  };

  return (
    
    <div className="sell-product-page">
      <h2>Sell Your Product</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-field">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="furniture">Furniture</option>
            <option value="kitchen">Kitchen</option>
            <option value="traditional-wear">Traditional Wear</option>
            <option value="festive-decor">Festive Decor</option>
            <option value="jewelry">Jewelry</option>
            <option value="home-textiles">Home Textiles</option>
            <option value="religious-items">Religious Items</option>
            <option value="handicrafts">Handicrafts</option>
            <option value="kitchenware">Kitchenware</option>
            <option value="health-wellness">Health & Wellness</option>
            <option value="ayurveda">Ayurveda Products</option>
            <option value="music-instruments">Music Instruments</option>

          </select>
        </div>
        <div className="form-field">
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>State:</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label>Story/Culture:</label>
          <textarea
            name="storyCulture"
            value={formData.storyCulture}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-field">
          <label>Days Required:</label>
          <input
            type="text"
            name="daysRequired"
            value={formData.daysRequired}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Life of Product:</label>
          <input
            type="text"
            name="lifeOfProduct"
            value={formData.lifeOfProduct}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Quantity of Product:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>How to Use:</label>
          <textarea
            name="howToUse"
            value={formData.howToUse}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-field">
          <label>Expected Price:</label>
          <input
            type="text"
            name="expectedPrice"
            value={formData.expectedPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Confirm Price:</label>
          <input
            type="text"
            name="confirmPrice"
            value={formData.confirmPrice}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Add other form fields as needed */}
        <div className="form-field">
          <label>Image (JPG only):</label>
          <div className="file-input-container">
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept=".jpg, .jpeg"
              className="file-input"
              required
            />
            <button
              type="button"
              className="upload-button"
              onClick={() => {
                document.getElementsByName("image")[0].click();
              }}
            >
              Upload Image
            </button>
          </div>
          {formData.image && (
            <div className="image-preview">
              <img src={URL.createObjectURL(formData.image)} alt="Preview" />
            </div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SellProductPage;
