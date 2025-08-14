"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import CheckoutPage from "./pages/CheckoutPage"
import ProfilePage from "./pages/ProfilePage"
import OrderHistoryPage from "./pages/OrderHistoryPage"
import BottomNavigation from "./components/navigation/BottomNavigation"

function App() {
  const [cartItems, setCartItems] = useState({})

  const showBottomNav = (pathname) => {
    return !["/login", "/signup", "/checkout"].includes(pathname)
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>

        <Routes>
          <Route path="/home" element={<BottomNavigation />} />
          <Route path="/profile" element={<BottomNavigation />} />
          <Route path="/orders" element={<BottomNavigation />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
