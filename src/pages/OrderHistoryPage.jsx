"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Package, Calendar, CreditCard, Eye, RotateCcw } from "lucide-react"

const OrderHistoryPage = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory") || "[]")
    setOrders(orderHistory)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "upi": return "📱"
      case "paytm": return "💙"
      case "phonepe": return "💜"
      case "gpay": return "🔵"
      case "card": return "💳"
      case "netbanking": return "🏦"
      default: return "💳"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true
    return order.status === filter
  })

  const reorderItems = (order) => {
    localStorage.setItem("reorderItems", JSON.stringify(order.items))
    localStorage.setItem("reorderUserDetails", JSON.stringify(order.userDetails))
    navigate("/checkout?reorder=true")
  }

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Order Details</h1>

          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 space-y-2 sm:space-y-0">
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Order #{selectedOrder.id}</h2>
                <p className="text-sm text-gray-500">{formatDate(selectedOrder.timestamp)}</p>
              </div>
              <span
                className={`self-start px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(selectedOrder.status)}`}
              >
                {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
              </span>
            </div>

            {/* Customer & Payment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Customer Details</h3>
                <div className="space-y-1">
                  <p className="text-gray-700 text-sm sm:text-base truncate">{selectedOrder.userDetails.name}</p>
                  <p className="text-gray-600 text-xs sm:text-sm truncate">{selectedOrder.userDetails.email}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{selectedOrder.userDetails.phone}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Payment Method</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getPaymentMethodIcon(selectedOrder.paymentMethod)}</span>
                  <span className="text-gray-700 capitalize text-sm sm:text-base">{selectedOrder.paymentMethod}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Order Items</h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 border border-gray-200 rounded-lg space-y-2 sm:space-y-0"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{item.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-medium text-gray-900 text-sm sm:text-base">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">₹{item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center text-lg sm:text-xl font-bold text-gray-900">
                <span>Total Amount</span>
                <span>₹{selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => reorderItems(selectedOrder)}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RotateCcw size={16} />
                <span>Purchase Again</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main Purchase History list
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Purchase History</h1>

        <div className="bg-white rounded-xl shadow-sm border p-2 mb-6">
          <div className="grid grid-cols-2 sm:flex sm:space-x-1 gap-1 sm:gap-0">
            {[{ key: "all", label: "All" },
              { key: "completed", label: "Completed" },
              { key: "pending", label: "Pending" },
              { key: "cancelled", label: "Cancelled" }].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-3 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                  filter === tab.key ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-8 sm:p-12 text-center">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No Orders Found</h2>
            <p className="text-sm sm:text-base text-gray-500 mb-6">
              {filter === "all"
                ? "You haven't placed any orders yet. Start shopping to see your purchase history!"
                : `No ${filter} orders found.`}
            </p>
            <button
              onClick={() => navigate("/home")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-500 mt-1 space-y-1 sm:space-y-0">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1 flex-shrink-0" />
                        <span className="truncate">{formatDate(order.timestamp)}</span>
                      </span>
                      <span className="flex items-center">
                        <CreditCard size={14} className="mr-1 flex-shrink-0" />
                        <span>
                          {getPaymentMethodIcon(order.paymentMethod)} {order.paymentMethod.toUpperCase()}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <p className="text-lg font-bold text-gray-900 mt-2">₹{order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {order.items.slice(0, 2).map((item, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded truncate max-w-32 sm:max-w-none"
                      >
                        {item.name} x{item.quantity}
                      </span>
                    ))}
                    {order.items.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{order.items.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={() => reorderItems(order)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <RotateCcw size={16} />
                    <span>Purchase Again</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderHistoryPage
