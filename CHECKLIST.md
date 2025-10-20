# ✅ Checklist de Configuración

## Pasos que YA están completos:
- [x] Proyecto Next.js creado
- [x] Dependencias instaladas (pnpm install)
- [x] Componentes UI configurados
- [x] Páginas creadas (Home, Login, Admin)
- [x] Sistema de reservas implementado
- [x] Integración con Firebase lista
- [x] Archivo .env.local creado

## Pasos que VOS tenés que hacer:

### 1. [ ] Crear proyecto en Firebase Console
   - Ir a: https://console.firebase.google.com/
   - Crear nuevo proyecto

### 2. [ ] Habilitar Authentication
   - Email/Password method

### 3. [ ] Crear usuario administrador
   - Email: admin@bladesbarbers.com (o el que quieras)
   - Contraseña: (elegir una segura)

### 4. [ ] Crear Firestore Database
   - Mode: Production o Test mode

### 5. [ ] Configurar reglas de Firestore
   - Copiar las reglas del archivo SETUP.md

### 6. [ ] Obtener credenciales de Firebase
   - Project Settings → Your apps → Web app
   - Copiar el firebaseConfig

### 7. [ ] Completar archivo .env.local
   - Pegar las credenciales de Firebase
   - Guardar el archivo

### 8. [ ] Iniciar el servidor
   - Ejecutar: pnpm dev
   - Abrir: http://localhost:3000

### 9. [ ] Probar reserva
   - Completar formulario de reserva
   - Verificar en Firestore que se guardó

### 10. [ ] Probar panel admin
   - Ir a: http://localhost:3000/login
   - Iniciar sesión
   - Verificar que ves las reservas

---

## 🎯 Tiempo estimado: 15-20 minutos

**Lee el archivo SETUP.md para instrucciones detalladas paso a paso.**
