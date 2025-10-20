# 🔥 Guía COMPLETA: Cómo Registrarse en Firebase

## 📝 Paso 1: Crear Cuenta de Google (si no tenés)

Si ya tenés una cuenta de Gmail, **saltá al Paso 2**.

Si no tenés:
1. Ir a https://accounts.google.com/signup
2. Completar el formulario
3. Verificar tu email
4. Listo, ya tenés cuenta de Google

---

## 🚀 Paso 2: Registrarse en Firebase Console

### 1. Abrir Firebase Console
- Ir a: **https://console.firebase.google.com/**
- Hacer clic en **"Comenzar"** o **"Get Started"**
- Iniciar sesión con tu cuenta de Google

### 2. Aceptar los términos
- Leer y aceptar los términos de servicio
- Hacer clic en **"Continuar"** o **"Continue"**

---

## 🏗️ Paso 3: Crear tu Primer Proyecto

### 1. Crear nuevo proyecto
En la pantalla principal, vas a ver un botón grande que dice:
- **"Agregar proyecto"** o **"Add project"**
- Hacer clic ahí

### 2. Configurar el proyecto (Pantalla 1 de 3)
```
Nombre del proyecto: blades-barbers
                     (o el nombre que quieras)

ID del proyecto: blades-barbers-xyz123
                (se genera automáticamente, podés cambiarlo)
```
- Hacer clic en **"Continuar"**

### 3. Google Analytics (Pantalla 2 de 3)
Te pregunta si querés habilitar Google Analytics:
- **Recomendación**: Deshabilitar por ahora (podés activarlo después)
- Hacer clic en el switch para **deshabilitarlo**
- Hacer clic en **"Crear proyecto"**

### 4. Esperar (Pantalla 3 de 3)
- Firebase está creando tu proyecto (tarda 30-60 segundos)
- Cuando termine, hacer clic en **"Continuar"**

---

## 🔐 Paso 4: Configurar Authentication (Autenticación)

### 1. Ir a Authentication
En el menú lateral izquierdo:
- Buscar **"Authentication"** (ícono de candado 🔒)
- Hacer clic

### 2. Iniciar Authentication
Vas a ver un botón grande:
- **"Get started"** o **"Comenzar"**
- Hacer clic

### 3. Habilitar Email/Password
Vas a ver una lista de métodos de inicio de sesión:

```
- Email/Password          [Deshabilitado]
- Google                  [Deshabilitado]
- Facebook                [Deshabilitado]
- GitHub                  [Deshabilitado]
- ... etc
```

**Hacer esto:**
1. Hacer clic en **"Email/Password"**
2. Se abre un modal/ventana
3. Activar el primer switch: **"Email/Password"** → Habilitar (Enable)
4. El segundo switch ("Email link") dejarlo **deshabilitado**
5. Hacer clic en **"Save"** o **"Guardar"**

### 4. Crear tu usuario administrador
Ahora vamos a crear el usuario que vas a usar para iniciar sesión:

1. Ir a la pestaña **"Users"** (arriba)
2. Hacer clic en **"Add user"** o **"Agregar usuario"**
3. Completar:
   ```
   Email: admin@bladesbarbers.com
   (o el email que quieras usar)
   
   Password: TuContraseñaSegura123!
   (elegí una que recuerdes)
   ```
4. Hacer clic en **"Add user"**

✅ **¡Listo! Ya tenés tu usuario administrador creado.**

---

## 💾 Paso 5: Configurar Firestore Database

### 1. Ir a Firestore
En el menú lateral izquierdo:
- Buscar **"Firestore Database"** (ícono de base de datos 🗄️)
- Hacer clic

### 2. Crear la base de datos
Vas a ver un botón:
- **"Create database"** o **"Crear base de datos"**
- Hacer clic

### 3. Elegir modo de seguridad
Te pregunta: **"Start in production mode or test mode?"**

**Opción 1 - Producción (Recomendado):**
- Seleccionar **"Start in production mode"**
- Hacer clic en **"Next"** o **"Siguiente"**
- (Después vamos a configurar las reglas manualmente)

**Opción 2 - Modo Test (Para probar):**
- Seleccionar **"Start in test mode"**
- Solo para desarrollo, permite acceso total por 30 días
- Hacer clic en **"Next"**

### 4. Elegir ubicación
Te muestra un mapa y opciones de ubicación:

**Recomendaciones por país:**
```
🇦🇷 Argentina → southamerica-east1 (São Paulo)
🇺🇾 Uruguay   → southamerica-east1 (São Paulo)
🇨🇱 Chile     → southamerica-west1 (Santiago)
🇧🇷 Brasil    → southamerica-east1 (São Paulo)
🇪🇸 España    → europe-west1 (Belgium)
🇲🇽 México    → us-central1 (Iowa)
```

- Seleccionar la más cercana a vos
- Hacer clic en **"Enable"** o **"Habilitar"**
- Esperar 1-2 minutos mientras se crea

### 5. Configurar las reglas de seguridad
Una vez creada la base de datos:

1. Hacer clic en la pestaña **"Rules"** (arriba)
2. Vas a ver algo como esto:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if false;
       }
     }
   }
   ```

3. **BORRAR TODO** y reemplazar con esto:
   ```javascript
   rules_version = '2';
   
   service cloud.firestore {
     match /databases/{database}/documents {
       // Colección de reservas
       match /reservas/{reservaId} {
         // Permitir a cualquiera leer y crear reservas
         allow read, create: if true;
         
         // Solo usuarios autenticados pueden actualizar/eliminar
         allow update, delete: if request.auth != null;
       }
     }
   }
   ```

4. Hacer clic en **"Publish"** o **"Publicar"**
5. Confirmar en el modal que aparece

✅ **¡Firestore configurado correctamente!**

---

## 🔑 Paso 6: Obtener las Credenciales

### 1. Ir a Project Settings
- Hacer clic en el ícono de **⚙️ engranaje** (arriba a la izquierda, al lado de "Project Overview")
- Seleccionar **"Project settings"** o **"Configuración del proyecto"**

### 2. Crear una app web
Vas a ver una sección que dice **"Your apps"** o **"Tus aplicaciones"**:

Abajo vas a ver 4 íconos:
```
[  iOS  ] [ Android ] [  Web  ] [ Unity ]
   🍎        🤖          </>        🎮
