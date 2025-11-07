# 📖 Guía de Customización - Landing Template

## 🎯 Pasos para Personalizar el Sitio

### Paso 1: Configuración Básica (5 minutos)

1. **Edita `config/business.config.ts`**
   ```typescript
   name: "Barbería El Corte",
   tagline: "Estilo masculino desde 1990",
   description: "La mejor barbería de la ciudad",
   ```

2. **Actualiza la información de contacto**
   ```typescript
   contact: {
     phone: "+54 9 11 XXXX-XXXX",
     email: "contacto@tuclientenegocio.com",
     address: "Av. Principal 456, Buenos Aires",
   }
   ```

### Paso 2: Servicios y Precios (10 minutos)

Edita el array de `services` en `business.config.ts`:

```typescript
services: [
  {
    id: 1,
    name: "Corte Ejecutivo",           // Nombre del servicio
    description: "Corte profesional",   // Descripción corta
    price: 5000,                        // Precio en tu moneda
    duration: 30,                       // Duración en minutos
    icon: "✂️",                         // Emoji o ícono
    popular: true,                      // Destacar como popular
  },
  // Agrega más servicios...
]
```

**Tips:**
- Máximo 4-6 servicios para mantener el diseño limpio
- Usa `popular: true` en 1-2 servicios principales
- Los precios se mostrarán automáticamente formateados

### Paso 3: Imágenes (15 minutos)

#### Imágenes Requeridas:

1. **Hero Image** (`public/hero-image.jpg`)
   - Tamaño: 1920x1080px mínimo
   - Formato: JPG o PNG
   - Debe representar tu negocio

2. **Logo** (`public/logo.png`)
   - Tamaño: 200x200px
   - Formato: PNG con fondo transparente
   - Versión clara y oscura (opcional)

3. **Galería** (`public/gallery/`)
   - Mínimo 6 imágenes
   - Tamaño: 800x600px
   - Formato: JPG optimizado

4. **Favicon** (`public/favicon.ico`)
   - 32x32px
   - Formato ICO

