# 🚀 Guía: Desplegar en Vercel

## ¿Qué es Vercel?
- Plataforma de hosting **GRATUITA** para proyectos Next.js
- Despliegue automático en segundos
- HTTPS gratis incluido
- Dominio gratis (.vercel.app)

---

## 📋 Requisitos Previos

✅ Ya tenés:
- [x] Proyecto Next.js funcionando localmente
- [x] Firebase configurado
- [x] Credenciales en `.env.local`

⚠️ Vas a necesitar:
- [ ] Cuenta de GitHub (o crear una nueva)
- [ ] Cuenta de Vercel (gratis)

---

## 🔧 Paso 1: Preparar el Proyecto (Git)

### 1. Verificar que Git esté instalado
En la terminal de VS Code:
```powershell
git --version
```

Si NO está instalado:
- Descargar de: https://git-scm.com/download/win
- Instalar y reiniciar VS Code

### 2. Inicializar repositorio Git (si no existe)
```powershell
git init
git add .
git commit -m "Initial commit - Blades Barbers"
```

**Nota:** El archivo `.env.local` NO se subirá a Git (está en `.gitignore`)

---

## 🌐 Paso 2: Subir a GitHub

### Opción A: Si NO tenés cuenta de GitHub

1. Ir a: **https://github.com/signup**
2. Crear cuenta (gratis):
   - Email
   - Contraseña
   - Username: elige uno único
3. Verificar email
4. Continuar al **Paso 3**

### Opción B: Si YA tenés cuenta de GitHub

1. Ir a: **https://github.com**
2. Iniciar sesión
3. Continuar al **Paso 3**

---

## 📦 Paso 3: Crear Repositorio en GitHub

### 1. Crear nuevo repositorio
- En GitHub, hacer clic en el botón **"+"** (arriba a la derecha)
- Seleccionar **"New repository"**

### 2. Configurar el repositorio
```
Repository name: blades-barbers
Description: Sitio web de Blades Barbers con sistema de reservas
```

**IMPORTANTE:**
- ✅ Marcar como **"Private"** (para que nadie vea tu código)
- ❌ NO marcar "Add a README file"
- ❌ NO agregar .gitignore
- ❌ NO agregar license

### 3. Crear repositorio
- Hacer clic en **"Create repository"**

### 4. Copiar comandos
GitHub te muestra comandos. Copiar esta sección:

```bash
git remote add origin https://github.com/TU-USUARIO/blades-barbers.git
git branch -M main
git push -u origin main
```

---

## 💻 Paso 4: Subir el Código a GitHub

### 1. En VS Code, abrir la terminal

### 2. Configurar Git (primera vez)
```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@gmail.com"
```

### 3. Conectar con GitHub
Pegar los comandos que copiaste:
```powershell
git remote add origin https://github.com/TU-USUARIO/blades-barbers.git
git branch -M main
git push -u origin main
```

### 4. Autenticación
GitHub te va a pedir autenticación:

**Opción 1 - Navegador (Recomendado):**
- Se abre el navegador
- Iniciar sesión en GitHub
- Autorizar VS Code
- ✅ Listo

**Opción 2 - Personal Access Token:**
1. Ir a: https://github.com/settings/tokens
2. Generate new token (classic)
3. Seleccionar permisos: `repo`
4. Copiar el token
5. Usarlo como contraseña cuando Git lo pida

### 5. Verificar
- Ir a tu repositorio en GitHub
- Deberías ver todos los archivos (excepto `.env.local`)
- ✅ Código subido correctamente

---

## 🚀 Paso 5: Desplegar en Vercel

### 1. Crear cuenta en Vercel
- Ir a: **https://vercel.com/signup**
- Hacer clic en **"Continue with GitHub"**
- Autorizar Vercel a acceder a GitHub
- ✅ Cuenta creada

### 2. Importar proyecto
- En el dashboard de Vercel, hacer clic en **"Add New..."**
- Seleccionar **"Project"**
- Buscar tu repositorio: **"blades-barbers"**
- Hacer clic en **"Import"**

### 3. Configurar el proyecto
Vercel detecta automáticamente que es Next.js:

```
Project Name: blades-barbers
Framework Preset: Next.js
Root Directory: ./
Build Command: (dejar por defecto)
Output Directory: (dejar por defecto)
```

**⚠️ IMPORTANTE: Agregar variables de entorno**

### 4. Agregar las variables de entorno
Antes de hacer clic en "Deploy":

1. Expandir la sección **"Environment Variables"**
2. Agregar CADA variable de tu `.env.local`:

```
Key (Name):                                Value:
NEXT_PUBLIC_FIREBASE_API_KEY              AIzaSyBTYjQD5Re02Y2eR4rNxKy6vpRfU0DHllk
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN          bladesbarbers-f0b60.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID           bladesbarbers-f0b60
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET       bladesbarbers-f0b60.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID  120234502859
NEXT_PUBLIC_FIREBASE_APP_ID               1:120234502859:web:671912a121f180fbb2894e
```

**Cómo agregar cada variable:**
- Escribir el **Name** (ej: `NEXT_PUBLIC_FIREBASE_API_KEY`)
- Escribir el **Value** (ej: `AIzaSyBTYjQD5Re02Y2eR4rNxKy6vpRfU0DHllk`)
- Hacer clic en **"Add"**
- Repetir para las 6 variables

