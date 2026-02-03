import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import "../app.css";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="home-title" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>ShopEase</div>
        <div className="home-actions">
          <button className="btn-header" onClick={() => navigate("/home")}>
            🏠 Home
          </button>
        </div>
      </header>

      <div style={{ padding: "80px 20px 20px" }}> {/* Added padding for fixed header */}
        <h2>❤️ Your Wishlist ({wishlist.length})</h2>

        {wishlist.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h3>Your wishlist is empty!</h3>
            <button className="btn-cart" onClick={() => navigate("/home")} style={{ marginTop: "20px" }}>
              Explore Products
            </button>
          </div>
        ) : (
          <div className="home-grid">
            {wishlist.map((product, index) => (
              <div className="home-card" key={index}>
                <span
                  className="home-heart"
                  style={{ color: "red" }}
                  onClick={() => removeFromWishlist(product.name)}
                  title="Remove from Wishlist"
                >
                  ❤️
                </span>
                <h4>{product.name}</h4>
                <p>₹{product.price.toLocaleString()}</p>

                {/* 
                  Note: Add to Cart logic is local to Home currently. 
                  If we want "Add to Cart" here, we'd need a CartContext too.
                  For now, I'll omit Add to Cart or just leave it for the user to navigate back.
                */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div >
  );
}

export default Wishlist;
