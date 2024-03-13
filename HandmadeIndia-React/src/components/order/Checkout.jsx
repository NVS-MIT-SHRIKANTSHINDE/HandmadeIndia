import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import Payment from "../../common/Payment";
const Checkout = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("USER");
  const userData = JSON.parse(auth);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: userData.name,
    phoneNumber: userData.phone,
    verificationCode: "",
    address: "",
    city: "",
    zipCode: "",
    state: "",
    country: "",
    deliveryStatus: "",
  });

  const [verificationCodeCorrect, setVerificationCodeCorrect] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSendVerificationCode = () => {
    window.alert("Verification code sent to: " + shippingDetails.phoneNumber);

    
  };

  const handleVerifyCode = () => {
    const correctCode = "1234";
    if (shippingDetails.verificationCode === correctCode) {
      setVerificationCodeCorrect(true);
    } else {
      setVerificationCodeCorrect(false);
    }
  };

  const handlePlaceOrder = () => {
    localStorage.setItem("shippingDetails", JSON.stringify({ shippingDetails }));
    setIsFormSubmitted(true);
  };

  const handlePayment = async () => {
    setIsPaymentProcessing(true);

    // Simulate payment processing (replace with actual payment logic)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsPaymentProcessing(false);

    // After payment, redirect to the placed order page
    navigate("/placedorder");
  };

  const handleZipCodeChange = async (e) => {
    const zipCode = e.target.value;
    setShippingDetails((prevDetails) => ({ ...prevDetails, zipCode }));

    if (zipCode.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${zipCode}`
        );

        const postOfficeData = response.data[0].PostOffice[0];
        const { DeliveryStatus, District, Block, State, Country } =
          postOfficeData;

        setShippingDetails((prevDetails) => ({
          ...prevDetails,
          address: Block,
          city: District,
          state: State,
          country: Country,
          deliveryStatus: DeliveryStatus,
        }));

       
      } catch (error) {
        console.error("Error fetching location details:", error);
      }
    }
  };

  return (
    <div className="checkout">
      {isFormSubmitted ? (
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p>Full Name: {shippingDetails.fullName}</p>
          <p>Phone Number: {shippingDetails.phoneNumber}</p>
          <p>Verification Code: {shippingDetails.verificationCode}</p>
          <p>Zip Code: {shippingDetails.zipCode}</p>
          <p>Address: {shippingDetails.address}</p>
          <p>City: {shippingDetails.city}</p>
          <p>State: {shippingDetails.state}</p>
          <p>Country: {shippingDetails.country}</p>
          <Payment></Payment>
          {/* <button
            type="button"
            onClick={handlePayment}
            disabled={isPaymentProcessing}
          >
           
          </button> */}
        </div>
      ) : (
        <>
          <div className="column-image">
            <img src="images/placeorder.jpg" alt="Column Image" />
          </div>
          <div className="form-container">
            <h2>Checkout</h2>
            <form>
              <label>
                Full Name:
                <input
                  type="text"
                  name="fullName"
                  value={shippingDetails.fullName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phoneNumber"
                  value={shippingDetails.phoneNumber}
                  onChange={handleInputChange}
                />
                <button type="button" onClick={handleSendVerificationCode}>
                  Send Verification Code
                </button>
              </label>
              <label>
                Verification Code:
                <input
                  type="text"
                  name="verificationCode"
                  value={shippingDetails.verificationCode}
                  onChange={handleInputChange}
                />
                <button type="button" onClick={handleVerifyCode}>
                  Verify Code
                </button>
              </label>
              {verificationCodeCorrect && (
                <>
                <label>
                    Zip Code:
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingDetails.zipCode}
                      onChange={handleZipCodeChange}
                    />
                  </label>
                  <label>
                    Address:
                    <input
                      type="text"
                      name="address"
                      value={shippingDetails.address}
                      onChange={handleInputChange}
                    />
                  </label>

                  <label>
                    City:
                    <input
                      type="text"
                      name="city"
                      value={shippingDetails.city}
                      onChange={handleInputChange}
                    />
                  </label>
                  
                  <label>
                    State:
                    <input
                      type="text"
                      name="state"
                      value={shippingDetails.state}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Country:
                    <input
                      type="text"
                      name="country"
                      value={shippingDetails.country}
                      onChange={handleInputChange}
                    />
                  </label>
                  {shippingDetails.deliveryStatus !== "Non-Delivery" &&
                    shippingDetails.deliveryStatus !== "" && (
                      <button type="button" onClick={handlePlaceOrder}>
                        Place Order
                      </button>
                    )}
                </>
              )}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
