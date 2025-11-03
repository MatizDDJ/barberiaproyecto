"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import ThemeToggle from "./theme-toggle"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"

  const handleLogoClick = () => {
    if (!isHome) {
      router.push("/")
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const scrollToSection = (id: string) => {
    if (!isHome) {
      window.location.href = `/#${id}`
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-accent/20 w-full">
      <div className="w-full max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <Image 
              src="/images/blades-logo.png" 
              alt="Blades Barbers" 
              width={50} 
              height={50} 
              className="rounded-full group-hover:scale-105 transition-transform duration-200"
              style={{ height: 'auto' }}
              priority
            />
            <div className="text-xl md:text-2xl font-bold text-primary-foreground tracking-tight">
              BLADES <span className="text-accent">BARBERS</span>
            </div>
          </button>

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
            <Link
              href="/mis-reservas"
              className="text-primary-foreground hover:text-accent transition-colors text-sm font-medium flex items-center gap-1"
            >
              <Calendar className="w-4 h-4" />
              Mis Reservas
            </Link>
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

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button
              onClick={() => scrollToSection("reservas")}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            >
              Reservar turno
            </Button>
          </div>

          {/* Mobile Menu Button with animated hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-primary-foreground p-2 hover:bg-accent/10 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute left-0 block w-6 h-0.5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? 'top-3 rotate-45' : 'top-1'
                  }`}
                />
                <span 
                  className={`absolute left-0 top-3 block w-6 h-0.5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span 
                  className={`absolute left-0 block w-6 h-0.5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? 'top-3 -rotate-45' : 'top-5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-slide-down">
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
            <Link
              href="/mis-reservas"
              onClick={() => setMobileMenuOpen(false)}
              className="text-primary-foreground hover:text-accent transition-colors text-sm font-medium text-left flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Mis Reservas
            </Link>
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
            
            {/* Theme Toggle en móvil */}
            <div className="border-t border-primary-foreground/20 pt-4 mt-2">
              <ThemeToggle showLabel={true} />
            </div>

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
