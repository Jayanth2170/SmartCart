"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const PaymentMethods = ({ selectedPayment, onPaymentSelect, onPaymentProcess }) => {
  const navigate = useNavigate()
  const [cardDetails, setCardDetails] = useState({
    cardType: "",
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [upiId, setUpiId] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [selectedUpiApp, setSelectedUpiApp] = useState("")

  const cardTypes = [
    { id: "visa", name: "Visa", color: "bg-blue-600" },
    { id: "mastercard", name: "Mastercard", color: "bg-red-600" },
    { id: "rupay", name: "RuPay", color: "bg-green-600" },
    { id: "amex", name: "Amex", color: "bg-gray-600" },
  ]

  const upiApps = [
    {
      id: "phonepe",
      name: "PhonePe",
      icon: (
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl sm:rounded-2xl flex items-center justify-center">
          <span className="text-white font-bold text-sm sm:text-lg">Pe</span>
        </div>
      ),
      color: "purple",
    },
    {
      id: "paytm",
      name: "Paytm",
      icon: (
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl sm:rounded-2xl flex items-center justify-center">
          <span className="text-white font-bold text-sm sm:text-lg">Pt</span>
        </div>
      ),
      color: "blue",
    },
    {
      id: "gpay",
      name: "Google Pay",
      icon: (
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
          <span className="text-white font-bold text-sm sm:text-lg">G</span>
        </div>
      ),
      color: "green",
    },
  ]

  const popularBanks = [
    { name: "SBI", fullName: "State Bank of India" },
    { name: "HDFC", fullName: "HDFC Bank" },
    { name: "ICICI", fullName: "ICICI Bank" },
    { name: "AXIS", fullName: "Axis Bank" },
    { name: "KOTAK", fullName: "Kotak Bank" },
    { name: "PNB", fullName: "Punjab National Bank" },
  ]

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI",
      icon: (
        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      ),
      description: "Pay using any UPI app",
      recommended: true,
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: (
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
          </svg>
        </div>
      ),
      description: "Visa, Mastercard, RuPay, Amex",
      recommended: false,
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: (
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 5.5C5 4.67 5.67 4 6.5 4h11c.83 0 1.5.67 1.5 1.5S18.33 7 17.5 7h-11C5.67 7 5 6.33 5 5.5zM6.5 9h11c.83 0 1.5.67 1.5 1.5S18.33 12 17.5 12h-11C5.67 12 5 11.33 5 10.5S5.67 9 6.5 9zM5 15.5C5 14.67 5.67 14 6.5 14h11c.83 0 1.5.67 1.5 1.5S18.33 17 17.5 17h-11C5.67 17 5 16.33 5 15.5z" />
          </svg>
        </div>
      ),
      description: "All major banks supported",
      recommended: false,
    },
  ]

  const handleCardInputChange = (field, value) => {
    if (field === "number") {
      value = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      if (value.length > 19) return
    }
    if (field === "expiry") {
      value = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
      if (value.length > 5) return
    }
    if (field === "cvv") {
      value = value.replace(/\D/g, "")
      if (value.length > 4) return
    }
    setCardDetails((prev) => ({ ...prev, [field]: value }))
  }

  const handlePaymentProcess = () => {
    if (selectedPayment === "phonepe") {
      window.open("https://www.phonepe.com/", "_blank")
    } else if (selectedPayment === "paytm") {
      window.open("https://paytm.com/", "_blank")
    } else if (selectedPayment === "gpay") {
      window.open("https://pay.google.com/", "_blank")
    } else if (selectedPayment === "netbanking" && selectedBank) {
      // Simulate bank redirect
      window.open("https://www.onlinesbi.com/", "_blank")
    }
    onPaymentProcess()
  }

  const renderPaymentForm = () => {
    switch (selectedPayment) {
      case "upi":
        return (
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Choose UPI App</h4>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {upiApps.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => {
                      setSelectedUpiApp(app.id)
                      onPaymentSelect(app.id)
                    }}
                    className={`p-3 sm:p-4 border-2 rounded-xl sm:rounded-2xl cursor-pointer transition-all text-center ${
                      selectedUpiApp === app.id
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                      {app.icon}
                      <span className="font-medium text-gray-900 text-xs sm:text-sm">{app.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedUpiApp && (
              <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border border-blue-200">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Open {upiApps.find((app) => app.id === selectedUpiApp)?.name}
                  </h4>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    You will be redirected to complete the payment securely
                  </p>
                  <button
                    onClick={handlePaymentProcess}
                    className="px-6 sm:px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  >
                    Continue to {upiApps.find((app) => app.id === selectedUpiApp)?.name}
                  </button>
                </div>
              </div>
            )}
          </div>
        )

      case "card":
        return (
          <div className="mt-6 p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Enter Card Details</h4>

            {/* Card Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Card Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {cardTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setCardDetails((prev) => ({ ...prev, cardType: type.id }))}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                      cardDetails.cardType === type.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-8 h-5 ${type.color} rounded text-white text-xs flex items-center justify-center font-bold mx-auto mb-2`}
                    >
                      {type.name.slice(0, 4).toUpperCase()}
                    </div>
                    <span className="text-xs font-medium text-gray-900">{type.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {cardDetails.cardType && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={(e) => handleCardInputChange("number", e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardDetails.name}
                    onChange={(e) => handleCardInputChange("name", e.target.value)}
                    placeholder="Name as on card"
                    className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => handleCardInputChange("expiry", e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      type="password"
                      value={cardDetails.cvv}
                      onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                      placeholder="123"
                      className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                    </svg>
                    <div>
                      <p className="font-medium text-green-800">Secure Payment</p>
                      <p className="text-sm text-green-600">Your card details are encrypted and secure</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case "netbanking":
        return (
          <div className="mt-6 p-4 sm:p-6 bg-green-50 rounded-xl sm:rounded-2xl border border-green-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Select Your Bank</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {popularBanks.map((bank) => (
                <div
                  key={bank.name}
                  onClick={() => setSelectedBank(bank.fullName)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedBank === bank.fullName
                      ? "border-green-500 bg-white shadow-lg"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">{bank.name}</span>
                    </div>
                    <span className="font-medium text-gray-900 text-sm sm:text-base">{bank.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {selectedBank && (
              <div className="mt-6 text-center">
                <button
                  onClick={handlePaymentProcess}
                  className="px-6 sm:px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-sm sm:text-base"
                >
                  Continue to {selectedBank.split(" ")[0]}
                </button>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Choose Payment Method</h2>
          <div className="flex items-center space-x-2 text-blue-100">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
            <span className="text-sm font-medium">Secure</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => onPaymentSelect(method.id)}
              className={`p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                selectedPayment === method.id
                  ? "border-blue-500 bg-blue-50 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {method.icon}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{method.name}</h4>
                      {method.recommended && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPayment === method.id ? "border-blue-500 bg-blue-500" : "border-gray-300"
                  }`}
                >
                  {selectedPayment === method.id && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Form */}
        {renderPaymentForm()}
      </div>
    </div>
  )
}

export default PaymentMethods
