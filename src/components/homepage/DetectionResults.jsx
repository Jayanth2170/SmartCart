"use client"

const DetectionResults = ({ detectedLabel, isDetected, onAddToCart }) => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-lg shadow-black/8 text-center mb-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Detection Results</h3>

      <div
        className={`p-5 rounded-xl border-2 mb-5 ${
          isDetected ? "bg-green-50 border-green-600" : "bg-red-50 border-red-200"
        }`}
      >
        <div className={`text-xl font-semibold mb-2 ${isDetected ? "text-green-600" : "text-red-600"}`}>
          {detectedLabel}
        </div>

        {isDetected && <div className="text-sm text-green-600 font-medium">✅ Product identified successfully</div>}

        {detectedLabel === "Detecting..." && (
          <div className="text-sm text-amber-500 font-medium">🔍 Analyzing object...</div>
        )}

        {detectedLabel === "No object detected" && (
          <div className="text-sm text-red-600 font-medium">❌ No product found</div>
        )}
      </div>

      {isDetected && detectedLabel.startsWith("Detected: ") && (
        <button
          onClick={onAddToCart}
          className="px-6 py-3 text-base font-semibold bg-green-600 text-white border-none rounded-xl cursor-pointer shadow-lg shadow-green-600/30 transition-all duration-200 hover:bg-green-700 hover:-translate-y-0.5"
        >
          🛒 Add to Cart
        </button>
      )}
    </section>
  )
}

export default DetectionResults
