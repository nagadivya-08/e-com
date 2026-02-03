import React, { createContext, useState, useContext } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((item) => item.name === product.name)
        ? prev.filter((item) => item.name !== product.name)
        : [...prev, product]
    );
  };

  const removeFromWishlist = (productName) => {
    setWishlist((prev) => prev.filter((item) => item.name !== productName));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
