/**
 * Script de Setup Automático
 * ==========================
 * 
 * Este script ayuda a configurar rápidamente el proyecto para un nuevo cliente.
 * 
 * Uso:
 *   node scripts/setup.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('🚀 Landing Template - Setup Wizard\n');
  console.log('Este asistente te ayudará a configurar el proyecto para tu cliente.\n');

  // Recopilar información básica
  const businessName = await question('Nombre del negocio: ');
  const tagline = await question('Eslogan: ');
  const description = await question('Descripción breve: ');
  
  console.log('\nTipo de industria:');
  console.log('1. Barbería');
  console.log('2. Salón de belleza');
  console.log('3. Spa');
  console.log('4. Restaurante');
  console.log('5. Gimnasio');
  console.log('6. Otro\n');
  const industryChoice = await question('Selecciona una opción (1-6): ');
  
  const industryMap = {
    '1': 'barbershop',
    '2': 'salon',
    '3': 'spa',
    '4': 'restaurant',
    '5': 'gym',
    '6': 'other'
  };
  const industry = industryMap[industryChoice] || 'other';

  // Información de contacto
  console.log('\n📞 Información de Contacto\n');
  const phone = await question('Teléfono: ');
  const email = await question('Email: ');
  const address = await question('Dirección: ');

  // Redes sociales
  console.log('\n📱 Redes Sociales\n');
  const facebook = await question('Facebook URL (Enter para saltar): ');
  const instagram = await question('Instagram URL (Enter para saltar): ');
  const whatsappNumber = await question('WhatsApp número (sin +): ');

  // Crear archivo de configuración
  console.log('\n⚙️ Generando configuración...\n');

  const config = `/**
 * CONFIGURACIÓN DEL NEGOCIO - ${businessName}
 * Generado automáticamente el ${new Date().toLocaleDateString()}
 */

export const businessConfig = {
  // INFORMACIÓN BÁSICA
  name: "${businessName}",
  tagline: "${tagline}",
  description: "${description}",
  industry: "${industry}",
  
  // HERO SECTION
  hero: {
    title: "${tagline || 'Bienvenidos a ' + businessName}",
    subtitle: "${description}",
    ctaText: "Reservá tu turno",
    backgroundImage: "/hero-image.jpg",
    showScrollIndicator: true,
  },

  // SERVICIOS (EDITAR MANUALMENTE)
  services: [
    {
      id: 1,
      name: "Servicio 1",
      description: "Descripción del servicio",
      price: 5000,
      duration: 30,
      icon: "✂️",
      popular: false,
    },
    // AGREGAR MÁS SERVICIOS AQUÍ
  ],

  // HORARIOS (Configurar en el admin después)
  businessHours: {
    monday: { open: "09:00", close: "18:00", closed: false },
    tuesday: { open: "09:00", close: "18:00", closed: false },
    wednesday: { open: "09:00", close: "18:00", closed: false },
    thursday: { open: "09:00", close: "18:00", closed: false },
    friday: { open: "09:00", close: "18:00", closed: false },
    saturday: { open: "09:00", close: "14:00", closed: false },
    sunday: { open: "10:00", close: "14:00", closed: true },
  },

  // INFORMACIÓN DE CONTACTO
  contact: {
    phone: "${phone}",
    email: "${email}",
    address: "${address}",
    googleMapsUrl: "https://maps.google.com/?q=${encodeURIComponent(address)}",
  },

  // REDES SOCIALES
  social: {
    facebook: "${facebook}",
    instagram: "${instagram}",
    twitter: "",
    whatsapp: {
      enabled: ${whatsappNumber ? 'true' : 'false'},
      number: "${whatsappNumber}",
      message: "Hola, me gustaría hacer una consulta sobre",
    },
  },

  // GALERÍA (AGREGAR IMÁGENES MANUALMENTE)
  gallery: {
    enabled: true,
    images: [],
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

  // BRANDING
  branding: {
    logo: "/logo.png",
    favicon: "/favicon.ico",
    primaryColor: "#d4af37",
    secondaryColor: "#1a1a1a",
    accentColor: "#d4af37",
  },

  // SEO
  seo: {
    title: "${businessName} - ${tagline}",
    description: "${description}",
    keywords: "${industry}, servicios, reservas online",
    ogImage: "/og-image.jpg",
  },

  // ADMIN
  admin: {
    emails: ["${email}"],
    dashboardTitle: "Panel de ${businessName}",
  },

  // NOTIFICACIONES
  notifications: {
    whatsapp: {
      enabled: ${whatsappNumber ? 'true' : 'false'},
      notifyNewBooking: true,
      notifyBookingStatus: true,
    },
  },

  // FEATURES
  features: {
    darkMode: true,
    multiLanguage: false,
    blog: false,
    ecommerce: false,
  },
}

export type BusinessConfig = typeof businessConfig
`;

  // Guardar configuración
  const configPath = path.join(__dirname, '..', 'config', 'business.config.ts');
  fs.writeFileSync(configPath, config);

  console.log('✅ Archivo config/business.config.ts generado exitosamente!\n');

  // Crear archivo .env.local si no existe
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    const envContent = `# Firebase Configuration
# Completa estos valores con los datos de Firebase Console

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
`;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Archivo .env.local creado. No olvides completar las credenciales de Firebase!\n');
  }

  // Próximos pasos
  console.log('📋 Próximos pasos:\n');
  console.log('1. Edita config/business.config.ts y agrega los servicios');
  console.log('2. Reemplaza las imágenes en la carpeta public/');
  console.log('3. Configura Firebase y completa .env.local');
  console.log('4. Personaliza los colores en app/globals.css');
  console.log('5. Ejecuta "npm run dev" para ver los cambios\n');

  console.log('📚 Para más información, consulta:');
  console.log('   - CUSTOMIZATION-GUIDE.md');
  console.log('   - CLIENT-DELIVERY-CHECKLIST.md\n');

  console.log('¡Listo! 🎉\n');

  rl.close();
}

main().catch(console.error);
