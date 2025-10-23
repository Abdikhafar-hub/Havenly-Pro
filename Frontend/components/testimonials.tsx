"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Property Manager",
    company: "Urban Properties LLC",
    quote:
      "Managing 10+ apartments became effortless with Havenly Pro. The automation features alone save me hours every week.",
    initials: "SJ",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Real Estate Owner",
    company: "Chen Real Estate Group",
    quote: "The tenant communication features are game-changing. Everyone stays informed and happy.",
    initials: "MC",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Building Administrator",
    company: "Downtown Residences",
    quote: "The analytics dashboard gives me insights I never had before. Data-driven decisions are now possible.",
    initials: "ER",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Portfolio Manager",
    company: "Wilson Properties",
    quote: "Scaling from 5 to 50 properties was seamless. Havenly Pro grew with us.",
    initials: "JW",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "Property Director",
    company: "Metro Living",
    quote: "The reporting features help me make data-driven decisions. Our efficiency increased by 40%.",
    initials: "LT",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Building Manager",
    company: "Skyline Properties",
    quote: "Tenant satisfaction is at an all-time high. The communication tools are incredible.",
    initials: "DP",
    rating: 5,
  },
]

// Duplicate testimonials for seamless infinite scroll
const duplicatedTestimonials = [...testimonials, ...testimonials]

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-100/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100/60 text-blue-700 text-sm font-semibold mb-4 border border-blue-200/50">
            ⭐ Testimonials
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 text-balance">
            Loved by Property Professionals
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto text-balance">
            See what our customers have to say about Havenly Pro.
          </p>
        </div>

        {/* Continuous Carousel Container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll hover:pause-animation">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-80 mx-4 group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"></div>

                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/60 hover:border-blue-300/60 transition duration-300 h-full hover:shadow-2xl hover:shadow-blue-500/10 transform group-hover:-translate-y-2">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-slate-700 leading-relaxed italic mb-6">"{testimonial.quote}"</p>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-200/50">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-semibold text-sm group-hover:scale-110 transition duration-300">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
