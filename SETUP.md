# 🚀 Guía de Configuración - Blades Barbers

## ✅ Lo que ya tenés instalado
- ✓ Node.js y pnpm
- ✓ Todas las dependencias del proyecto
- ✓ Componentes y páginas configuradas

## 📝 Pasos para que funcione todo

### 1. Crear un proyecto en Firebase

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Hacer clic en "Agregar proyecto" o "Add project"
3. Nombrar el proyecto (ej: "blades-barbers")
4. Seguir los pasos (deshabilitar Google Analytics si querés)
5. Hacer clic en "Crear proyecto"

### 2. Configurar Firebase Authentication

1. En el menú lateral, ir a **Authentication** (Autenticación)
2. Hacer clic en "Get started" o "Comenzar"
3. En la pestaña "Sign-in method", habilitar **Email/Password**
4. Hacer clic en "Enable" y guardar

### 3. Crear un usuario administrador

1. En **Authentication**, ir a la pestaña "Users"
2. Hacer clic en "Add user" (Agregar usuario)
3. Ingresar:
   - **Email**: admin@bladesbarbers.com (o el que prefieras)
   - **Password**: tu contraseña segura
4. Hacer clic en "Add user"

### 4. Configurar Firestore Database

1. En el menú lateral, ir a **Firestore Database**
2. Hacer clic en "Create database"
3. Seleccionar **"Start in production mode"** (o test mode para desarrollo)
4. Elegir la ubicación más cercana (ej: southamerica-east1 para Brasil)
5. Hacer clic en "Enable"

### 5. Configurar las reglas de Firestore (IMPORTANTE)

1. En Firestore, ir a la pestaña **"Rules"**
2. Reemplazar las reglas con esto:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Colección de reservas
    match /reservas/{reservaId} {
      // Permitir lectura y escritura pública para crear reservas
      allow read, create: if true;
      
      // Solo usuarios autenticados pueden actualizar
      allow update, delete: if request.auth != null;
    }
  }
}
```

3. Hacer clic en "Publish" (Publicar)

### 6. Obtener las credenciales de Firebase

1. En Firebase Console, hacer clic en el ícono de ⚙️ (configuración) → **Project settings**
2. Desplazarse hasta "Your apps" (Tus aplicaciones)
3. Hacer clic en el ícono **</>** (Web)
4. Registrar la app:
   - Nombre: "Blades Barbers Web"
   - No marcar Firebase Hosting por ahora
5. Copiar los valores de `firebaseConfig`

### 7. Configurar el archivo `.env.local`

1. Abrir el archivo `.env.local` en la raíz del proyecto
2. Reemplazar los valores con los de tu proyecto Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key-aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id
```

**Ejemplo real:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD1xYz2abc123defgHIJK456lmnOP789
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=blades-barbers-xyz.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=blades-barbers-xyz
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=blades-barbers-xyz.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

### 8. Ejecutar el proyecto

```powershell
# En la terminal de VS Code
pnpm dev
```

El sitio estará disponible en: **http://localhost:3000**

## 🔍 Probar que funciona

### 1. Probar la página principal
- Abrir http://localhost:3000
- Verificar que todas las secciones se vean bien
- Intentar hacer una reserva en la sección "Reservá tu turno"

### 2. Probar el panel de administración
- Ir a http://localhost:3000/login
- Iniciar sesión con el email y contraseña que creaste
- Deberías ver el dashboard con las reservas

### 3. Verificar en Firebase
- En Firestore, deberías ver la colección "reservas" con los datos

## 🛠️ Comandos útiles

```powershell
# Iniciar servidor de desarrollo
pnpm dev

# Crear build de producción
pnpm build

# Iniciar en producción
pnpm start

# Revisar errores de código
pnpm lint
```

## 📱 Características del proyecto

- ✅ Sistema de reservas en tiempo real
- ✅ Panel de administración protegido
- ✅ Gestión de turnos disponibles
- ✅ Autenticación con Firebase
- ✅ Base de datos en Firestore
- ✅ Diseño responsive
- ✅ Tema claro/oscuro

## 🔒 Seguridad

- El archivo `.env.local` ya está en `.gitignore` (no se subirá a Git)
- Las credenciales de Firebase son públicas en el frontend (esto es normal)
- La seguridad real está en las **Firebase Rules** que configuraste
- Solo usuarios autenticados pueden modificar/eliminar reservas

## ❓ Problemas comunes

### "Firebase not configured"
- Verificar que el archivo `.env.local` existe
- Verificar que todas las variables empiezan con `NEXT_PUBLIC_`
- Reiniciar el servidor de desarrollo (`Ctrl+C` y `pnpm dev`)

### "Permission denied" en Firestore
- Verificar las reglas de Firestore
- Asegurarse de que están publicadas correctamente

### No puedo iniciar sesión
- Verificar que creaste el usuario en Firebase Authentication
- Verificar que el email y contraseña son correctos
- Revisar la consola del navegador para ver errores

## 📞 Contacto

Si tenés problemas, revisá:
1. La consola del navegador (F12)
2. La terminal donde corre el servidor
3. Firebase Console → Authentication y Firestore

---

**¡Listo! Tu aplicación de barbería debería estar funcionando completamente.** 💈✂️
