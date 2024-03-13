import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css"; // Import your CSS file for styling

const ProductList = () => {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API endpoint
    fetch("http://localhost:8082/product/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filterProducts = () => {
    return products.filter((product) => {
      const categoryMatch = categoryFilter === "all" || product.category === categoryFilter;
      const stateMatch = stateFilter === "all" || product.state === stateFilter;
      const searchMatch =
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.state.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && stateMatch && searchMatch;
    });
  };

  return (
    <div>
      <h2> 🛍️ Our Products </h2>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filtering options */}
      <div className="filter-options">
        <label>
          Category:
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All</option>
            {/* Add your actual categories */}
            {/* Assuming categories are available in your product data */}
            {Array.from(new Set(products.map((product) => product.category))).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          State:
          <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
            <option value="all">All</option>
            {/* Add your actual states */}
            {/* Assuming states are available in your product data */}
            {Array.from(new Set(products.map((product) => product.state))).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="product-list">
        {filterProducts().map((product) => (
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
    </div>
  );
};

export default ProductList;
