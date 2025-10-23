"use client"

import { Check, ArrowRight } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small property portfolios",
    features: [
      "Up to 5 properties",
      "Basic tenant management",
      "Email support",
      "Monthly reports",
      "Mobile app access",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Business",
    price: "$79",
    period: "/month",
    description: "For growing property managers",
    features: [
      "Up to 50 properties",
      "Advanced tenant management",
      "Priority support",
      "Real-time analytics",
      "Mobile app access",
      "Custom integrations",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large-scale operations",
    features: [
      "Unlimited properties",
      "White-label solution",
      "Dedicated support",
      "Advanced analytics",
      "API access",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-20 md:py-32 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-20 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 left-20 w-80 h-80 bg-cyan-100/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100/60 text-blue-700 text-sm font-semibold mb-4 border border-blue-200/50">
            💰 Transparent Pricing
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 text-balance">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 text-balance">
            Choose the perfect plan for your needs. No credit card required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 border transition animate-slide-up group ${
                plan.highlighted
                  ? "border-blue-500/50 bg-gradient-to-br from-blue-50/80 to-white/80 backdrop-blur-xl shadow-2xl shadow-blue-500/20 md:scale-105 md:z-10"
                  : "border-slate-200/60 bg-white/70 backdrop-blur-xl hover:border-blue-300/60 hover:shadow-2xl hover:shadow-blue-500/10"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular ⭐
                  </div>
                </div>
              )}

              <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                {plan.name}
              </h3>
              <p className="text-slate-600 text-sm mb-6">{plan.description}</p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                <span className="text-slate-600 ml-2">{plan.period}</span>
              </div>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition mb-8 flex items-center justify-center gap-2 group/btn ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/40 transform hover:scale-105"
                    : "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transform hover:scale-105"
                }`}
              >
                {plan.cta}
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition" />
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3 group/feature">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 group-hover/feature:scale-125 transition" />
                    <span className="text-slate-700 group-hover/feature:text-slate-900 transition">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-slide-up">
          <p className="text-slate-600">
            All plans include a <span className="font-semibold text-slate-900">14-day free trial</span>. No credit card
            required.
          </p>
        </div>
      </div>
    </section>
  )
}
