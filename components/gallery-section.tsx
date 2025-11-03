"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"

const galleryImages = [
  {
    src: "/images/corte3.webp",
    alt: "Diseño de barba profesional",
  },
  {
    src: "/images/corte1.webp",
    alt: "Corte profesional Blades Barbers",
  },
  {
    src: "/images/corte2.webp",
    alt: "Estilo moderno y elegante",
  },
  {
    src: "/images/corte4.webp",
    alt: "Corte fade degradado",
  },
  {
    src: "/images/corte5.webp",
    alt: "Look premium",
  },
  {
    src: "/images/corte6.webp",
    alt: "Estilo personalizado",
  },
]

export function GallerySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.3 })
  const { ref: gridRef, isInView: gridInView } = useInView({ threshold: 0.1 })

  return (
    <section id="galeria" className="py-20 md:py-32 bg-muted/30 w-full overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-16 animate-on-scroll ${titleInView ? 'animate-fade-in' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Nuestro Trabajo</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">Cada corte es una obra de arte</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer animate-on-scroll ${
                  gridInView ? 'animate-scale-in' : ''
                }`}
                style={{ animationDelay: gridInView ? `${index * 80}ms` : '0ms' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  style={{ objectPosition: 'center 30%' }}
                />
                <div
                  className={`absolute inset-0 bg-primary/80 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p className="text-primary-foreground font-semibold text-lg px-4 text-center">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
