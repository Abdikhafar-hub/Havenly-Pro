"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", company: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Have questions? Our team is ready to help you get started with Havenly Pro.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Contact Details */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="p-4 bg-blue-100 rounded-xl h-fit">
                <Mail className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Email</h3>
                <p className="text-slate-600">abdikhafarissack@gmail.com</p>
                <p className="text-sm text-slate-500">We'll respond within 24 hours</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-4 bg-blue-100 rounded-xl h-fit">
                <Phone className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Phone</h3>
                <p className="text-slate-600">+254717219449</p>
                <p className="text-sm text-slate-500">Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-4 bg-green-100 rounded-xl h-fit">
                <MessageCircle className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">WhatsApp</h3>
                <p className="text-slate-600">+254717219449</p>
                <p className="text-sm text-slate-500">Available 24/7 for quick support</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-4 bg-blue-100 rounded-xl h-fit">
                <MapPin className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Address</h3>
                <p className="text-slate-600">Stima Plaza, Nairobi, Kenya</p>
                <p className="text-sm text-slate-500">Visit our headquarters</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 h-fit">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="text-green-600" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Message Sent!</h3>
                <p className="text-slate-600 text-sm text-center">
                  Thank you for reaching out. We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1.5">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1.5">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1.5">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none text-sm"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  Send Message
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
          <div className="relative">
            {/* Google Maps Embed */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8358610711916!2d36.8204853!3d-1.2715319000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17261b877ccf%3A0xd2347e36b0f2f5d1!2sStima%20Plaza%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1761137159884!5m2!1sen!2ske" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-96"
            ></iframe>
            
            {/* Map Overlay Elements */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>We're here!</span>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-blue-600" />
                <span>Stima Plaza, Nairobi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
