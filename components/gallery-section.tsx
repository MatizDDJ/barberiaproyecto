"use client"

import { useState } from "react"

const galleryImages = [
  {
    src: "/modern-fade-haircut-barbershop.jpg",
    alt: "Corte fade moderno",
  },
  {
    src: "/classic-pompadour-hairstyle-barbershop.jpg",
    alt: "Pompadour clásico",
  },
  {
    src: "/beard-trim-grooming-barbershop.jpg",
    alt: "Diseño de barba",
  },
  {
    src: "/undercut-hairstyle-barbershop.jpg",
    alt: "Undercut profesional",
  },
  {
    src: "/traditional-straight-razor-shave-barbershop.jpg",
    alt: "Afeitado con navaja",
  },
  {
    src: "/textured-crop-haircut-barbershop.jpg",
    alt: "Crop texturizado",
  },
]

export function GallerySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="galeria" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Nuestro Trabajo</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">Cada corte es una obra de arte</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
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
    </section>
  )
}