**Herramientas útiles:**
- [TinyPNG](https://tinypng.com) - Optimizar imágenes
- [Favicon.io](https://favicon.io) - Generar favicons
- [Unsplash](https://unsplash.com) - Imágenes stock gratuitas

### Paso 4: Colores y Branding (10 minutos)

Edita `app/globals.css`:

```css
@layer base {
  :root {
    --primary: 45 80% 50%;        /* Color principal */
    --secondary: 0 0% 10%;         /* Color secundario */
    --accent: 45 80% 50%;          /* Color de acento */
    --background: 0 0% 100%;       /* Fondo */
    --foreground: 0 0% 10%;        /* Texto */
  }

  .dark {
    --primary: 45 80% 40%;
    --background: 0 0% 10%;
    --foreground: 0 0% 100%;
  }
}
```

**Convertir colores hex a HSL:**
- Usa [este convertidor](https://www.rapidtables.com/convert/color/hex-to-hsl.html)
- Ejemplo: `#d4af37` → `45 80% 50%`

### Paso 5: Firebase Setup (20 minutos)

#### 1. Crear proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Click en "Agregar proyecto"
3. Nombra tu proyecto: `nombre-cliente-landing`
4. Desactiva Google Analytics (opcional)
5. Click en "Crear proyecto"

#### 2. Configurar Authentication

1. En el menú, ve a "Authentication"
2. Click en "Comenzar"
3. Habilita "Correo electrónico/contraseña"
4. Guarda

#### 3. Configurar Firestore

1. En el menú, ve a "Firestore Database"
2. Click en "Crear base de datos"
3. Selecciona "Modo de producción"
4. Elige la ubicación más cercana
5. Click en "Habilitar"

#### 4. Configurar reglas de seguridad

En "Reglas" de Firestore, pega:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Bookings - Los usuarios pueden crear y ver sus propias reservas
    match /bookings/{bookingId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.token.email in get(/databases/$(database)/documents/config/admins).data.emails);
    }
    
    // Business hours - Solo lectura pública, escritura admin
    match /businessHours/{day} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.email in get(/databases/$(database)/documents/config/admins).data.emails;
    }
    
    // Config - Solo admin
    match /config/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.token.email in get(/databases/$(database)/documents/config/admins).data.emails;
    }
  }
}
```

#### 5. Obtener credenciales

1. Click en el ícono de configuración ⚙️
2. "Configuración del proyecto"
3. En "Tus apps", click en el ícono web `</>`
4. Registra la app: `nombre-cliente-web`
5. Copia las credenciales

#### 6. Configurar variables de entorno

Crea `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:xxxxx
```

#### 7. Crear usuario administrador

1. En Firebase Authentication, ve a "Users"
2. Click en "Agregar usuario"
3. Agrega email y contraseña del admin
4. En Firestore, crea una colección `config`
5. Crea un documento `admins`:
   ```json
   {
     "emails": ["admin@cliente.com"]
   }
   ```

### Paso 6: Horarios de Negocio (5 minutos)

En `business.config.ts`, configura:

```typescript
businessHours: {
  monday: { open: "09:00", close: "19:00", closed: false },
  tuesday: { open: "09:00", close: "19:00", closed: false },
  wednesday: { open: "09:00", close: "19:00", closed: false },
  thursday: { open: "09:00", close: "19:00", closed: false },
  friday: { open: "09:00", close: "20:00", closed: false },
  saturday: { open: "10:00", close: "18:00", closed: false },
  sunday: { open: "10:00", close: "14:00", closed: true },
}
```

**Nota:** Los admins pueden cambiar estos horarios desde el panel de administración.

### Paso 7: WhatsApp (Opcional - 5 minutos)

Para habilitar notificaciones por WhatsApp:

```typescript
social: {
  whatsapp: {
    enabled: true,
    number: "5491112345678", // SIN espacios ni +
    message: "Hola, quiero consultar sobre",
  }
}
```

**Formato del número:**
- Argentina: `5491112345678` (código país + área + número)
- México: `5215512345678`
- España: `34612345678`

### Paso 8: SEO y Meta Tags (5 minutos)

En `business.config.ts`:

```typescript
seo: {
  title: "Barbería El Corte - Los Mejores Cortes de CABA",
  description: "Barbería premium en Buenos Aires. Cortes modernos, afeitados clásicos. Reservá online.",
  keywords: "barbería, cortes de pelo, afeitado, CABA, Buenos Aires",
  ogImage: "/og-image.jpg", // 1200x630px
}
```

Crea también `public/og-image.jpg` (imagen para redes sociales).

### Paso 9: Probar Todo (10 minutos)

1. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

2. **Checklist de pruebas:**
   - [ ] El sitio carga correctamente
   - [ ] Todas las imágenes se ven bien
   - [ ] Los servicios se muestran correctamente
   - [ ] El sistema de reservas funciona
   - [ ] Puedes iniciar sesión como admin
   - [ ] Las notificaciones de WhatsApp funcionan
   - [ ] El diseño se ve bien en móvil
   - [ ] Los colores son correctos

3. **Prueba crear una reserva de prueba**

4. **Verifica el panel de admin en `/admin`**

### Paso 10: Despliegue (15 minutos)

#### Opción A: Vercel (Recomendado)

1. Crea cuenta en [Vercel](https://vercel.com)
2. Conecta tu repositorio Git
3. Agrega las variables de entorno de Firebase
4. Click en "Deploy"
5. ¡Listo! Tu sitio está online

#### Opción B: Manual

```bash
# Build de producción
npm run build

# Iniciar servidor
npm start
```

---

## 🎨 Customizaciones Avanzadas

### Cambiar Fuentes

Edita `app/layout.tsx`:

```typescript
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' })
```

### Agregar Sección de Blog

1. Crea `app/blog/page.tsx`
2. Agrega al menú en `business.config.ts`
3. Implementa con Firebase o CMS

### Integración con Mercado Pago

Para pagos online:
1. Instala SDK: `npm install mercadopago`
2. Configura credenciales
3. Agrega lógica de pago en el checkout

### Analytics

Para Google Analytics:

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## 🐛 Solución de Problemas

### Error: Firebase no inicializa
- Verifica que `.env.local` existe
- Confirma que las variables comienzan con `NEXT_PUBLIC_`
- Reinicia el servidor de desarrollo

### Las imágenes no cargan
- Verifica que estén en `public/`
- Usa rutas absolutas: `/imagen.jpg`
- Optimiza con Next.js Image

### Los estilos no se aplican
- Limpia caché: `npm run build`
- Verifica que `globals.css` esté importado en `layout.tsx`

---

## 📞 Soporte

¿Necesitas ayuda con la customización?
Contacta a: [tu email de soporte]

**Tiempo total estimado: 1.5 - 2 horas**
