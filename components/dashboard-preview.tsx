"use client"

export default function DashboardPreview() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100/60 text-blue-700 text-sm font-semibold mb-4 border border-blue-200/50">
            💻 Dashboard Preview
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 text-balance">
            One Platform. All Operations Simplified.
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto text-balance">
            Manage everything from a single, intuitive dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="animate-slide-up">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition duration-300">
                <div className="bg-slate-900 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="h-3 w-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                    <div className="flex gap-2">
                      <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-slate-700 rounded-lg"></div>
                    <div className="h-4 w-5/6 bg-slate-700 rounded-lg"></div>
                    <div className="grid grid-cols-4 gap-3 pt-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-24 bg-gradient-to-br from-blue-500/50 to-cyan-500/50 rounded-lg hover:from-blue-500 hover:to-cyan-500 transition duration-300"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl"></div>
                <div className="relative bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition duration-300 w-64">
                  <div className="bg-slate-900 rounded-3xl p-4 space-y-3">
                    <div className="h-2 w-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto"></div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-slate-700 rounded-lg"></div>
                      <div className="h-3 w-4/5 bg-slate-700 rounded-lg"></div>
                      <div className="space-y-2 pt-3">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="h-12 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-lg hover:from-cyan-500 hover:to-blue-500 transition duration-300"
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center animate-slide-up" style={{ animationDelay: "200ms" }}>
          <p className="text-slate-600 text-lg">
            Available on <span className="font-semibold text-slate-900">Desktop, Tablet & Mobile</span>
          </p>
        </div>
      </div>
    </section>
  )
}
