import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import "../app.css";

function Checkout() {
    const { cart, clearCart } = useCart();
    const { addOrder } = useOrders();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        paymentMethod: "card"
    });

    const [orderPlaced, setOrderPlaced] = useState(false);

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        // Simulate API call
        setTimeout(() => {
            // Add order to history
            addOrder({
                items: cart,
                total: total,
                shippingAddress: {
                    name: formData.name,
                    address: formData.address,
                    city: formData.city,
                    zip: formData.zip
                },
                paymentMethod: formData.paymentMethod
            });

            setOrderPlaced(true);
            clearCart();
        }, 1000);
    };

    if (orderPlaced) {
        return (
            <div className="home-page" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center", padding: "40px", backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                    <h1 style={{ color: "#28a745", fontSize: "3rem" }}>🎉 Success!</h1>
                    <h2>Your order has been placed successfully.</h2>
                    <p>Thank you for shopping with ShopEase!</p>
                    <button className="btn-cart" onClick={() => navigate("/home")} style={{ marginTop: "20px" }}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="home-page">
            <header className="home-header">
                <div className="home-title" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>ShopEase</div>
                <div className="home-actions">
                    <button className="btn-header" onClick={() => navigate("/cart")}>
                        ⬅ Back to Cart
                    </button>
                </div>
            </header>

            <div style={{ padding: "80px 20px 40px", maxWidth: "800px", margin: "0 auto" }}>
                <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Checkout</h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                    {/* Order Summary */}
                    <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", height: "fit-content" }}>
                        <h3>Order Summary</h3>
                        <div style={{ margin: "20px 0", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
                            <p>Items: {cart.length}</p>
                            <ul style={{ listStyle: "none", padding: 0, maxHeight: "200px", overflowY: "auto" }}>
                                {cart.map((item, index) => (
                                    <li key={index} style={{ display: "flex", justifyContent: "space-between", margin: "5px 0", fontSize: "0.9rem" }}>
                                        <span>{item.name}</span>
                                        <span>₹{item.price.toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <h3 style={{ textAlign: "right" }}>Total: ₹{total.toLocaleString()}</h3>
                    </div>

                    {/* Checkout Form */}
                    <div>
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <h3>Shipping Details</h3>
                            <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
                            <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
                            <input type="text" name="address" placeholder="Address" required value={formData.address} onChange={handleChange} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
                            <div style={{ display: "flex", gap: "10px" }}>
                                <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleChange} style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
                                <input type="text" name="zip" placeholder="ZIP Code" required value={formData.zip} onChange={handleChange} style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
                            </div>

                            <h3 style={{ marginTop: "20px" }}>Payment Method</h3>
                            <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
                                <label style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === "cod"}
                                        onChange={handleChange}
                                    />
                                    Cash on Delivery
                                </label>
                                <label style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        checked={formData.paymentMethod === "card"}
                                        onChange={handleChange}
                                    />
                                    Credit/Debit Card
                                </label>
                            </div>

                            {formData.paymentMethod === "card" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fdfdfd" }}>
                                    <input type="text" name="cardNumber" placeholder="Card Number" required value={formData.cardNumber} onChange={handleChange} maxLength="16" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <input type="text" name="expiry" placeholder="MM/YY" required value={formData.expiry} onChange={handleChange} maxLength="5" style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
                                        <input type="text" name="cvv" placeholder="CVV" required value={formData.cvv} onChange={handleChange} maxLength="3" style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
                                    </div>
                                </div>
                            )}

                            <button type="submit" className="btn-cart" style={{ marginTop: "20px", width: "100%", fontSize: "1.1rem" }}>
                                {formData.paymentMethod === "cod" ? "Place Order (COD)" : `Pay ₹${total.toLocaleString()}`}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
