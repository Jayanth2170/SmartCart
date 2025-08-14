"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PaymentMethods from "../components/payment/PaymentMethods"

const CheckoutPage = ({ cartItems = {}, setCartItems }) => {
  const navigate = useNavigate()
  const [selectedPayment, setSelectedPayment] = useState("")
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      setUserDetails({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      })
    }
  }, [])

  useEffect(() => {
    if (Object.keys(cartItems).length === 0) {
      alert("Your cart is empty! Please add items before checkout.")
      navigate("/home")
    }
  }, [cartItems, navigate])

  const getMockPrice = (item) => {
    const prices = {
      "Dark Fantasy": 45,
      Maggie: 12,
      "TATA Salt": 20,
      Colgate: 85,
      "Dove Soap": 65,
      Nescafe: 120,
      "Marie Gold": 25,
      Lays: 20,
    }

    const matchedKey = Object.keys(prices).find((key) => item.toLowerCase().includes(key.toLowerCase()))
    return prices[matchedKey] || Math.floor(Math.random() * 100) + 20
  }

  const cartArray = Object.entries(cartItems).map(([name, quantity]) => ({
    name,
    quantity,
    price: getMockPrice(name),
  }))

  const totalAmount = cartArray.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleInputChange = (field, value) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }))
  }

  const updateUserProfile = (orderData) => {
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      const updatedProfile = {
        ...profile,
        name: orderData.userDetails.name,
        email: orderData.userDetails.email,
        phone: orderData.userDetails.phone,
        totalOrders: (profile.totalOrders || 0) + 1,
        totalSpent: (profile.totalSpent || 0) + orderData.total,
      }
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile))
    }
  }

  const handlePayment = async () => {
    if (!selectedPayment || !userDetails.name || !userDetails.email || !userDetails.phone) {
      alert("Please fill all details and select a payment method")
      return
    }

    if (Object.keys(cartItems).length === 0) {
      alert("Your cart is empty!")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing with different methods
    const processingTime = selectedPayment === "card" ? 3000 : 2000

    setTimeout(() => {
      const order = {
        id: Date.now(),
        items: cartArray,
        total: totalAmount,
        paymentMethod: selectedPayment,
        userDetails,
        timestamp: new Date().toISOString(),
        status: "completed",
      }

      // Save to order history
      const existingOrders = JSON.parse(localStorage.getItem("orderHistory") || "[]")
      localStorage.setItem("orderHistory", JSON.stringify([order, ...existingOrders]))

      updateUserProfile(order)

      // Clear cart
      setCartItems({})
      setIsProcessing(false)

      alert(`Payment successful via ${selectedPayment.toUpperCase()}! Order #${order.id} placed successfully.`)
      navigate("/order-history")
    }, processingTime)
  }

  if (Object.keys(cartItems).length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold text-gray-600">Redirecting...</h2>
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Shopping
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
          <div className="w-32"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - User Details & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Details */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={userDetails.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={userDetails.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={userDetails.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <PaymentMethods
              selectedPayment={selectedPayment}
              onPaymentSelect={setSelectedPayment}
              onPaymentProcess={handlePayment}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-4">
                {cartArray.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-2 py-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing || Object.keys(cartItems).length === 0}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
                  isProcessing || Object.keys(cartItems).length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Pay ₹${totalAmount.toFixed(2)}`
                )}
              </button>

              {/* Security Badge */}
              <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <span>🔒</span>
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
