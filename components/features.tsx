"use client"

import { BarChart3, MessageSquare, CreditCard, TrendingUp, Lock, Zap } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Centralized Dashboard",
    description: "Manage properties, tenants, and admins from one unified interface.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Communication",
    description: "Send announcements, handle requests, and stay connected instantly.",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: CreditCard,
    title: "Automated Billing",
    description: "Track invoices and rent with automated payment processing.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Advanced Analytics",
    description: "Visualize occupancy, income, and performance with detailed insights.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-level encryption and role-based access control.",
    color: "from-blue-600 to-blue-700",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance for seamless user experience.",
    color: "from-cyan-600 to-cyan-700",
  },
]

export default function Features() {
  return (
    <section
      id="features"
      className="py-20 md:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100/40 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-50/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-slide-up">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100/60 text-blue-700 text-sm font-semibold mb-4 border border-blue-200/50">
            ✨ Powerful Features
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 text-balance">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto text-balance">
            Comprehensive tools designed for modern property management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl group-hover:blur-xl scale-95 group-hover:scale-105"></div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse group-hover:animate-bounce" style={{ animationDelay: `${index * 200}ms` }}></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse group-hover:animate-bounce" style={{ animationDelay: `${index * 200 + 300}ms` }}></div>
                </div>

                <div className="relative p-8 rounded-3xl border-2 border-slate-300/60 bg-white/80 backdrop-blur-xl hover:border-blue-400/80 transition-all duration-500 h-full hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 group-hover:bg-white/90">
                  {/* Icon container with enhanced animations */}
                  <div className="relative mb-6">
                    <div
                      className={`inline-block p-5 bg-gradient-to-br ${feature.color} rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-blue-500/30`}
                    >
                      <Icon className="w-7 h-7 text-white group-hover:animate-pulse" />
                    </div>
                    {/* Icon glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500 transform group-hover:scale-125`}></div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 group-hover:tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300 mb-6">
                    {feature.description}
                  </p>

                  {/* Enhanced progress bar */}
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
      </div>
    </section>
  )
}
