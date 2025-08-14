"use client"
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react"
import { useNavigate } from "react-router-dom"

const CartView = ({ cartItems, setCartItems, onBack }) => {
  const navigate = useNavigate()

  const updateQuantity = (item, change) => {
    setCartItems((prev) => {
      const newQuantity = (prev[item] || 0) + change
      if (newQuantity <= 0) {
        const { [item]: removed, ...rest } = prev
        return rest
      }
      return { ...prev, [item]: newQuantity }
    })
  }

  const removeItem = (item) => {
    setCartItems((prev) => {
      const { [item]: removed, ...rest } = prev
      return rest
    })
  }

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0)
  }

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

  const getTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [item, quantity]) => {
      return total + getMockPrice(item) * quantity
    }, 0)
  }

  const handleCheckout = () => {
    if (Object.keys(cartItems).length === 0) {
      alert("Your cart is empty!")
      return
    }

    // Convert cartItems object to array format expected by CheckoutPage
    const cartArray = Object.entries(cartItems).map(([name, quantity]) => ({
      name,
      quantity,
      price: getMockPrice(name),
    }))

    navigate("/checkout")
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white p-4 px-6 shadow-sm flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-transparent border-none cursor-pointer rounded-lg flex items-center">
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <h1 className="text-2xl font-bold text-slate-800 m-0">Shopping Cart</h1>
      </header>

      <main className="p-5 max-w-4xl mx-auto">
        {Object.keys(cartItems).length === 0 ? (
          <div className="text-center p-15 bg-white rounded-2xl shadow-lg shadow-black/8">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-slate-600 mb-2">Your cart is empty</h2>
            <p className="text-base text-slate-400">Start scanning products to add them to your cart</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-white rounded-2xl shadow-lg shadow-black/8 mb-6">
              {Object.entries(cartItems).map(([item, quantity]) => (
                <div key={item} className="p-5 border-b border-slate-100 flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-slate-800 mb-1">{item}</h3>
                    <p className="text-sm text-green-600 font-semibold">₹{getMockPrice(item)} each</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item, -1)}
                        className="p-1 bg-slate-200 border-none rounded cursor-pointer flex items-center"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-base font-semibold min-w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(item, 1)}
                        className="p-1 bg-blue-600 text-white border-none rounded cursor-pointer flex items-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item)}
                      className="p-2 bg-red-50 text-red-600 border border-red-200 rounded-lg cursor-pointer flex items-center"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/8">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Order Summary</h3>

              <div className="flex justify-between mb-3">
                <span className="text-slate-600">Total Items:</span>
                <span className="font-semibold">{getTotalItems()}</span>
              </div>

              <div className="flex justify-between mb-5 pt-3 border-t border-slate-100">
                <span className="text-lg font-semibold text-slate-800">Total Amount:</span>
                <span className="text-lg font-bold text-green-600">₹{getTotalPrice()}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full p-4 text-base font-semibold bg-blue-600 text-white border-none rounded-xl cursor-pointer shadow-lg shadow-blue-600/30"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default CartView
