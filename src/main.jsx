import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { AddressProvider } from "./context/AddressContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WishlistProvider>
      <CartProvider>
        <OrderProvider>
          <AddressProvider>
            <App />
          </AddressProvider>
        </OrderProvider>
      </CartProvider>
    </WishlistProvider>
  </BrowserRouter>
);

