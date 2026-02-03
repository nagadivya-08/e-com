import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddress } from "../context/AddressContext";
import "../app.css";

function Addresses() {
    const navigate = useNavigate();
    const { addresses, selectedAddress, addAddress, removeAddress, selectAddress } = useAddress();

    const [isAdding, setIsAdding] = useState(false);
    const [newAddress, setNewAddress] = useState({ name: "", street: "", city: "", zip: "", state: "" });

    const handleSave = (e) => {
        e.preventDefault();
        if (!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.zip) {
            alert("Please fill all required fields.");
            return;
        }
        addAddress(newAddress);
        setIsAdding(false);
        setNewAddress({ name: "", street: "", city: "", zip: "", state: "" });
    };

    return (
        <div className="home-page">
            <header className="home-header">
                <div className="home-title" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>ShopEase</div>
                <div className="home-actions">
                    <button className="btn-header" onClick={() => navigate("/home")}>
                        🏠 Home
                    </button>
                    <button className="btn-header" onClick={() => navigate("/profile")}>
                        👤 Profile
                    </button>
                </div>
            </header>

            <div style={{ padding: "80px 20px 40px", maxWidth: "800px", margin: "0 auto" }}>
                <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Manage Addresses</h2>

                <button
                    className="btn-cart"
                    onClick={() => setIsAdding(!isAdding)}
                    style={{ marginBottom: "20px", display: "block", marginLeft: "auto" }}
                >
                    {isAdding ? "Cancel" : "+ Add New Address"}
                </button>

                {isAdding && (
                    <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", marginBottom: "30px", border: "1px solid #ddd" }}>
                        <h3 style={{ marginBottom: "15px" }}>Add New Address</h3>
                        <form onSubmit={handleSave} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                            <input type="text" placeholder="Location Name (e.g. Home, Work)" value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} style={inputStyle} required />
                            <input type="text" placeholder="Street Address" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} style={inputStyle} required />
                            <input type="text" placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} style={inputStyle} required />
                            <input type="text" placeholder="Zip Code" value={newAddress.zip} onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })} style={inputStyle} required />
                            <input type="text" placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} style={inputStyle} required />

                            <button type="submit" className="btn-cart" style={{ gridColumn: "span 2", marginTop: "10px" }}>Save Address</button>
                        </form>
                    </div>
                )}

                <div style={{ display: "grid", gap: "20px" }}>
                    {addresses.map((addr) => (
                        <div key={addr.id} style={{
                            border: selectedAddress?.id === addr.id ? "2px solid #007bff" : "1px solid #ddd",
                            padding: "20px",
                            borderRadius: "8px",
                            backgroundColor: selectedAddress?.id === addr.id ? "#f0f8ff" : "white",
                            position: "relative"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                <h4 style={{ margin: 0 }}>📍 {addr.name}</h4>
                                {selectedAddress?.id === addr.id && <span style={{ color: "#007bff", fontWeight: "bold", fontSize: "0.9rem" }}>SELECTED</span>}
                            </div>
                            <p style={{ margin: "5px 0", color: "#555" }}>{addr.street}, {addr.city}, {addr.state} - {addr.zip}</p>

                            <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                                {selectedAddress?.id !== addr.id && (
                                    <button onClick={() => selectAddress(addr.id)} style={actionBtnStyle}>Select</button>
                                )}
                                <button onClick={() => removeAddress(addr.id)} style={{ ...actionBtnStyle, color: "red", borderColor: "red" }}>Remove</button>
                            </div>
                        </div>
                    ))}

                    {addresses.length === 0 && <p style={{ textAlign: "center", color: "#666" }}>No addresses saved. Add one above!</p>}
                </div>
            </div>
        </div>
    );
}

const inputStyle = {
    padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%"
};

const actionBtnStyle = {
    padding: "8px 15px", borderRadius: "5px", border: "1px solid #ccc", background: "white", cursor: "pointer"
};

export default Addresses;
