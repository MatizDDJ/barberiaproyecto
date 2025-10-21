import { Instagram, Facebook, MessageCircle, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer id="contacto" className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              BLADES <span className="text-accent">BARBERS</span>
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Tu barbería de confianza en Colonia del Sacramento. Estilo, calidad y profesionalismo en cada corte.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nuestras Sucursales</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-1 shrink-0" />
                <div className="text-primary-foreground/80">
                  <p className="font-semibold text-accent">Centro</p>
                  <p>Mangarelli 585</p>
                  <p>Colonia del Sacramento, Uruguay</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-1 shrink-0" />
                <div className="text-primary-foreground/80">
                  <p className="font-semibold text-accent">El Real</p>
                  <p>Roger Balet 201</p>
                  <p>Colonia del Sacramento, Uruguay</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent mt-1 shrink-0" />
                <div className="text-primary-foreground/80">
                  <p>Lunes a Viernes: 9:00 - 20:00</p>
                  <p>Sábados: 9:00 - 18:00</p>
                  <p>Domingos: Cerrado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Seguinos</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/_blades.barbers/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-primary-foreground/10 hover:bg-accent/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-6 h-6 text-primary-foreground" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-primary-foreground/10 hover:bg-accent/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-6 h-6 text-primary-foreground" />
              </a>
              <a
                href="https://wa.me/59899220239"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-primary-foreground/10 hover:bg-accent/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-6 h-6 text-primary-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Blades Barbers. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
