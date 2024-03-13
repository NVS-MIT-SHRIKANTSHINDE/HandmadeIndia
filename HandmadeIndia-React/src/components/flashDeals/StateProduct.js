import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css"; // Import your CSS file for styling

const StateProductList = ({ stateName }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [celebrityData, setCelebrityData] = useState([
    {
      id: 1,
      image: "https://assets.vogue.in/photos/5f367a4218ed58cd147adb84/2:3/w_1920,c_limit/Vidya%20Balan%20in%20Madras%20checks%20sari.jpg",
      description: "Vidya Balan, the epitome of Bollywood elegance, is a tapestry woven with the finest threads of talent and grace. Her eyes, like hand-blown glass beads, reflect the myriad emotions she effortlessly embodies on the silver screen. The contours of her face are sculpted with the precision of a skilled artisan, each feature a masterpiece etched by the hands of creativity.",
      state: "Maharashtra",
    },
    {
      id: 2,
      image: "https://assets.vogue.in/photos/633187ea92205c07fe758e1d/2:3/w_2560%2Cc_limit/Hair%2520accessories.jpg",
      description: "Priyanka Chopra, a luminary in the cinematic galaxy, is a handmade marvel, skillfully crafted by the hands of destiny. Her eyes, akin to artisanal gemstones, sparkle with a kaleidoscope of expressions that unveil the many facets of her versatile talent. The contours of her visage, sculpted by the hands of time, form a portrait that tells the story of resilience and success.",
      state: "Maharashtra",
    },
    // Add more celebrity data as needed
  ]);
  

  useEffect(() => {
    // Fetch all products
    fetch(`http://localhost:8082/product/products`)
      .then((response) => response.json())
      .then((data) => {
        // Filter products based on the provided stateName
        const filteredProducts = data.filter((product) => product.state === stateName);
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [stateName]);

  return (
    <div>
      <h2> 🛍️ Products in {stateName} </h2>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="product-list">
        {products
          .filter((product) =>
            product.productName.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
            <Link to={`/viewproduct/${product.id}`} key={product.id}>
              <div className="product-card">
                {/* Assuming "image" property is available in your product data */}
                <img src={`data:image/jpeg;base64,${product.image}`} alt={product.productName} />
                <p>{product.productName}</p>
                <p>Category: {product.category}</p>
                <p>State: {product.state}</p>
              </div>
            </Link>
          ))}
      </div>

      {/* Celebrity Section */}
<div>
  <h2> 🌟 Celebrity Section </h2>
  <div className="celebrity-list">
    {celebrityData
      .filter((celebrity) => celebrity.state === stateName)
      .map((celebrity) => (
        <div key={celebrity.id} className="celebrity-card">
          <img src={celebrity.image} alt={`Celebrity ${celebrity.id}`} />
          <p>{celebrity.description}</p>
          <p>State: {celebrity.state}</p>
        </div>
      ))}
  </div>
</div>

    </div>
  );
};

export default StateProductList;
