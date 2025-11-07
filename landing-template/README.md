# 🚀 Landing Template Pro

> **Sistema Completo de Sitio Web Profesional con Reservas Online**  
> Personaliza en 1-2 horas • Vende por $300-2500 USD • Genera ingresos recurrentes

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-latest-orange)](https://firebase.google.com/)

---

## 🎯 ¿Qué Es Esto?

Este es un **template profesional completo** que puedes personalizar rápidamente y vender a negocios locales que necesitan:

- ✅ Sitio web profesional y moderno
- ✅ Sistema de reservas online 24/7
- ✅ Panel de administración completo
- ✅ Notificaciones automáticas por WhatsApp
- ✅ Diseño responsive (móvil, tablet, desktop)

**Con solo 1-2 horas de personalización, puedes vender este sitio por $300-2500 USD.**

---

## 💰 Oportunidad de Negocio

### Ingresos por Proyecto
- **Paquete Básico:** $300-500 USD (6-8 horas de trabajo)
- **Paquete Premium:** $700-1000 USD (10-15 horas de trabajo) ⭐ Más popular
- **Paquete Enterprise:** $1500-2500 USD (30-40 horas de trabajo)

### Ingresos Recurrentes
- **Mantenimiento:** $50-100/mes por cliente
- **Marketing Digital:** $200-500/mes por cliente
- **Soporte Premium:** $100-200/mes por cliente

### Proyección Realista
- **Mes 1-2:** 2 proyectos × $400 = **$800/mes**
- **Mes 3-4:** 4 proyectos × $500 = **$2,000/mes**
- **Mes 5-6:** 5 proyectos × $600 + recurrentes = **$4,000+/mes**

**Potencial anual:** $20,000-60,000+ USD

---

## 🎯 Clientes Ideales

Este template es perfecto para vender a:

- 💈 **Barberías y peluquerías** - Sistema de turnos
- 💆 **Spas y centros estéticos** - Reservas de tratamientos
- 🍽️ **Restaurantes pequeños** - Reservas de mesas
- 🏋️ **Gimnasios y estudios** - Reservas de clases
- 🏥 **Consultorios médicos** - Agenda de pacientes
- 🎓 **Centros educativos** - Reservas de clases
- 🏪 **Cualquier negocio de servicios** con sistema de citas

---

## ✨ Características Principales

### Para Tu Cliente
- 🎨 **Diseño Moderno y Profesional** - Totalmente responsive
- 📅 **Sistema de Reservas 24/7** - Los clientes reservan en cualquier momento
- 👤 **Panel de Administración** - Gestión fácil de reservas y horarios
- 📱 **Notificaciones WhatsApp** - Alertas automáticas de nuevas reservas
- 🖼️ **Galería de Imágenes** - Muestra tu trabajo
- 💳 **Sección de Servicios** - Con precios y descripciones
- 🌙 **Modo Claro/Oscuro** - Adaptable a preferencias del usuario
- 🔒 **Seguro y Confiable** - Firebase + SSL incluido
- 🚀 **Rápido** - Optimizado para velocidad
- 💰 **Sin Costos Mensuales** - Hosting gratuito en Vercel

### Para Ti (El Vendedor)
- ⚡ **Setup Rápido** - Personaliza en 1-2 horas
- 📚 **Documentación Completa** - Guías paso a paso
- 💼 **Materiales de Venta** - Propuestas, contratos, formularios
- 🔄 **Reutilizable** - Vende a múltiples clientes
- 🛠️ **Script de Setup** - Automatiza configuración inicial
- 📊 **Guías Comerciales** - Estrategias de venta probadas

## 🛠️ Tecnologías

- **Framework**: Next.js 15 con App Router
- **Estilos**: TailwindCSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Base de datos**: Firebase Firestore
- **Autenticación**: Firebase Auth
- **Hosting**: Vercel (recomendado)

## 📦 Instalación Rápida

1. **Clonar o copiar el proyecto**
   ```bash
   # Si usas git
   git clone [tu-repo]
   cd landing-template
   
   # O simplemente copia la carpeta
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   pnpm install
   # o
   yarn install
   ```

3. **Configurar tu negocio**
   
   Edita el archivo `config/business.config.ts` con la información de tu cliente:

   ```typescript
   export const businessConfig = {
     name: "Tu Negocio",
     description: "Descripción de tu negocio",
     industry: "barbershop", // o "salon", "spa", "restaurant", etc.
     // ... más configuraciones
   }
   ```

4. **Configurar Firebase**
   
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
   - Copia las credenciales al archivo `.env.local`:
   
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
   ```

5. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

6. **Construir para producción**
   ```bash
   npm run build
   npm start
   ```

## ⚙️ Personalización

### 1. Información del Negocio
Edita `config/business.config.ts` para cambiar:
- Nombre y descripción
- Colores y branding
- Servicios ofrecidos
- Horarios de atención
- Redes sociales
- Información de contacto

### 2. Imágenes
Reemplaza las imágenes en la carpeta `public/`:
- `hero-image.jpg` - Imagen principal del hero
- `logo.png` - Logo del negocio
- `gallery/` - Imágenes de la galería

### 3. Colores y Estilos
Modifica `app/globals.css` para cambiar la paleta de colores:
```css
:root {
  --primary: tu-color-primario;
  --secondary: tu-color-secundario;
  --accent: tu-color-acento;
}
```

### 4. Secciones
Activa/desactiva secciones en `app/page.tsx`:
```typescript
// Comenta las secciones que no necesites
<ServicesSection />
<GallerySection />
<TestimonialsSection />
<BookingSection />
```

## 🔐 Panel de Administración

Accede a `/admin` con las credenciales de Firebase Auth.

**Funcionalidades del admin:**
- Ver y gestionar reservas
- Aceptar/rechazar reservas
- Configurar horarios de apertura
- Marcar días cerrados
- Ver estadísticas

**Usuario admin por defecto:**
- Configura el email de admin en Firebase Authentication
- El primer usuario registrado será admin

## 📱 WhatsApp (Opcional)

Para habilitar notificaciones por WhatsApp:

1. Edita `config/business.config.ts`:
   ```typescript
   whatsapp: {
     enabled: true,
     number: "1234567890" // número sin +
   }
   ```

2. Las notificaciones se enviarán automáticamente cuando:
   - Un cliente hace una reserva
   - El admin acepta/rechaza una reserva

## 🚀 Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Agrega las variables de entorno de Firebase
3. Despliega con un click

O usa Vercel CLI:
```bash
vercel
```

## 📋 Checklist de Customización

- [ ] Cambiar nombre del negocio en `business.config.ts`
- [ ] Actualizar servicios y precios
- [ ] Reemplazar todas las imágenes
- [ ] Configurar Firebase
- [ ] Personalizar colores
- [ ] Configurar horarios de negocio
- [ ] Agregar redes sociales
- [ ] Configurar WhatsApp (opcional)
- [ ] Agregar contenido de términos y condiciones
- [ ] Probar sistema de reservas
- [ ] Configurar dominio personalizado

## 🎨 Industrias Soportadas

Este template está optimizado para:
- 💈 Barberías
- 💇 Salones de belleza
- 💆 Spas y centros de masajes
- 🍽️ Restaurantes (con sistema de reservas de mesas)
- 🏋️ Gimnasios y centros deportivos
- 🏥 Consultorios médicos/estéticos
- 🎓 Centros educativos (reserva de clases)

## 📞 Soporte

Para soporte técnico o consultas sobre customización, contactar a:
[Tu información de contacto]

## 📄 Licencia

Licencia comercial - Este template puede ser vendido y personalizado para clientes.

---

**Desarrollado con ❤️ para emprendedores digitales**
