import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login ";
import Register from "./pages/register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import OrderTracking from "./pages/OrderTracking";
import OrderFeedback from "./pages/OrderFeedback";
import Addresses from "./pages/Addresses";
import CancelOrder from "./pages/CancelOrder";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />


      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/track-order/:orderId" element={<OrderTracking />} />
      <Route path="/feedback/:orderId" element={<OrderFeedback />} />
      <Route path="/addresses" element={<Addresses />} />
      <Route path="/cancel-order/:orderId" element={<CancelOrder />} />
    </Routes>
  );
}

export default App;
