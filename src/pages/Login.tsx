"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import { assets } from "../assets/assets"
import { BACKEND_URL } from "../constants/backend"

// Use the regex directly in the validation function

const Login = () => {
  const navigate = useNavigate()

  const [state, setState] = useState<"Sign Up" | "Login">("Sign Up")
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const [showPasswordValidation, setShowPasswordValidation] = useState<boolean>(false)

  // Validate password and return array of error messages
  const validatePassword = (password: string): string[] => {
    const errors: string[] = []
    const hasLowercase = /[a-z]/.test(password)
    const hasUppercase = /[A-Z]/.test(password)
    const hasDigit = /\d/.test(password)
    const hasSpecial = /[\W_]/.test(password)
    const validLength = password.length >= 4 && password.length <= 30

    if (!validLength) {
      if (password.length < 4) {
        errors.push("Password must be at least 4 characters long")
      }
      if (password.length > 30) {
        errors.push("Password must be no more than 30 characters long")
      }
    }
    if (!hasLowercase) {
      errors.push("Password must contain at least one lowercase letter")
    }
    if (!hasUppercase) {
      errors.push("Password must contain at least one uppercase letter")
    }
    if (!hasDigit) {
      errors.push("Password must contain at least one number")
    }
    if (!hasSpecial) {
      errors.push("Password must contain at least one special character")
    }

    return errors
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)

    if (state === "Sign Up") {
      const errors = validatePassword(newPassword)
      setPasswordErrors(errors)
      setShowPasswordValidation(newPassword.length > 0)
    }
  }

  const isFormValid = () => {
    if (state === "Sign Up") {
      return name.trim() !== "" && email.trim() !== "" && password.trim() !== "" && passwordErrors.length === 0
    }
    return email.trim() !== "" && password.trim() !== ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Frontend validation
    if (state === "Sign Up" && passwordErrors.length > 0) {
      toast.error("Please fix password validation errors before submitting")
      return
    }

    setIsLoading(true)

    const payload =
      state === "Sign Up"
        ? {
            email,
            password,
            firstName: name,
          }
        : {
            email,
            password,
          }

    const url = state === "Sign Up" ? `${BACKEND_URL}/auth/signup` : `${BACKEND_URL}/auth/signin`

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(state === "Sign Up" ? "Account created successfully!" : "Logged in successfully!")

        if (state === "Sign Up") {
          navigate("/verify-otp", { state: { email } })
        } else if (state === "Login") {
          localStorage.setItem("access_token", data.access_token)
          navigate("/profile")
        }
      } else {
        // Handle different types of errors
        if (data.message && Array.isArray(data.message)) {
          // Backend validation errors (like password format)
          const errorMessages = data.message.join(", ")
          if (errorMessages.includes("password must match")) {
            toast.error("Password must contain: uppercase, lowercase, number, and special character (4-30 chars)")
          } else {
            toast.error(errorMessages)
          }
        } else if (data.message) {
          toast.error(data.message)
        } else {
          toast.error("Something went wrong. Please try again.")
        }
      }
    } catch (err) {
      console.log(err);
      
      toast.error("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <ToastContainer position="top-right" />
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up" ? "Create an account to get started." : "Login to your account."}
        </p>

        <form onSubmit={handleSubmit}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
              <img src={assets.person_icon || "/placeholder.svg"} alt="Person Icon" className="w-5 h-5" />
              <input
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
            <img src={assets.mail_icon || "/placeholder.svg"} alt="Mail Icon" className="w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              required
              className="bg-transparent outline-none w-full text-white placeholder-gray-400"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
              <img src={assets.lock_icon || "/placeholder.svg"} alt="Lock Icon" className="w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                onChange={handlePasswordChange}
                value={password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password validation feedback for Sign Up */}
            {state === "Sign Up" && showPasswordValidation && (
              <div className="mt-2 px-3">
                {passwordErrors.length > 0 ? (
                  <div className="space-y-1">
                    {passwordErrors.map((error, index) => (
                      <div key={index} className="flex items-center gap-2 text-red-400 text-xs">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-400 text-xs">
                    <div className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0"></div>
                    <span>Password meets all requirements</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer hover:text-indigo-400 transition-colors"
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-600 hover:to-indigo-800 transition-all"
            disabled={isLoading || !isFormValid()}
          >
            {isLoading ? "Processing..." : state}
          </button>
        </form>

        <p className="text-gray-400 text-center text-xs mt-4">
          {state === "Sign Up" ? "Already have an Account? " : "Don't have an Account? "}
          <span
            onClick={() => {
              setState(state === "Sign Up" ? "Login" : "Sign Up")
              setPasswordErrors([])
              setShowPasswordValidation(false)
              setPassword("")
            }}
            className="text-blue-400 cursor-pointer underline hover:text-blue-300 transition-colors"
          >
            {state === "Sign Up" ? "Login Here" : "Sign Up Here"}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
