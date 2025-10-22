"use client"

import { useState } from "react"
import { Building, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, LayoutDashboard, Workflow, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Handle login logic here
      console.log("Login attempt:", formData)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex">
      {/* Left Section - Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/login image.png" 
            alt="Property Management Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center text-white p-12 h-full w-full">
          {/* Logo */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="p-4 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
              <Building size={40} className="text-white drop-shadow-lg" />
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
              Havenly Pro
            </h1>
          </div>

          {/* Tagline */}
          <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-xl">
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Smart Property Management, Simplified.
            </span>
          </h2>
          <p className="text-white/95 text-xl max-w-lg leading-relaxed mb-12 text-center drop-shadow-lg font-medium">
            Streamline your property operations with our comprehensive management platform designed for modern real estate professionals.
          </p>

          {/* Features List */}
          <div className="space-y-6 text-center">
            <div className="flex items-center justify-center gap-4 text-white/95 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 shadow-lg">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
                <LayoutDashboard size={24} className="text-blue-300" />
              </div>
              <span className="text-lg font-semibold">Centralized Dashboard</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-white/95 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 shadow-lg">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
                <Workflow size={24} className="text-blue-300" />
              </div>
              <span className="text-lg font-semibold">Automated Workflows</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-white/95 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 shadow-lg">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
                <BarChart3 size={24} className="text-blue-300" />
              </div>
              <span className="text-lg font-semibold">Real-time Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 bg-slate-900 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Form Container */}
          <div className="bg-slate-800 rounded-2xl p-8 animate-slide-up">
            {/* Header */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <div className="flex items-center justify-center gap-3 mb-4 hover:opacity-80 transition-opacity duration-200">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                    <Building size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">Havenly Pro</h1>
                    <p className="text-sm text-blue-400 font-medium">Smart Property Management</p>
                  </div>
                </div>
              </Link>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">Please sign in to continue</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle size={20} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Login as
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 text-white bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                >
                  <option value="">Select Role</option>
                  <option value="property-owner">Property Owner</option>
                  <option value="tenant">Tenant</option>
                  <option value="super-admin">Super Admin</option>
                </select>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-600 text-white bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-600 text-white bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition duration-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link href="#" className="text-sm text-blue-400 hover:text-blue-300 transition duration-200">
                  Forgot your password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Your data stays safe with us. By signing in you agree to our{" "}
                <Link href="#" className="text-blue-400 hover:text-blue-300 transition duration-200">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-blue-400 hover:text-blue-300 transition duration-200">
                  secure data practices
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