```

1. Hacer clic en el ícono **</>** (Web)
2. Te pide un nombre:
   ```
   App nickname: Blades Barbers Web
   ```
3. **NO** marcar "Firebase Hosting" (por ahora)
4. Hacer clic en **"Register app"** o **"Registrar app"**

### 3. Copiar las credenciales
Ahora te muestra un código que se ve así:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD1xYz2abc123defgHIJK456lmnOP789",
  authDomain: "blades-barbers-xyz.firebaseapp.com",
  projectId: "blades-barbers-xyz",
  storageBucket: "blades-barbers-xyz.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};

const firebaseConfig = {
  apiKey: "AIzaSyBTYjQD5Re02Y2eR4rNxKy6vpRfU0DHllk",
  authDomain: "bladesbarbers-f0b60.firebaseapp.com",
  projectId: "bladesbarbers-f0b60",
  storageBucket: "bladesbarbers-f0b60.firebasestorage.app",
  messagingSenderId: "120234502859",
  appId: "1:120234502859:web:671912a121f180fbb2894e",
  measurementId: "G-2RRLJQPKGM"
```

**IMPORTANTE: Estos son tus valores únicos. Copialos!**

### 4. Continuar
- Hacer clic en **"Continue to console"** o **"Continuar a la consola"**

---

## 📝 Paso 7: Configurar tu Proyecto Local

### 1. Abrir VS Code
- Abrir tu proyecto `barberiaproyecto`
- Buscar el archivo **`.env.local`** en la raíz

### 2. Editar `.env.local`
Vas a ver esto:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key-aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id
```

### 3. Reemplazar con TUS valores
Usando los valores que copiaste de Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD1xYz2abc123defgHIJK456lmnOP789
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=blades-barbers-xyz.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=blades-barbers-xyz
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=blades-barbers-xyz.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

### 4. Guardar el archivo
- **Ctrl + S** para guardar
- ✅ ¡Credenciales configuradas!

---

## 🎯 Paso 8: Probar que Funciona

### 1. Iniciar el servidor
En la terminal de VS Code:
```powershell
pnpm dev
```

Deberías ver:
```
▲ Next.js 15.2.4
- Local:   http://localhost:3000
```

### 2. Abrir en el navegador
- Abrir **Google Chrome** (o tu navegador)
- Ir a: **http://localhost:3000**

### 3. Probar la página principal
- Deberías ver el sitio de Blades Barbers
- Navegar por las secciones
- ✅ Si se ve bien, todo está funcionando

### 4. Probar hacer una reserva
1. Ir a la sección **"Reservá tu turno"**
2. Completar:
   - Nombre: Juan Pérez
   - Teléfono: 099 123 456
   - Servicio: Corte clásico
   - Fecha: Elegir mañana
   - Hora: Elegir un horario
3. Hacer clic en **"Confirmar turno"**
4. Deberías ver: **"¡Turno confirmado!"**

### 5. Verificar en Firebase
1. Volver a Firebase Console
2. Ir a **Firestore Database**
3. Deberías ver una colección **"reservas"**
4. Hacer clic y ver tu reserva
5. ✅ ¡Funciona!

### 6. Probar el panel de administración
1. Ir a: **http://localhost:3000/login**
2. Iniciar sesión:
   - Email: admin@bladesbarbers.com (el que creaste)
   - Password: Tu contraseña
3. Hacer clic en **"Ingresar"**
4. Deberías ver el dashboard con las reservas
5. ✅ ¡Panel admin funcionando!

---

## ✅ Resumen de lo que hiciste:

- [x] Te registraste en Firebase
- [x] Creaste un proyecto
- [x] Configuraste Authentication
- [x] Creaste un usuario administrador
- [x] Configuraste Firestore Database
- [x] Configuraste las reglas de seguridad
- [x] Obtuviste las credenciales
- [x] Las pegaste en `.env.local`
- [x] Probaste el sitio web
- [x] Probaste el panel admin

---

## 🎉 ¡Felicitaciones!

Tu aplicación de barbería está **100% funcional**.

## 🆘 Si algo no funciona:

### Error: "Firebase not configured"
**Solución:**
1. Verificar que `.env.local` tiene todos los valores
2. Verificar que las variables empiezan con `NEXT_PUBLIC_`
3. Reiniciar el servidor: `Ctrl+C` y luego `pnpm dev`

### Error: "Permission denied" en Firestore
**Solución:**
1. Ir a Firestore → Rules
2. Verificar que las reglas están publicadas
3. Verificar que la colección se llama "reservas"

### No puedo iniciar sesión
**Solución:**
1. Verificar que el usuario existe en Authentication → Users
2. Verificar el email y contraseña
3. Abrir la consola del navegador (F12) para ver errores

---

## 📱 Siguientes Pasos (Opcional):

1. **Personalizar el sitio:**
   - Cambiar textos
   - Cambiar imágenes
   - Modificar servicios

2. **Desplegar en internet:**
   - Usar Vercel (gratis)
   - Guía: https://vercel.com/docs

3. **Agregar más funciones:**
   - Notificaciones por email
   - WhatsApp integration
   - Recordatorios automáticos

---

**¿Tenés alguna duda en algún paso específico?** 🤔
