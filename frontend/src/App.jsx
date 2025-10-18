import React from "react";
import Home from "./pages/Home.jsx";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from "./pages/ProductDetails.jsx";
import Products from "./pages/Products.jsx";
import Register from "./User/Register.jsx";
import Login from "./User/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
