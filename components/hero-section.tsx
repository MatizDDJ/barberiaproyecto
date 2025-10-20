"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/professional-barber-cutting-hair-in-modern-barbers.jpg" alt="Barber working" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 tracking-tight text-balance animate-slide-down">
          Estilo que habla por vos
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-balance animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Cortes, afeitados y cuidado masculino premium
        </p>
        <div className="animate-scale-in" style={{ animationDelay: "0.4s" }}>
          <Button
            onClick={() => scrollToSection("reservas")}
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 font-semibold text-lg px-8 py-6 transition-transform"
          >
            Reservá tu turno
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-subtle">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
