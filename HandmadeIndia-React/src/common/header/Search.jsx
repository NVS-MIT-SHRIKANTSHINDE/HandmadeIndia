import React from "react";
import logo from "../../components/assets/images/logo.svg";
import { Link } from "react-router-dom";

const Search = ({ CartItem }) => {
  // fixed Header
  // window.addEventListener("scroll", function () {
  //   const search = document.querySelector(".search");
  //   search.classList.toggle("active", window.scrollY > 100);
  // });

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <img
              src="https://www.pngall.com/wp-content/uploads/2017/03/Handicraft-PNG.png"
              alt=""
              style={{
                maxWidth: "100%", // Make sure the image does not exceed its container width
                height: "auto", // Maintain the aspect ratio of the image
                borderRadius: "8px", // Add rounded corners
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
                margin: "20px 0", // Add margin to space it from the other elements
              }}
            />
          </div>
          <div className="logo width ">
            <img
              src="https://www.freepnglogos.com/uploads/indian-flag-png/indian-flag-india-day-background-png-image-download-5.png"
              alt=""
              style={{
                maxWidth: "100%", // Make sure the image does not exceed its container width
                height: "auto",
              }}
            />
          </div>

          <div className="logo width ">
            <img
              src="https://www.pngall.com/wp-content/uploads/2017/03/Handicraft.png"
              alt=""
              style={{
                Width: "auto", // Make sure the image does not exceed its container width
                height: "100px",
                marginLeft: "300px",
                marginBottom: "100px", // Maintain the aspect ratio of the image
                // borderRadius: "8px", // Add rounded corners
                // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
                // margin: "20px 0", // Add margin to space it from the other elements
              }}
            />
          </div>

          <div className="search-box f_flex">
            {/* <i className="fa fa-search"></i> */}
            {/* <input type="text" placeholder="Search and hit enter..." /> */}
            {/* <span><b>HandMade India</b></span> */}
          </div>
          
          <div className="icon f_flex width">
            <div className="cart">
              <Link to="/cart">
                <i className="fa fa-shopping-bag icon-circle"></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
