"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scissors, Sparkles, Users, Droplets } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const services = [
  {
    icon: Scissors,
    title: "Corte Clásico",
    description: "Cortes tradicionales y modernos adaptados a tu estilo personal",
    price: "Desde $800",
  },
  {
    icon: Sparkles,
    title: "Afeitado con Navaja",
    description: "Afeitado tradicional con toalla caliente y productos premium",
    price: "Desde $600",
  },
  {
    icon: Users,
    title: "Diseño de Barba",
    description: "Perfilado y diseño profesional para una barba impecable",
    price: "Desde $500",
  },
  {
    icon: Droplets,
    title: "Tratamientos Capilares",
    description: "Tratamientos especializados para el cuidado del cabello",
    price: "Desde $700",
  },
]

export function ServicesSection() {
  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.3 })
  const { ref: cardsRef, isInView: cardsInView } = useInView({ threshold: 0.1 })

  return (
    <section id="servicios" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-16 animate-on-scroll ${titleInView ? 'animate-fade-in' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Nuestros Servicios</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Servicios profesionales de barbería con atención personalizada
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`border-border hover:border-accent transition-all duration-300 hover:shadow-lg hover:scale-105 group animate-on-scroll ${
                cardsInView ? 'animate-slide-up' : ''
              }`}
              style={{ animationDelay: cardsInView ? `${index * 100}ms` : '0ms' }}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-accent">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
