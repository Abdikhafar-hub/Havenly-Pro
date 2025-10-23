"use client"

import { Linkedin, Twitter, Mail, Heart, Building } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-slate-300 py-12 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* About */}
          <div className="group md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Building size={20} className="text-white" />
              </div>
              <h3 className="text-white font-bold text-xl group-hover:text-blue-400 transition">Havenly Pro</h3>
            </div>
            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition mb-4">
              Simplifying property management for everyone. From super admins to tenants.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="group">
            <h4 className="text-blue-400 font-semibold mb-4 text-lg group-hover:text-blue-300 transition">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition duration-300 font-medium flex items-center gap-2 group/link">
                  <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-slate-400 hover:text-blue-400 transition duration-300 font-medium flex items-center gap-2 group/link"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity"></span>
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-slate-400 hover:text-blue-400 transition duration-300 font-medium flex items-center gap-2 group/link"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity"></span>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition duration-300 font-medium flex items-center gap-2 group/link">
                  <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity"></span>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="group">
            <h4 className="text-blue-400 font-semibold mb-4 text-lg group-hover:text-blue-300 transition">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition duration-300 font-medium flex items-center gap-2 group/link">
                  <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition duration-300 font-medium flex items-center gap-2 group/link">
                  <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity"></span>
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-slate-400 hover:text-blue-400 transition duration-300 font-medium flex items-center gap-2 group/link"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition duration-300 font-medium flex items-center gap-2 group/link">
                  <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity"></span>
                  Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="group">
            <h4 className="text-blue-400 font-semibold mb-4 text-lg group-hover:text-blue-300 transition">Follow Us</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                className="p-3 rounded-xl bg-slate-800/50 text-slate-400 hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 group/social"
              >
                <Linkedin size={20} className="group-hover/social:animate-pulse" />
              </a>
              <a
                href="#"
                className="p-3 rounded-xl bg-slate-800/50 text-slate-400 hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 group/social"
              >
                <Twitter size={20} className="group-hover/social:animate-pulse" />
              </a>
              <a
                href="#"
                className="p-3 rounded-xl bg-slate-800/50 text-slate-400 hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 group/social"
              >
                <Mail size={20} className="group-hover/social:animate-pulse" />
              </a>
            </div>
            <div className="text-sm text-slate-500">
              <p>Stay updated with our latest news</p>
            </div>
          </div>
        </div>

        {/* Enhanced bottom section */}
        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <p className="text-slate-400 text-sm flex items-center gap-2">
                © 2025 Havenly Pro. Made with 
                <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" /> 
                All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link href="#" className="text-slate-400 hover:text-blue-400 text-sm transition duration-300 font-medium hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-400 text-sm transition duration-300 font-medium hover:underline">
                Terms of Service
              </Link>
              <Link href="#" className="text-slate-400 hover:text-blue-400 text-sm transition duration-300 font-medium hover:underline">
                Cookie Policy
              </Link>
            </div>
          </div>
          
          {/* Additional info */}
          <div className="mt-6 pt-4 border-t border-slate-800/30">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span>🏢 Property Management Platform</span>
                <span>🔒 Enterprise Security</span>
                <span>☁️ Cloud-Based</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
