/**
 * CONFIGURACIÓN DEL NEGOCIO
 * ========================
 * 
 * Este archivo contiene toda la configuración personalizable para el sitio web.
 * Cambia estos valores para adaptar el sitio a tu cliente.
 */

export const businessConfig = {
  // INFORMACIÓN BÁSICA
  name: "Tu Negocio",
  tagline: "Tu eslogan aquí",
  description: "Descripción breve de tu negocio y lo que ofreces",
  
  // TIPO DE INDUSTRIA
  // Opciones: "barbershop", "salon", "spa", "restaurant", "gym", "clinic", "other"
  industry: "barbershop",
  
  // HERO SECTION
  hero: {
    title: "Estilo que habla por vos",
    subtitle: "Cortes, afeitados y cuidado masculino premium",
    ctaText: "Reservá tu turno",
    backgroundImage: "/hero-image.jpg",
    showScrollIndicator: true,
  },

  // SERVICIOS
  services: [
    {
      id: 1,
      name: "Corte Clásico",
      description: "Corte tradicional con tijera y máquina, incluye lavado",
      price: 8000,
      duration: 30,
      icon: "✂️",
      popular: false,
    },
    {
      id: 2,
      name: "Corte + Barba",
      description: "Corte completo más perfilado y arreglo de barba",
      price: 12000,
      duration: 45,
      icon: "💈",
      popular: true,
    },
    {
      id: 3,
      name: "Afeitado Clásico",
      description: "Afeitado tradicional con navaja, toalla caliente y masaje facial",
      price: 10000,
      duration: 40,
      icon: "🪒",
      popular: false,
    },
    {
      id: 4,
      name: "Corte Premium",
      description: "Diseño personalizado, acabado detallado y tratamiento capilar",
      price: 15000,
      duration: 60,
      icon: "⭐",
      popular: false,
    },
  ],

  // HORARIOS DE NEGOCIO (Horarios por defecto)
  businessHours: {
    monday: { open: "09:00", close: "18:00", closed: false },
    tuesday: { open: "09:00", close: "18:00", closed: false },
    wednesday: { open: "09:00", close: "18:00", closed: false },
    thursday: { open: "09:00", close: "18:00", closed: false },
    friday: { open: "09:00", close: "18:00", closed: false },
    saturday: { open: "09:00", close: "14:00", closed: false },
    sunday: { open: "10:00", close: "14:00", closed: true },
  },

  // SISTEMA DE RESERVAS
  booking: {
    enabled: true,
    allowMultiplePerDay: false, // ¿Permitir múltiples reservas el mismo día?
    requireAuth: false, // ¿Requiere registro para reservar?
    advanceBookingDays: 30, // Días de anticipación para reservar
    minAdvanceHours: 2, // Horas mínimas de anticipación
    slotDuration: 30, // Duración de cada slot en minutos
    autoAccept: false, // ¿Auto-aceptar reservas sin aprobación del admin?
  },

  // INFORMACIÓN DE CONTACTO
  contact: {
    phone: "+54 9 11 1234-5678",
    email: "contacto@tunegocio.com",
    address: "Calle Falsa 123, Ciudad, Provincia",
    googleMapsUrl: "https://maps.google.com/?q=tu+direccion",
  },

  // REDES SOCIALES
  social: {
    facebook: "https://facebook.com/tunegocio",
    instagram: "https://instagram.com/tunegocio",
    twitter: "https://twitter.com/tunegocio",
    whatsapp: {
      enabled: true,
      number: "5491112345678", // Número sin espacios ni +
      message: "Hola, me gustaría hacer una consulta sobre", // Mensaje predeterminado
    },
  },

  // GALERÍA
  gallery: {
    enabled: true,
    images: [
      {
        src: "/gallery/image-1.jpg",
        alt: "Descripción de la imagen 1",
        category: "cortes", // Opcional para filtrado
      },
      {
        src: "/gallery/image-2.jpg",
        alt: "Descripción de la imagen 2",
        category: "barba",
      },
      {
        src: "/gallery/image-3.jpg",
        alt: "Descripción de la imagen 3",
        category: "cortes",
      },
      // Agrega más imágenes...
    ],
  },

  // TESTIMONIOS (Opcional)
  testimonials: {
    enabled: false, // Cambiar a true para mostrar
    items: [
      {
        id: 1,
        name: "Juan Pérez",
        rating: 5,
        comment: "Excelente servicio, muy profesionales",
        image: "/testimonials/client-1.jpg",
      },
      // Agrega más testimonios...
    ],
  },

  // NAVEGACIÓN
  navigation: {
    showLogo: true,
    menuItems: [
      { label: "Inicio", href: "#inicio", enabled: true },
      { label: "Servicios", href: "#servicios", enabled: true },
      { label: "Galería", href: "#galeria", enabled: true },
      { label: "Reservas", href: "#reservas", enabled: true },
      { label: "Contacto", href: "#contacto", enabled: true },
    ],
  },

  // BRANDING Y COLORES
  branding: {
    logo: "/logo.png",
    favicon: "/favicon.ico",
    // Los colores se configuran en globals.css
    primaryColor: "#d4af37", // Dorado
    secondaryColor: "#1a1a1a", // Negro
    accentColor: "#d4af37", // Dorado
  },

  // SEO
  seo: {
    title: "Tu Negocio - Servicios Premium",
    description: "Los mejores servicios para tu cuidado personal. Reservá tu turno online.",
    keywords: "negocio, servicios, reservas, online",
    ogImage: "/og-image.jpg",
  },

  // ADMIN
  admin: {
    emails: ["admin@tunegocio.com"], // Emails que tendrán acceso admin
    dashboardTitle: "Panel de Administración",
  },

  // NOTIFICACIONES
  notifications: {
    email: {
      enabled: false, // Requiere configuración adicional
      from: "no-reply@tunegocio.com",
    },
    whatsapp: {
      enabled: true,
      notifyNewBooking: true,
      notifyBookingStatus: true,
    },
  },

  // FEATURES OPCIONALES
  features: {
    darkMode: true, // Toggle tema oscuro/claro
    multiLanguage: false, // Soporte multi-idioma
    blog: false, // Sección de blog
    ecommerce: false, // Venta de productos
    membership: false, // Sistema de membresías
    loyalty: false, // Programa de lealtad
  },

  // LEGAL
  legal: {
    termsUrl: "/terminos",
    privacyUrl: "/privacidad",
    businessName: "Tu Negocio S.A.",
    taxId: "12-34567890-1",
  },
}

// Tipos TypeScript para autocompletado
export type BusinessConfig = typeof businessConfig
export type Service = typeof businessConfig.services[0]
export type MenuItem = typeof businessConfig.navigation.menuItems[0]
