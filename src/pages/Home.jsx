import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useAddress } from "../context/AddressContext";
import { products } from "../data/products";
import "../app.css";

function Home() {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();
  const { cart, addToCart } = useCart();
  const { selectedAddress } = useAddress();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Advanced Filter States
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 100000,
    minRating: 0,
    discount: 0,
    trends: [],
    height: 200, // Max height filter
    sizes: []
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);


  const handleLogout = () => {
    alert("You have been logged out successfully.");
    navigate("/login");
  };

  // 🔍 Get unique categories dynamically
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // 🔎 Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    const matchesPrice = product.price >= appliedFilters.minPrice && product.price <= appliedFilters.maxPrice;
    const matchesRating = product.rating >= appliedFilters.minRating;
    const matchesDiscount = product.discount >= appliedFilters.discount;
    const matchesTrend = appliedFilters.trends.length === 0 || appliedFilters.trends.includes(product.trend);
    const matchesHeight = product.height <= appliedFilters.height;
    const matchesSize = appliedFilters.sizes.length === 0 || appliedFilters.sizes.includes(product.size);

    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesDiscount && matchesTrend && matchesHeight && matchesSize;
  });

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setShowFilters(false);
  };

  const toggleTrend = (trend) => {
    setFilters(prev => ({
      ...prev,
      trends: prev.trends.includes(trend)
        ? prev.trends.filter(t => t !== trend)
        : [...prev.trends, trend]
    }));
  };

  const toggleSize = (size) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  return (
    <div className="home-page">
      {/* HEADER */}
      <header className="home-header">
        <div className="home-title">ShopEase</div>

        {/* Address Display */}
        <div
          onClick={() => navigate("/addresses")}
          style={{
            cursor: "pointer", display: "flex", alignItems: "center", gap: "5px",
            backgroundColor: "rgba(255,255,255,0.2)", padding: "5px 10px", borderRadius: "5px"
          }}
        >
          <span>📍</span>
          <span style={{ fontSize: "0.9rem" }}>
            {selectedAddress ? `${selectedAddress.city} - ${selectedAddress.zip}` : "Select Location"}
          </span>
        </div>

        <div className="home-actions">
          <button className="btn-header" onClick={() => navigate("/wishlist")}>
            ❤️ Wishlist ({wishlist.length})
          </button>

          <button className="btn-header" onClick={() => navigate("/cart")}>
            🛒 Cart ({cart.length})
          </button>

          <button className="btn-header" onClick={() => navigate("/profile")}>
            👤 Profile
          </button>

          <button className="btn-header" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* HERO */}
      <div className="home-hero">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >
          <source src="/src/images/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <h1>Shop Smart, Shop Easy</h1>
          <p>Best deals on your favorite products</p>
        </div>
      </div>

      {/* SEARCH & FILTER BAR */}
      <section className="home-section">
        <h2>Find Products</h2>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "8px", flex: "1" }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: "8px" }}
          >
            {categories.map((cat, idx) => (
              <option key={idx}>{cat}</option>
            ))}
          </select>

          <button
            className="btn-header"
            style={{ backgroundColor: "#ff9f00", color: "white" }}
            onClick={() => setShowFilters(true)}
          >
            🔍 Filter
          </button>
        </div>

        {/* Filter Drawer/Modal */}
        {showFilters && (
          <div className="filter-overlay">
            <div className="filter-modal">
              <div className="filter-header">
                <h3>Filters</h3>
                <button className="close-filter" onClick={() => setShowFilters(false)}>×</button>
              </div>

              <div className="filter-body">
                <div className="filter-group">
                  <label>Price Range (Up to ₹{filters.maxPrice})</label>
                  <input
                    type="range" min="0" max="100000" step="500"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                  />
                </div>

                <div className="filter-group">
                  <label>Min Rating: {filters.minRating} ⭐</label>
                  <input
                    type="range" min="0" max="5" step="0.5"
                    value={filters.minRating}
                    onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
                  />
                </div>

                <div className="filter-group">
                  <label>Min Discount: {filters.discount}%</label>
                  <input
                    type="range" min="0" max="50" step="5"
                    value={filters.discount}
                    onChange={(e) => setFilters({ ...filters, discount: parseInt(e.target.value) })}
                  />
                </div>

                <div className="filter-group">
                  <label>Trends</label>
                  <div className="filter-options">
                    {["Trending", "Bestseller", "New Arrival"].map(trend => (
                      <label key={trend}>
                        <input
                          type="checkbox"
                          checked={filters.trends.includes(trend)}
                          onChange={() => toggleTrend(trend)}
                        /> {trend}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="filter-group">
                  <label>Max Height (cm): {filters.height}</label>
                  <input
                    type="range" min="0" max="200" step="1"
                    value={filters.height}
                    onChange={(e) => setFilters({ ...filters, height: parseInt(e.target.value) })}
                  />
                </div>

                <div className="filter-group">
                  <label>Sizes</label>
                  <div className="filter-options">
                    {["S", "M", "L", "XL", "UK 8", "UK 9", "UK 10", "15.6 inch", "6.5 inch"].map(size => (
                      <label key={size}>
                        <input
                          type="checkbox"
                          checked={filters.sizes.includes(size)}
                          onChange={() => toggleSize(size)}
                        /> {size}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="filter-footer">
                <button
                  className="btn-reset"
                  onClick={() => setFilters({
                    minPrice: 0, maxPrice: 100000, minRating: 0, discount: 0, trends: [], height: 200, sizes: []
                  })}
                >
                  Reset
                </button>
                <button className="btn-apply" onClick={handleApplyFilters}>Apply</button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="home-section">
        <h2>Featured Products</h2>
        <div className="home-grid">
          {filteredProducts.map((product, index) => {
            const isWishlisted = wishlist.find(
              (item) => item.name === product.name
            );

            return (
              <div className="home-card" key={index}>
                <span
                  className="home-heart"
                  style={{ color: isWishlisted ? "red" : "#aaa" }}
                  onClick={() => toggleWishlist(product)}
                >
                  {isWishlisted ? "❤️" : "🤍"}
                </span>

                <h4
                  onClick={() => navigate(`/product/${product.id}`)}
                  style={{ cursor: "pointer", color: "#007bff", marginTop: "10px" }}
                >
                  {product.name}
                </h4>
                <p>₹{product.price.toLocaleString()}</p>

                <button
                  className="btn-cart"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        © 2026 ShopEase. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
