import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import "../app.css";

function Profile() {
    const navigate = useNavigate();
    const { orders } = useOrders();
    const [activeTab, setActiveTab] = useState("orders");

    const coupons = [
        { code: "WELCOME50", discount: "50% OFF", expiry: "2026-12-31" },
        { code: "SUMMER10", discount: "10% OFF", expiry: "2026-06-30" },
    ];

    const faqs = [
        { question: "How do I track my order?", answer: "Go to the Orders tab and click on 'Track'." },
        { question: "What is the return policy?", answer: "Returns are accepted within 7 days of delivery." },
    ];

    return (
        <div className="home-page">
            <header className="home-header">
                <div className="home-title" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>ShopEase</div>
                <div className="home-actions">
                    <button className="btn-header" onClick={() => navigate("/home")}>
                        🏠 Home
                    </button>
                    <button className="btn-header" onClick={() => navigate("/")}>
                        Logout
                    </button>
                </div>
            </header>

            <div style={{ padding: "80px 20px 40px", maxWidth: "900px", margin: "0 auto" }}>
                {/* User Card */}
                <div style={{ display: "flex", alignItems: "center", gap: "20px", padding: "20px", backgroundColor: "#f0f4f8", borderRadius: "10px", marginBottom: "30px" }}>
                    <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#ccc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>👤</div>
                    <div>
                        <h2 style={{ margin: 0 }}>John Doe</h2>
                        <p style={{ margin: "5px 0", color: "#666" }}>john.doe@example.com</p>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div style={{ display: "flex", borderBottom: "2px solid #ddd", marginBottom: "20px" }}>
                    {["orders", "help", "coupons"].map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: "10px 20px",
                                cursor: "pointer",
                                fontWeight: activeTab === tab ? "bold" : "normal",
                                color: activeTab === tab ? "#007bff" : "#333",
                                borderBottom: activeTab === tab ? "3px solid #007bff" : "none",
                                textTransform: "capitalize"
                            }}
                        >
                            {tab === "help" ? "Help Center" : tab}
                        </div>
                    ))}
                </div>

                {/* Tab Content */}
                <div style={{ minHeight: "300px" }}>
                    {activeTab === "orders" && (
                        <div>
                            <h3 style={{ marginBottom: "20px" }}>My Orders</h3>
                            {orders.length === 0 ? <p>No orders found.</p> : orders.map((order) => (
                                <div key={order.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", marginBottom: "15px", backgroundColor: "white" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                        <strong>Order #{order.id}</strong>
                                        <span style={{ color: order.status === "Delivered" ? "green" : order.status === "Processing" ? "blue" : "orange", fontWeight: "bold" }}>{order.status}</span>
                                    </div>
                                    <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>Date: {order.date}</p>
                                    <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>Items: {order.items.map(i => i.name).join(", ")}</p>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                                        <p style={{ fontWeight: "bold", margin: 0 }}>Total: ₹{order.total.toLocaleString()}</p>
                                        <div style={{ display: "flex", gap: "10px" }}>
                                            {(order.status !== "Delivered" && order.status !== "Cancelled") && (
                                                <button
                                                    onClick={() => navigate(`/cancel-order/${order.id}`)}
                                                    style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            <button
                                                onClick={() => navigate(`/track-order/${order.id}`)}
                                                style={{ backgroundColor: "#007bff", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}
                                            >
                                                Track Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "help" && (
                        <div>
                            <h3 style={{ marginBottom: "20px" }}>Help Center</h3>
                            {faqs.map((faq, idx) => (
                                <div key={idx} style={{ marginBottom: "20px", backgroundColor: "white", padding: "15px", borderRadius: "8px", border: "1px solid #eee" }}>
                                    <h4 style={{ margin: "0 0 10px 0" }}>❓ {faq.question}</h4>
                                    <p style={{ margin: 0, color: "#555" }}>{faq.answer}</p>
                                </div>
                            ))}
                            <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#e2e6ea", borderRadius: "8px", textAlign: "center" }}>
                                <p>Need more help? Contact us at <strong>support@shopease.com</strong></p>
                            </div>
                        </div>
                    )}

                    {activeTab === "coupons" && (
                        <div>
                            <h3 style={{ marginBottom: "20px" }}>My Coupons</h3>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
                                {coupons.map((coupon, idx) => (
                                    <div key={idx} style={{ border: "2px dashed #007bff", padding: "20px", borderRadius: "8px", backgroundColor: "#f8f9fa", position: "relative" }}>
                                        <h2 style={{ color: "#007bff", margin: "0 0 10px 0" }}>{coupon.discount}</h2>
                                        <p style={{ fontWeight: "bold", fontSize: "1.2rem", margin: "0 0 5px 0" }}>{coupon.code}</p>
                                        <p style={{ fontSize: "0.8rem", color: "#666" }}>Expires on: {coupon.expiry}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Profile;
