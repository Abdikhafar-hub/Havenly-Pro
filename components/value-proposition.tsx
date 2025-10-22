"use client"

import { Bot, Users, Bell, Cloud, Shield, Zap } from "lucide-react"

const valueProps = [
  {
    icon: Bot,
    title: "AI-Powered Automation",
    description: "Intelligent workflows that automate routine tasks, reducing manual work by up to 70% and ensuring nothing falls through the cracks.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Multi-Role Support",
    description: "Seamless experience for Super Admins, Property Owners, and Tenants with role-specific dashboards and permissions.",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    description: "Instant alerts for payments, maintenance requests, and important updates keep everyone informed and responsive.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Cloud,
    title: "24/7 Cloud Uptime",
    description: "Enterprise-grade infrastructure with 99.9% uptime guarantee, ensuring your operations never stop running.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "End-to-end encryption, secure data storage, and compliance with industry standards protect your sensitive information.",
    color: "from-red-500 to-red-600",
  },
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description: "Optimized for speed with sub-second load times, ensuring smooth operations even with large property portfolios.",
    color: "from-yellow-500 to-yellow-600",
  },
]

export default function ValueProposition() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-50/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100/60 text-blue-700 text-sm font-semibold mb-4 border border-blue-200/50">
            🎯 Why Choose HavenlyX
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 text-balance">
            Built for Modern Property Management
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto text-balance">
            Experience the future of property management with cutting-edge technology designed to streamline your operations and maximize efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon
            return (
              <div
                key={index}
                className="group relative animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Enhanced background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl group-hover:blur-xl scale-95 group-hover:scale-105"></div>
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse group-hover:animate-bounce" style={{ animationDelay: `${index * 200}ms` }}></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse group-hover:animate-bounce" style={{ animationDelay: `${index * 200 + 300}ms` }}></div>
                </div>

                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-300/60 hover:border-blue-400/80 transition-all duration-500 h-full hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 group-hover:bg-white/95">
                  {/* Icon with enhanced animations */}
                  <div className="relative mb-6">
                    <div className={`inline-block p-4 bg-gradient-to-br ${prop.color} rounded-2xl text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/30`}>
                      <Icon size={24} className="group-hover:animate-pulse" />
                    </div>
                    {/* Icon glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${prop.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500 transform group-hover:scale-125`}></div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 group-hover:tracking-wide">
                    {prop.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300 mb-6">
                    {prop.description}
                  </p>

                  {/* Enhanced progress indicator */}
                  <div className="relative">
                    <div className="h-1 bg-slate-200/60 rounded-full overflow-hidden">
                      <div className="h-full w-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 group-hover:w-full transition-all duration-700 rounded-full relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: "600ms" }}>
          <div className="inline-flex items-center gap-8 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-500" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Cloud size={16} className="text-blue-500" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-yellow-500" />
              <span>Lightning Fast</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
