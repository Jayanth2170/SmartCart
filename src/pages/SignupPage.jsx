"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignupPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMatch, setPasswordMatch] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordMatch(false)
      return
    }
    setPasswordMatch(true)
    console.log("Signup attempt with:", { name, email, password })
    navigate("/home")
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200 font-sans">
      <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-lg shadow-black/8 transition-transform duration-300 m-5">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">Create Account</h2>
          <p className="text-sm text-gray-600">Join SmartShop AI today</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full p-3.5 text-base rounded-lg border border-gray-300 bg-gray-50 outline-none box-border transition-all duration-200 focus:border-blue-700 focus:bg-white"
            />
          </div>

          {/* Email Field */}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3.5 text-base rounded-lg border border-gray-300 bg-gray-50 outline-none box-border transition-all duration-200 focus:border-blue-700 focus:bg-white"
            />
          </div>

          {/* Password Field */}
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              className="w-full p-3.5 text-base rounded-lg border border-gray-300 bg-gray-50 outline-none box-border transition-all duration-200 focus:border-blue-700 focus:bg-white"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className={`w-full p-3.5 text-base rounded-lg border bg-gray-50 outline-none box-border transition-all duration-200 focus:bg-white ${
                !passwordMatch ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-700"
              }`}
            />
            {!passwordMatch && <p className="text-red-500 text-sm mt-1">Passwords do not match</p>}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full p-3.5 text-base font-semibold text-white bg-blue-700 border-none rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-800"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-700 no-underline font-semibold transition-colors duration-200 bg-none border-none cursor-pointer hover:text-blue-800"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