### 5. Desplegar
- Verificar que todas las variables están agregadas
- Hacer clic en **"Deploy"**
- Esperar 1-2 minutos (Vercel está construyendo tu sitio)

### 6. ¡Listo!
Cuando termine, vas a ver:
```
🎉 Congratulations!
Your project is live at: https://blades-barbers-xyz.vercel.app
```

- Hacer clic en el link
- ✅ ¡Tu sitio está en internet!

---

## 🔐 Paso 6: Configurar Dominios Autorizados en Firebase

Para que el login funcione en Vercel, necesitás autorizar el dominio:

### 1. Copiar tu URL de Vercel
Ejemplo: `blades-barbers-xyz.vercel.app`

### 2. Ir a Firebase Console
- Ir a: https://console.firebase.google.com/
- Seleccionar tu proyecto: **bladesbarbers-f0b60**

### 3. Ir a Authentication → Settings
- En el menú lateral: **Authentication**
- Pestaña: **Settings**
- Sección: **Authorized domains**

### 4. Agregar dominio de Vercel
- Hacer clic en **"Add domain"**
- Pegar: `blades-barbers-xyz.vercel.app` (tu dominio de Vercel)
- Hacer clic en **"Add"**

✅ **¡Listo! Ahora el login funciona en producción.**

---

## 🧪 Paso 7: Probar el Sitio en Producción

### 1. Abrir tu sitio
Ir a: `https://tu-proyecto.vercel.app`

### 2. Probar la página principal
- Verificar que se ve bien
- Navegar por las secciones
- ✅ Todo debería funcionar

### 3. Probar hacer una reserva
1. Ir a "Reservá tu turno"
2. Completar el formulario
3. Confirmar turno
4. Verificar en Firebase → Firestore que se guardó
5. ✅ Reservas funcionando

### 4. Probar el panel admin
1. Ir a: `https://tu-proyecto.vercel.app/login`
2. Iniciar sesión con tu usuario admin
3. Verificar que ves las reservas
4. ✅ Admin panel funcionando

---

## 📱 Paso 8: Configurar Dominio Personalizado (Opcional)

Si tenés un dominio propio (ej: `bladesbarbers.com`):

### 1. En Vercel
- Ir a tu proyecto
- Pestaña: **Settings**
- Sección: **Domains**
- Agregar tu dominio

### 2. Configurar DNS
Vercel te da instrucciones para configurar:
- Tipo: `CNAME` o `A Record`
- Host: `@` o `www`
- Value: Lo que Vercel te indica

### 3. Esperar propagación
- Tarda 1-24 horas
- Vercel te notifica cuando esté listo

---

## 🔄 Actualizaciones Automáticas

Cada vez que hagas cambios:

```powershell
# 1. Hacer cambios en VS Code
# 2. Guardar archivos

# 3. Subir a GitHub
git add .
git commit -m "Descripción de cambios"
git push

# 4. Vercel detecta el cambio y redespliega automáticamente
# 5. En 1-2 minutos, los cambios están en vivo
```

---

## ✅ Checklist Final

- [ ] Proyecto subido a GitHub
- [ ] Variables de entorno agregadas en Vercel
- [ ] Sitio desplegado en Vercel
- [ ] Dominio de Vercel autorizado en Firebase
- [ ] Página principal funciona
- [ ] Sistema de reservas funciona
- [ ] Panel admin funciona
- [ ] HTTPS habilitado (automático)

---

## 🎉 ¡Felicitaciones!

Tu sitio está **EN VIVO** en internet:
- ✅ Accesible desde cualquier dispositivo
- ✅ HTTPS seguro (candado verde)
- ✅ Dominio profesional (.vercel.app)
- ✅ Actualizaciones automáticas
- ✅ 100% gratis

---

## 📊 Panel de Control de Vercel

En el dashboard de Vercel podés ver:
- 📈 Tráfico y visitas
- ⚡ Velocidad de carga
- 🐛 Errores en producción
- 📝 Logs en tiempo real
- 🔄 Historial de despliegues

---

## 🆘 Problemas Comunes

### Error: "Firebase not configured"
**Solución:**
1. Verificar variables de entorno en Vercel
2. Verificar que empiezan con `NEXT_PUBLIC_`
3. Redesplegar: Vercel → Deployments → ... → Redeploy

### Error: "auth/unauthorized-domain"
**Solución:**
1. Ir a Firebase → Authentication → Settings
2. Agregar el dominio de Vercel a "Authorized domains"

### Cambios no se ven
**Solución:**
1. Limpiar caché del navegador: Ctrl + Shift + R
2. Verificar que el push a GitHub fue exitoso
3. Verificar en Vercel que el deployment fue exitoso

---

## 🔗 Links Importantes

- **Tu sitio:** https://tu-proyecto.vercel.app
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** https://github.com/tu-usuario/blades-barbers
- **Firebase Console:** https://console.firebase.google.com/

---

## 📞 Próximos Pasos

1. **Compartir el link** con tu barbería
2. **Probar desde celular** (es responsive)
3. **Compartir en redes sociales**
4. **Agregar el link a Google My Business**
5. **Considerar un dominio personalizado**

---

**¿Necesitás ayuda con algún paso?** 🚀
