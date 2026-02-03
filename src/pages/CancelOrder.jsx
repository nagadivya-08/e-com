import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import "../app.css";

function CancelOrder() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { orders, cancelOrder } = useOrders();
    const [reason, setReason] = useState("");
    const [customReason, setCustomReason] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const order = orders.find((o) => o.id === orderId);

    const reasons = [
        "Incorrect size/fit",
        "Product not as described",
        "Found a better price elsewhere",
        "Delayed delivery",
        "Don't want the product anymore",
        "Other"
    ];

    if (!order) {
        return (
            <div className="home-page" style={{ padding: "100px", textAlign: "center" }}>
                <h2>Order not found!</h2>
                <button className="btn-cart" onClick={() => navigate("/profile")}>Go to Orders</button>
            </div>
        );
    }

    if (order.status === "Cancelled") {
        return (
            <div className="home-page" style={{ padding: "100px", textAlign: "center" }}>
                <h2 style={{ color: "#dc3545" }}>Order already cancelled!</h2>
                <p>Reason: {order.cancellationReason}</p>
                <button className="btn-cart" onClick={() => navigate("/profile")}>Go to Orders</button>
            </div>
        );
    }

    const handleCancel = () => {
        const finalReason = reason === "Other" ? customReason : reason;
        if (!finalReason) {
            alert("Please provide a reason for cancellation");
            return;
        }

        setSubmitting(true);
        // Simulate API call delay
        setTimeout(() => {
            cancelOrder(orderId, finalReason);
            setSubmitting(false);
            navigate("/profile");
        }, 1000);
    };

    return (
        <div className="home-page">
            <header className="home-header">
                <div className="home-title" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>ShopEase</div>
                <div className="home-actions">
                    <button className="btn-header" onClick={() => navigate("/profile")}>
                        👤 Profile
                    </button>
                </div>
            </header>

            <div style={{ padding: "80px 20px 40px", maxWidth: "600px", margin: "0 auto" }}>
                <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                    <h2 style={{ marginBottom: "10px", color: "#333" }}>Cancel Order</h2>
                    <p style={{ color: "#666", marginBottom: "25px" }}>We're sorry to see you cancel. Please let us know why.</p>

                    <div style={{ padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px", marginBottom: "25px" }}>
                        <p style={{ margin: 0 }}><strong>Order ID:</strong> {order.id}</p>
                        <p style={{ margin: "5px 0 0 0" }}><strong>Items:</strong> {order.items.map(i => i.name).join(", ")}</p>
                    </div>

                    <div style={{ marginBottom: "25px" }}>
                        <label style={{ display: "block", marginBottom: "10px", fontWeight: "600" }}>Reason for cancellation</label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {reasons.map((r) => (
                                <label key={r} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", border: "1px solid #eee", borderRadius: "6px", cursor: "pointer", transition: "all 0.2s" }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "#007bff"}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "#eee"}
                                >
                                    <input
                                        type="radio"
                                        name="cancelReason"
                                        value={r}
                                        checked={reason === r}
                                        onChange={(e) => setReason(e.target.value)}
                                    />
                                    {r}
                                </label>
                            ))}
                        </div>
                    </div>

                    {reason === "Other" && (
                        <div style={{ marginBottom: "25px" }}>
                            <label style={{ display: "block", marginBottom: "10px", fontWeight: "600" }}>Please specify</label>
                            <textarea
                                style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #ccc", minHeight: "100px", fontFamily: "inherit" }}
                                placeholder="Tell us more..."
                                value={customReason}
                                onChange={(e) => setCustomReason(e.target.value)}
                            />
                        </div>
                    )}

                    <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
                        <button
                            className="btn-header"
                            style={{ flex: 1, padding: "12px", border: "1px solid #ccc", color: "#333" }}
                            onClick={() => navigate(-1)}
                            disabled={submitting}
                        >
                            Back
                        </button>
                        <button
                            className="btn-cart"
                            style={{ flex: 2, padding: "12px", backgroundColor: "#dc3545" }}
                            onClick={handleCancel}
                            disabled={submitting || !reason || (reason === "Other" && !customReason)}
                        >
                            {submitting ? "Processing..." : "Confirm Cancellation"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CancelOrder;
