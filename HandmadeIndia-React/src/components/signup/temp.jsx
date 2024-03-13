import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    accountType: "user",
    password: "",
    // confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the signup API
      const response = await axios.post("http://localhost:8082/user/users", formData);

      // Handle the response, you might want to check if the signup was successful
      console.log("Signup successful:", response.data);

      // Redirect the user to the login page after successful signup
      navigate("/login");
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <div className="main">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <div className="phone-input">
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
          >
            <option value="+1">+1 (US)</option>
            <option value="+91">+91 (IN)</option>
            {/* Add more country codes as needed */}
          </select>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </div>
        <select
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="seller">Seller</option>
        </select>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
