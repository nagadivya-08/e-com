import React, { createContext, useState, useContext } from "react";

const AddressContext = createContext();

export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
    const [addresses, setAddresses] = useState([
        { id: 1, name: "Home", street: "123 Main St", city: "Hyderabad", zip: "500081", state: "Telangana" }
    ]);

    const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

    const addAddress = (newAddress) => {
        const addressWithId = { ...newAddress, id: Date.now() };
        setAddresses([...addresses, addressWithId]);
        // Auto-select if it's the only one (or user preference logic could go here)
        if (addresses.length === 0) setSelectedAddress(addressWithId);
    };

    const removeAddress = (id) => {
        const updatedAddresses = addresses.filter(addr => addr.id !== id);
        setAddresses(updatedAddresses);
        if (selectedAddress && selectedAddress.id === id) {
            setSelectedAddress(updatedAddresses.length > 0 ? updatedAddresses[0] : null);
        }
    };

    const selectAddress = (id) => {
        const address = addresses.find(addr => addr.id === id);
        if (address) setSelectedAddress(address);
    };

    return (
        <AddressContext.Provider value={{ addresses, selectedAddress, addAddress, removeAddress, selectAddress }}>
            {children}
        </AddressContext.Provider>
    );
};
