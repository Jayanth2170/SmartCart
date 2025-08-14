"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import CameraView from "../components/homepage/CameraView.jsx"
import DetectionResults from "../components/homepage/DetectionResults.jsx"
import CartView from "../components/homepage/CartView.jsx"
import { ShoppingCart } from "lucide-react"

const HomePage = ({ cartItems, setCartItems }) => {
  const [isScanning, setIsScanning] = useState(false)
  const [detectedLabel, setDetectedLabel] = useState("Click Scan to Shop")
  const [isDetected, setIsDetected] = useState(false)
  const [latencyMs, setLatencyMs] = useState(0)
  const [showCart, setShowCart] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.showCart) {
      setShowCart(true)
    }
  }, [location.state])

  const handleStartScanning = () => {
    setIsScanning(true)
    setDetectedLabel("Detecting...")
    setIsDetected(false)
  }

  const handleStopScanning = () => {
    setIsScanning(false)
    setDetectedLabel("Click Scan to Shop")
    setIsDetected(false)
    setLatencyMs(0)
  }

  const handleAddToCart = () => {
    if (isDetected && detectedLabel.startsWith("Detected: ")) {
      const item = detectedLabel.replace("Detected: ", "").trim()
      setCartItems((prev) => ({
        ...prev,
        [item]: (prev[item] || 0) + 1,
      }))
      console.log(`Added ${item} to cart`)
    }
  }

  if (showCart) {
    return <CartView cartItems={cartItems} setCartItems={setCartItems} onBack={() => setShowCart(false)} />
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col pb-20">
      {/* Header */}
      <header className="bg-white p-4 px-6 shadow-sm flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-600 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          SmartShop AI
        </div>
        <div className="flex gap-3 items-center">
          {/* Only Shopping Cart button remains */}
          <button
            onClick={() => setShowCart(true)}
            className="p-2 bg-blue-600 text-white border-none rounded-lg cursor-pointer flex items-center gap-1"
          >
            <ShoppingCart size={20} />
            {Object.keys(cartItems).length > 0 && (
              <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                {Object.values(cartItems).reduce((sum, count) => sum + count, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex-grow p-5 max-w-4xl mx-auto w-full">
        {/* Welcome Section */}
        <section className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl text-center mb-8 border border-sky-100">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">AI-Powered Shopping</h1>
          <p className="text-base text-slate-600 mb-5">Scan products instantly </p>

          {latencyMs > 0 && isScanning && (
            <div className="text-sm text-slate-600 font-medium mb-4">Latency: {latencyMs} ms</div>
          )}

          {!isScanning ? (
            <button
              onClick={handleStartScanning}
              className="px-7 py-3.5 text-base font-semibold bg-blue-600 text-white border-none rounded-xl cursor-pointer shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-blue-700 hover:-translate-y-0.5"
            >
              🎯 Start Scanning
            </button>
          ) : (
            <button
              onClick={handleStopScanning}
              className="px-7 py-3.5 text-base font-semibold bg-red-600 text-white border-none rounded-xl cursor-pointer shadow-lg shadow-red-600/30"
            >
              ⏹️ Stop Scanning
            </button>
          )}
        </section>

        {isScanning && (
          <section className="bg-white rounded-2xl p-6 shadow-lg shadow-black/8 mb-6">
            <CameraView
              isScanning={isScanning}
              onDetection={setDetectedLabel}
              onDetectionStatus={setIsDetected}
              onLatencyUpdate={setLatencyMs}
            />
          </section>
        )}

        {/* Detection Results */}
        <DetectionResults detectedLabel={detectedLabel} isDetected={isDetected} onAddToCart={handleAddToCart} />

        <section className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-5 rounded-xl text-center shadow-sm shadow-black/6">
            <div className="text-2xl font-bold text-blue-600">{Object.keys(cartItems).length}</div>
            <div className="text-sm text-slate-600">Items Types</div>
          </div>
          <div className="bg-white p-5 rounded-xl text-center shadow-sm shadow-black/6">
            <div className="text-2xl font-bold text-green-600">
              {Object.values(cartItems).reduce((sum, count) => sum + count, 0)}
            </div>
            <div className="text-sm text-slate-600">Total Items</div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
