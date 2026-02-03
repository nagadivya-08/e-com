import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "../app.css";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, wishlist } = useWishlist();

    const product = products.find((p) => p.id === parseInt(id));

    // Mock Reviews State (local for now)
    const [reviews, setReviews] = useState([
        { user: "Alice", rating: 5, comment: "Amazing product! Highly recommended." },
        { user: "Bob", rating: 4, comment: "Good value for money." },
    ]);

    const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });

    if (!product) {
        return <div style={{ padding: "50px", textAlign: "center" }}><h2>Product not found!</h2></div>;
    }

    const isWishlisted = wishlist.some((item) => item.id === product.id || item.name === product.name);

    const handleAddReview = (e) => {
        e.preventDefault();
        if (!newReview.name || !newReview.comment) return;
        setReviews([...reviews, { user: newReview.name, rating: parseInt(newReview.rating), comment: newReview.comment }]);
        setNewReview({ name: "", rating: 5, comment: "" });
    };

    return (
        <div className="home-page">
            <header className="home-header">
                <div className="home-title" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>ShopEase</div>
                <div className="home-actions">
                    <button className="btn-header" onClick={() => navigate("/home")}>
                        🏠 Home
                    </button>
                    <button className="btn-header" onClick={() => navigate("/cart")}>
                        🛒 Cart
                    </button>
                </div>
            </header>

            <div style={{ padding: "80px 20px 40px", maxWidth: "1000px", margin: "0 auto" }}>

                {/* Product Info Section */}
                <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", marginBottom: "50px" }}>
                    <div style={{ flex: "1", minWidth: "300px" }}>
                        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>{product.name}</h1>
                        <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "20px" }}>{product.category}</p>
                        <h2 style={{ fontSize: "2rem", color: "#007bff", marginBottom: "20px" }}>₹{product.price.toLocaleString()}</h2>
                        <p style={{ lineHeight: "1.6", marginBottom: "30px" }}>{product.description}</p>

                        <div style={{ display: "flex", gap: "15px" }}>
                            <button className="btn-cart" onClick={() => addToCart(product)} style={{ padding: "12px 30px", fontSize: "1.1rem" }}>
                                Add to Cart
                            </button>
                            <button
                                className="btn-header"
                                onClick={() => toggleWishlist(product)}
                                style={{ border: "1px solid #ddd", color: isWishlisted ? "red" : "black" }}
                            >
                                {isWishlisted ? "❤️ Wishlisted" : "🤍 Add to Wishlist"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div style={{ borderTop: "1px solid #ddd", paddingTop: "40px" }}>
                    <h2 style={{ marginBottom: "30px" }}>Reviews ({reviews.length})</h2>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>

                        {/* Reviews List */}
                        <div>
                            {reviews.map((review, index) => (
                                <div key={index} style={{ backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "8px", marginBottom: "15px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                        <strong>{review.user}</strong>
                                        <span style={{ color: "orange" }}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                                    </div>
                                    <p style={{ margin: 0, color: "#555" }}>{review.comment}</p>
                                </div>
                            ))}
                        </div>

                        {/* Add Review Form */}
                        <div style={{ backgroundColor: "#fff", padding: "20px", border: "1px solid #eee", borderRadius: "10px", height: "fit-content" }}>
                            <h3>Write a Review</h3>
                            <form onSubmit={handleAddReview} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    required
                                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                                />
                                <select
                                    value={newReview.rating}
                                    onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                                >
                                    <option value="5">5 - Excellent</option>
                                    <option value="4">4 - Good</option>
                                    <option value="3">3 - Average</option>
                                    <option value="2">2 - Poor</option>
                                    <option value="1">1 - Terrible</option>
                                </select>
                                <textarea
                                    placeholder="Your Review"
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    required
                                    rows="4"
                                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                                />
                                <button type="submit" className="btn-cart">Submit Review</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProductDetails;
