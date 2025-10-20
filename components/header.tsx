"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-accent/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/blades-logo.png" alt="Blades Barbers" width={50} height={50} className="rounded-full" />
            <div className="text-xl md:text-2xl font-bold text-primary-foreground tracking-tight">
              BLADES <span className="text-accent">BARBERS</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-primary-foreground hover:text-accent transition-colors text-sm font-medium"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-primary-foreground hover:text-accent transition-colors text-sm font-medium"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("galeria")}
              className="text-primary-foreground hover:text-accent transition-colors text-sm font-medium"
            >
              Galería
            </button>
            <button
              onClick={() => scrollToSection("reservas")}
              className="text-primary-foreground hover:text-accent transition-colors text-sm font-medium"
            >
              Reservas
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-primary-foreground hover:text-accent transition-colors text-sm font-medium"
            >
              Contacto
            </button>
          </nav>

          {/* CTA Button */}
          <Button
            onClick={() => scrollToSection("reservas")}
            className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
          >
            Reservar turno
          </Button>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-primary-foreground">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-primary-foreground hover:text-accent transition-colors text-sm font-medium text-left"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-primary-foreground hover:text-accent transition-colors text-sm font-medium text-left"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("galeria")}
              className="text-primary-foreground hover:text-accent transition-colors text-sm font-medium text-left"
            >
              Galería
            </button>
            <button
              onClick={() => scrollToSection("reservas")}
              className="text-primary-foreground hover:text-accent transition-colors text-sm font-medium text-left"
            >
              Reservas
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-primary-foreground hover:text-accent transition-colors text-sm font-medium text-left"
            >
              Contacto
            </button>
            <Button
              onClick={() => scrollToSection("reservas")}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold w-full"
            >
              Reservar turno
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
