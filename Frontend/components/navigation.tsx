"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Building } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm hover:shadow-md transition duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent hover:from-blue-700 hover:to-cyan-600 transition duration-300 group"
            >
              <div className="p-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Building size={20} className="text-white" />
              </div>
              Havenly Pro
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-slate-600 hover:text-blue-600 transition duration-300 font-medium relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#how-it-works"
              className="text-slate-600 hover:text-blue-600 transition duration-300 font-medium relative group"
            >
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#pricing"
              className="text-slate-600 hover:text-blue-600 transition duration-300 font-medium relative group"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#contact"
              className="text-slate-600 hover:text-blue-600 transition duration-300 font-medium relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/login"
              className="text-slate-600 hover:text-blue-600 transition duration-300 font-medium relative group"
            >
              Login
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/40 transition duration-300 font-semibold transform hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-blue-600 transition duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in duration-200">
            <Link href="#features" className="block text-slate-700 hover:text-blue-600 py-2 font-medium transition">
              Features
            </Link>
            <Link href="#how-it-works" className="block text-slate-700 hover:text-blue-600 py-2 font-medium transition">
              How It Works
            </Link>
            <Link href="#pricing" className="block text-slate-700 hover:text-blue-600 py-2 font-medium transition">
              Pricing
            </Link>
            <Link href="#contact" className="block text-slate-700 hover:text-blue-600 py-2 font-medium transition">
              Contact
            </Link>
            <Link href="/login" className="block text-slate-700 hover:text-blue-600 py-2 font-medium transition">
              Login
            </Link>
            <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition duration-300 font-semibold">
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
