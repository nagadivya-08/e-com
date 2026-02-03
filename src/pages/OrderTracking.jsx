import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import "../app.css";

function OrderTracking() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { orders, updateOrderStatus } = useOrders();

    const order = orders.find((o) => o.id === orderId);

    if (!order) {
        return (
            <div className="home-page" style={{ padding: "100px", textAlign: "center" }}>
                <h2>Order not found!</h2>
                <button className="btn-cart" onClick={() => navigate("/profile")}>Go to Orders</button>
            </div>
        );
    }

    // Fallback for old mock orders that don't have timeline
    const timeline = order.timeline || [
        { status: "Placed", completed: true },
        { status: "Processing", completed: order.status !== "Placed" },
        { status: "Shipped", completed: order.status === "Shipped" || order.status === "Delivered" },
        { status: "Delivered", completed: order.status === "Delivered" }
    ];

    const handleSimulate = () => {
        // Simple simulation: Advance to next step
        if (order.status === "Placed") updateOrderStatus(order.id, "Processing");
        else if (order.status === "Processing") updateOrderStatus(order.id, "Shipped");
        else if (order.status === "Shipped") updateOrderStatus(order.id, "Delivered");
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

            <div style={{ padding: "80px 20px 40px", maxWidth: "800px", margin: "0 auto" }}>
                <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Track Order #{order.id}</h2>

                {/* Timeline Visualization */}
                <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: "50px" }}>
                    {/* Line */}
                    <div style={{ position: "absolute", top: "15px", left: "0", right: "0", height: "4px", backgroundColor: "#ddd", zIndex: 0 }}></div>

                    {timeline.map((step, index) => (
                        <div key={index} style={{ zIndex: 1, textAlign: "center", width: "80px" }}>
                            <div style={{
                                width: "30px", height: "30px", borderRadius: "50%",
                                backgroundColor: step.completed ? "#28a745" : "#ddd",
                                margin: "0 auto 10px", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold"
                            }}>
                                {step.completed ? "✓" : index + 1}
                            </div>
                            <span style={{ fontSize: "0.9rem", color: step.completed ? "#28a745" : "#666", fontWeight: step.completed ? "bold" : "normal" }}>
                                {step.status}
                            </span>
                            {step.date && <div style={{ fontSize: "0.8rem", color: "#888" }}>{step.date}</div>}
                        </div>
                    ))}
                </div>

                {/* Order Details */}
                <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px", marginBottom: "30px" }}>
                    <h3>Status: <span style={{ color: "#007bff" }}>{order.status}</span></h3>
                    <p><strong>Total:</strong> ₹{order.total.toLocaleString()}</p>
                    <p><strong>Items:</strong> {order.items.map(i => i.name).join(", ")}</p>
                </div>

                {/* Action Buttons */}
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
                    {order.status !== "Delivered" && order.status !== "Cancelled" && (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button className="btn-cart" onClick={handleSimulate}>
                                Simulate Next Step 🚚
                            </button>
                            <button
                                className="btn-cart"
                                style={{ backgroundColor: "#dc3545" }}
                                onClick={() => navigate(`/cancel-order/${order.id}`)}
                            >
                                Cancel Order ❌
                            </button>
                        </div>
                    )}

                    {order.status === "Cancelled" && (
                        <div style={{ padding: "20px", border: "1px solid #dc3545", borderRadius: "8px", backgroundColor: "#fff5f5", width: "100%" }}>
                            <h3 style={{ color: "#dc3545", margin: "0 0 10px 0" }}>Order Cancelled</h3>
                            <p style={{ margin: 0 }}><strong>Reason:</strong> {order.cancellationReason}</p>
                        </div>
                    )}

                    {order.status === "Delivered" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
                            <h3 style={{ color: "#28a745" }}>Order Delivered!</h3>
                            {!order.feedback ? (
                                <button className="btn-header" style={{ padding: "10px 20px", border: "1px solid #007bff", color: "#007bff" }} onClick={() => navigate(`/feedback/${order.id}`)}>
                                    ★ Leave Feedback
                                </button>
                            ) : (
                                <div style={{ padding: "10px", border: "1px solid #ddd", width: "100%", borderRadius: "8px", backgroundColor: "white" }}>
                                    <strong>Your Feedback:</strong>
                                    <p>{"★".repeat(order.feedback.rating)} - {order.feedback.comment}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrderTracking;
