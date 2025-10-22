"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/hero 1.png",
      title: "Manage Properties with Elegance",
      subtitle:
        "Streamline operations, empower your team, and delight your tenants with Havenly Pro's unified platform.",
    },
    {
      image: "/hero 2.png",
      title: "Control Everything in One Place",
      subtitle:
        "Real-time insights, automated workflows, and seamless tenant communication all in one powerful platform.",
    },
    {
      image: "/hero 4.png",
      title: "Scale Your Business Effortlessly",
      subtitle: "From single properties to large portfolios, Havenly Pro grows with your business needs.",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="space-y-8 animate-slide-up max-w-4xl">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold border border-white/30 hover:bg-white/30 transition">
                  ✨ Trusted by 500+ Property Managers
                </span>
              </div>

              <div className="space-y-6">
                <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight text-balance drop-shadow-lg">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-xl text-white/90 leading-relaxed text-balance max-w-3xl mx-auto drop-shadow-md">
                  {slides[currentSlide].subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                <button className="group bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition duration-300 flex items-center justify-center gap-2 transform hover:scale-105 backdrop-blur-sm">
                  Get Started Free
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                </button>
                <button className="group bg-white/20 backdrop-blur-md border-2 border-white/50 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 hover:border-white transition duration-300 flex items-center justify-center gap-2">
                  <Play size={20} />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto group bg-white/20 backdrop-blur-md border border-white/30 text-white p-3 rounded-full hover:bg-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-110 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto group bg-white/20 backdrop-blur-md border border-white/30 text-white p-3 rounded-full hover:bg-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-110 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 md:hidden flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 transition-all duration-300 rounded-full ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
