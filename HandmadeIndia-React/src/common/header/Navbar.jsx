import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ChatBot from "../../components/order/Chatbot";
const Navbar = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [MobileMenu, setMobileMenu] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleChatbotToggle = () => {
    setShowChatbot((prevShowChatbot) => !prevShowChatbot);
  };
  useEffect(() => {
    const userAuth = localStorage.getItem("USER");
    setAuth(userAuth);
    console.log(auth);
  }, [navigate]);

  return (
    <>
      <header className="header">
        <div className="container d_flex">
          <div className="catgrories d_flex">
            <span className="fa-solid fa-border-all"></span>
            <h4>
              why we unique <i className="fa fa-chevron-down"></i>
            </h4>
          </div>

          <div className="navlink">
            <ul
              className={
                MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
              }
              onClick={() => setMobileMenu(false)}
            >
              <li>
                <Link to="/">home</Link>
              </li>
              <li>
                <Link to="/user">user account</Link>
              </li>

              <li>
                <Link to="/sellerhomepage"> Sell Product </Link>
              </li>
              <li>
                <Link to="/placedorder"> Your Orders </Link>
              </li>
              <li>
                <Link to="/indiamap"> indian map </Link>
              </li>
              

              {!auth ? (
                <>
                  <li>
                    <Link to="/login">login</Link>
                  </li>
                  <li>
                    <Link to="/signup">signup</Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={() => {
                      // Handle logout and clear localStorage
                      localStorage.removeItem("USER");
                      // Optionally, navigate to the home page or another page after logout
                      window.location.reload();
                      navigate("/");
                    }}
                    style={{
                      // Inline CSS styles for the Logout button
                      padding: "10px 15px",
                      background: "#ff0000", // Example background color (change as needed)
                      color: "#fff", // Example text color (change as needed)
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
              {/* <li>
                <Link to="/contact">contact</Link>
              </li> */}
              <li>
                <button
                  onClick={handleChatbotToggle}
                  style={{
                    padding: "10px 15px",
                    background: "#4CAF50", // Example background color for the chatbot button (change as needed)
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {showChatbot ? "Hide Chatbot" : "Show Chatbot"}
                </button>
              </li>
              {showChatbot && <ChatBot></ChatBot>}
            </ul>

            <button
              className="toggle"
              onClick={() => setMobileMenu(!MobileMenu)}
            >
              {MobileMenu ? (
                <i className="fas fa-times close home-btn"></i>
              ) : (
                <i className="fas fa-bars open"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
