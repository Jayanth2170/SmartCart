"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User, Mail, Phone, Edit3, Save, X } from "lucide-react"

const ProfilePage = () => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    joinDate: "",
    totalOrders: 0,
    totalSpent: 0,
  })
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile")
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory") || "[]")

    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      setUserProfile(profile)
      setEditForm({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      })
    } else {
      const defaultProfile = {
        name: "Smart Shopper",
        email: "user@smartshop.com",
        phone: "+91 9876543210",
        joinDate: new Date().toISOString().split("T")[0],
        totalOrders: orderHistory.length,
        totalSpent: orderHistory.reduce((sum, order) => sum + order.total, 0),
      }
      setUserProfile(defaultProfile)
      setEditForm({
        name: defaultProfile.name,
        email: defaultProfile.email,
        phone: defaultProfile.phone,
      })
      localStorage.setItem("userProfile", JSON.stringify(defaultProfile))
    }
  }, [])

  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    const updatedProfile = { ...userProfile, ...editForm }
    setUserProfile(updatedProfile)
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
    })
    setIsEditing(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("userProfile")
    localStorage.removeItem("orderHistory")
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-8 mb-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={32} className="text-blue-600" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{userProfile.name}</h2>
                <p className="text-gray-500 text-sm">Member since {userProfile.joinDate}</p>
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Edit3 size={16} />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <Save size={14} />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  <X size={14} />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="inline mr-2" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 break-words">{userProfile.name}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 break-all">{userProfile.email}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{userProfile.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{userProfile.totalOrders}</div>
            <div className="text-gray-600 text-sm">Total Orders</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
              ₹{userProfile.totalSpent.toFixed(2)}
            </div>
            <div className="text-gray-600 text-sm">Total Spent</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">
              ₹{userProfile.totalOrders > 0 ? (userProfile.totalSpent / userProfile.totalOrders).toFixed(2) : "0.00"}
            </div>
            <div className="text-gray-600 text-sm">Avg Order Value</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/orders")}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="font-medium text-gray-900">View Purchase History</div>
              <div className="text-sm text-gray-500">See all your past orders</div>
            </button>
            <button
              onClick={() => navigate("/home")}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="font-medium text-gray-900">Start Shopping</div>
              <div className="text-sm text-gray-500">Scan products with AI</div>
            </button>
          </div>
        </div>

        {/* Logout Section */}
        <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

