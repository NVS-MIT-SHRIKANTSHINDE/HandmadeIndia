import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const auth = localStorage.getItem("USER");
  //   if (auth) {

  //     navigate("/");
      
  //   }
  // }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    loginType: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const queryParams = new URLSearchParams({
        email: formData.email,
        password: formData.password,
        accountType:formData.loginType,
      });

      const response = await fetch(`http://localhost:8082/user/users/login?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();

        // Exclude password from the logged data
        const { password, ...userData } = responseData;

        console.log("User Data (excluding password):", userData);

        // Store user ID and other data in localStorage
        localStorage.setItem("USER", JSON.stringify(userData));
        swal("Good job!", "Login successfully!", "success")
        // window.location.reload();
        const auth = localStorage.getItem("USER");
        if(auth.accountType=="user")
        {
          navigate("/");
        }else{
          navigate("/sellerHomePage");
        }
        
      } else {
     
        swal("Oops...", "Wrong data!!", "");
       
        navigate("/login");
      }
    } catch (error) {
      swal("Oops...", "Wrong data!!", "");
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="main">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <select
          name="loginType"
          value={formData.loginType}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="seller">Seller</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
