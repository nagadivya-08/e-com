import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import "../app.css";

function OrderFeedback() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { addOrderFeedback } = useOrders();

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addOrderFeedback(orderId, { rating: parseInt(rating), comment });
        alert("Thank you for your feedback!");
        navigate(`/track-order/${orderId}`);
    };

    return (
        <div className="home-page">
            <header className="home-header">
                <div className="home-title" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>ShopEase</div>
            </header>

            <div style={{ padding: "80px 20px 40px", maxWidth: "600px", margin: "0 auto" }}>
                <h2 style={{ textAlign: "center" }}>Leave Feedback for Order #{orderId}</h2>
                <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "10px", marginTop: "30px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div>
                            <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Rating</label>
                            <select
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1.1rem" }}
                            >
                                <option value="5">★★★★★ - Excellent</option>
                                <option value="4">★★★★☆ - Good</option>
                                <option value="3">★★★☆☆ - Average</option>
                                <option value="2">★★☆☆☆ - Poor</option>
                                <option value="1">★☆☆☆☆ - Terrible</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Comment</label>
                            <textarea
                                rows="5"
                                placeholder="Tell us about your experience..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontFamily: "inherit" }}
                            />
                        </div>

                        <button type="submit" className="btn-cart" style={{ width: "100%", fontSize: "1.1rem" }}>
                            Submit Feedback
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default OrderFeedback;
