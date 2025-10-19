import React, { useEffect } from "react";
import Home from "./pages/Home.jsx";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from "./pages/ProductDetails.jsx";
import Products from "./pages/Products.jsx";
import Register from "./User/Register.jsx";
import Login from "./User/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/user/userSlice.js";
import UserDashboard from "./User/UserDashboard.jsx";
import Profile from "./User/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UpdateProfile from "./User/UpdateProfile.jsx";
import UpdatePassword from "./User/UpdatePassword.jsx";
import ForgotPassword from "./User/ForgotPassword.jsx";
import ResetPassword from "./User/ResetPassword.jsx";

function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch])
  console.log(isAuthenticated, user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/profile/update" element={<ProtectedRoute element={<UpdateProfile />} />} />
        <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword />} />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
      </Routes>
      {isAuthenticated && <UserDashboard user={user} />}
    </Router>
  )
}

export default App
