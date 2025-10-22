"use client"

import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/hero 4.png" 
          alt="CTA Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 -mr-48 -mt-48 animate-float"></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 -ml-48 -mb-48 animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance animate-slide-up drop-shadow-lg">
          Ready to Simplify Your Property Management?
        </h2>
        <p
          className="text-xl text-white/90 mb-8 max-w-2xl mx-auto text-balance animate-slide-up drop-shadow-md"
          style={{ animationDelay: "100ms" }}
        >
          Join hundreds of property managers who are already saving time and money with Havenly Pro.
        </p>
        <button
          className="group bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition transform hover:scale-105 animate-slide-up drop-shadow-lg flex items-center justify-center gap-2 mx-auto"
          style={{ animationDelay: "200ms" }}
        >
          Create Your Account Now
          <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
        </button>
      </div>
    </section>
  )
}
