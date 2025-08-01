import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile"
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:categoryName" element={<Category />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
       <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route
        path="*"
        element={
          <div className="text-center mt-20 text-xl">404 - Page Not Found</div>
        }
      />
    </Routes>
  );
}
