import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import HowItWorks from "@/components/how-it-works"
import ValueProposition from "@/components/value-proposition"
import Testimonials from "@/components/testimonials"
import Pricing from "@/components/pricing"
import Contact from "@/components/contact"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <Navigation />
      <Hero />
      <ValueProposition />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Contact />
      <CTA />
      <Footer />
    </main>
  )
}
