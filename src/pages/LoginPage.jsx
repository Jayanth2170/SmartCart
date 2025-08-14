"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt with:", { email, password })
    navigate("/home")
  }

  const handleGoogleLogin = () => {
    console.log("Google login clicked")
    // Google OAuth flow goes here
    navigate("/home")
  }

  const isMobile = window.innerWidth <= 768

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    background: "linear-gradient(120deg, #0A66C2 0%, #004182 100%)",
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: "#fff",
  }

  const heroStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: isMobile ? "center" : "flex-start",
    padding: isMobile ? "40px 20px" : "80px",
    textAlign: isMobile ? "center" : "left",
    background: "rgba(0,0,0,0.1)",
  }

  const heroTitle = {
    fontSize: isMobile ? "28px" : "42px",
    fontWeight: "700",
    marginBottom: "20px",
    lineHeight: "1.2",
  }

  const heroSubtitle = {
    fontSize: isMobile ? "16px" : "20px",
    maxWidth: "500px",
    opacity: 0.9,
  }

  const cardWrapper = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: isMobile ? "20px" : "60px",
    background: isMobile ? "transparent" : "#f8f9fa",
  }

  const cardStyle = {
    width: "100%",
    maxWidth: "420px",
    padding: isMobile ? "24px" : "40px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.12)",
    color: "#000",
  }

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  }

  const buttonPrimary = {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#0A66C2",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  }

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <div style={heroStyle}>
        <h1 style={heroTitle}>Smart Shopping, Made Simple</h1>
        <p style={heroSubtitle}>Scan, shop, and check out in seconds.</p>
      </div>

      {/* Login Section */}
      <div style={cardWrapper}>
        <div style={cardStyle}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h2
              style={{
                fontSize: "26px",
                fontWeight: "700",
                color: "#0A66C2",
                marginBottom: "8px",
              }}
            >
              Welcome Back
            </h2>
            <p style={{ fontSize: "15px", color: "#555" }}>Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#333",
                }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "#0A66C2"
                  e.target.style.backgroundColor = "#fff"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#ccc"
                  e.target.style.backgroundColor = "#f9f9f9"
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "25px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <label
                  htmlFor="password"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  Password
                </label>
                <a
                  href="#"
                  style={{
                    fontSize: "13px",
                    color: "#0A66C2",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  Forgot Password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "#0A66C2"
                  e.target.style.backgroundColor = "#fff"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#ccc"
                  e.target.style.backgroundColor = "#f9f9f9"
                }}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              style={buttonPrimary}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#094f99"
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#0A66C2"
              }}
            >
              Login
            </button>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                margin: "20px 0",
              }}
            >
              <div style={{ flex: 1, height: "1px", backgroundColor: "#ddd" }} />
              <span
                style={{
                  padding: "0 10px",
                  fontSize: "14px",
                  color: "#888",
                  fontWeight: "500",
                }}
              >
                OR
              </span>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#ddd" }} />
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "15px",
                fontWeight: "500",
                color: "#444",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "all 0.2s ease",
              }}
              onClick={handleGoogleLogin}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
            >
              <img
                style={{ width: "20px", height: "20px" }}
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
              />
              Continue with Google
            </button>

            {/* Sign Up */}
            <div
              style={{
                textAlign: "center",
                fontSize: "14px",
                color: "#666",
                marginTop: "16px",
              }}
            >
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                style={{
                  color: "#0A66C2",
                  textDecoration: "none",
                  fontWeight: "600",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
