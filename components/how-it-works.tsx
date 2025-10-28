"use client"

import { ArrowRight, Settings, Users, CreditCard, Shield, BarChart3, MessageSquare, Calendar, FileText, Bell } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Super Admin Sets Up",
    description: "Create and configure your properties with all necessary details and settings.",
    icon: Settings,
    features: [
      "Property portfolio setup and configuration",
      "User role management and permissions",
      "System-wide settings and integrations",
      "Financial reporting and analytics setup"
    ],
    subFeatures: [
      { icon: Shield, text: "Secure multi-tenant architecture" },
      { icon: BarChart3, text: "Advanced analytics dashboard" },
      { icon: Settings, text: "Custom workflow automation" }
    ]
  },
  {
    number: "02",
    title: "Property Admin Manages",
    description: "Oversee tenants, maintenance requests, and day-to-day operations.",
    icon: Users,
    features: [
      "Tenant onboarding and management",
      "Maintenance request tracking",
      "Rent collection and financial oversight",
      "Communication and announcements"
    ],
    subFeatures: [
      { icon: MessageSquare, text: "Real-time tenant communication" },
      { icon: Calendar, text: "Automated scheduling system" },
      { icon: FileText, text: "Document management system" }
    ]
  },
  {
    number: "03",
    title: "Tenants Pay & Track",
    description: "Pay rent securely and track maintenance requests in real-time.",
    icon: CreditCard,
    features: [
      "Secure online rent payments",
      "Maintenance request submission",
      "Payment history and receipts",
      "Real-time notifications and updates"
    ],
    subFeatures: [
      { icon: CreditCard, text: "Multiple payment methods" },
      { icon: Bell, text: "Instant notifications" },
      { icon: BarChart3, text: "Personal payment dashboard" }
    ]
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-32 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden"
    >
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
            🚀 Simple Process
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 text-balance">How It Works</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto text-balance">
            Simple, intuitive workflow designed for everyone.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative animate-slide-up group" style={{ animationDelay: `${index * 150}ms` }}>
                  {/* Enhanced background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl group-hover:blur-lg scale-98 group-hover:scale-100"></div>
                  
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/60 hover:border-blue-300/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 group-hover:bg-white/90">
                    <div className="flex items-start gap-4">
                      {/* Step number and icon */}
                      <div className="flex-shrink-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-all duration-300">
                            {step.number}
                          </div>
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg text-white group-hover:scale-110 group-hover:-rotate-2 transition-all duration-300">
                            <Icon size={16} className="group-hover:animate-pulse" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700 transition-colors duration-300 mb-3">
                          {step.description}
                        </p>

                        {/* Compact features list */}
                        <ul className="space-y-1">
                          {step.features.slice(0, 2).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2 text-xs text-slate-500 group-hover:text-slate-600 transition-colors">
                              <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0 group-hover:bg-blue-500 transition-colors"></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Progress indicator */}
                        <div className="mt-3">
                          <div className="h-0.5 bg-slate-200/60 rounded-full overflow-hidden">
                            <div className="h-full w-0 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  {/* Arrow connector */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center my-4">
                      <ArrowRight className="w-5 h-5 text-blue-300 group-hover:text-blue-400 transition-colors duration-300" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right Column - Apartment Image */}
          <div className="relative h-full min-h-[600px] flex items-center justify-center">
            <div className="relative w-full h-full max-w-2xl mx-auto">
              {/* Background decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100/60 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-100/60 rounded-full blur-xl"></div>
              
              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50">
                <img 
                  src="/apartment-3797468_1280.jpg" 
                  alt="Modern Apartment Building" 
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* Overlay content */}
                
                
                
              </div>
            </div>
          </div>
        </div>

        <div className="text-center animate-slide-up" style={{ animationDelay: "300ms" }}>
          <button className="group bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto">
            Try Demo
            <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
          </button>
        </div>
      </div>
    </section>
  )
}
