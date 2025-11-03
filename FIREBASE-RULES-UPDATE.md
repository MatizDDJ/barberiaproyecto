# 🔧 Actualización de Reglas de Firebase - Horarios de Negocio

## ⚠️ Problema
El editor de horarios da error porque Firebase no tiene permisos configurados para la colección `settings`.

## ✅ Solución: Actualizar las Reglas de Firestore

### 1. Ir a Firebase Console
1. Abrir [Firebase Console](https://console.firebase.google.com/)
2. Seleccionar tu proyecto (bladesbarbers-f0b60 o el que hayas creado)

### 2. Ir a Firestore Database
1. En el menú lateral izquierdo, hacer clic en **"Firestore Database"**
2. Hacer clic en la pestaña **"Rules"** (arriba)

### 3. Reemplazar las reglas actuales

**BORRAR** las reglas actuales y **PEGAR** estas nuevas:

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
    
    // Colección de configuración (horarios, etc)
    match /settings/{settingId} {
      // Cualquiera puede leer los horarios (para mostrar en la web)
      allow read: if true;
      
      // Solo usuarios autenticados pueden escribir/actualizar
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

### 4. Publicar las reglas
1. Hacer clic en el botón **"Publish"** o **"Publicar"** (arriba a la derecha)
2. Confirmar en el modal que aparece
3. Esperar a que diga "Rules published successfully"

### 5. Verificar
✅ Las reglas deberían verse algo así:

```
✓ reservas (colección)
  - Lectura/Creación: Pública
  - Actualización/Eliminación: Solo admin autenticado

✓ settings (colección)
  - Lectura: Pública
  - Escritura: Solo admin autenticado
```

## 🎯 ¿Qué hace cada regla?

### Para `reservas`:
- **`allow read, create: if true`**: Cualquier usuario puede ver las reservas y crear nuevas
- **`allow update, delete: if request.auth != null`**: Solo el admin autenticado puede modificar o eliminar

### Para `settings`:
- **`allow read: if true`**: Cualquiera puede leer los horarios (para mostrar "Abierto/Cerrado")
- **`allow create, update, delete: if request.auth != null`**: Solo el admin puede cambiar los horarios

## 🔐 Seguridad

✅ **Es seguro** porque:
- Los usuarios normales pueden ver horarios pero NO modificarlos
- Solo el admin autenticado (tú) puede cambiar horarios desde `/admin`
- Firebase verifica la autenticación antes de permitir cambios

## ✅ Después de publicar

1. Recargar la página del admin: http://localhost:3001/admin
2. Ir a la pestaña "Horarios"
3. Hacer un cambio de prueba
4. Hacer clic en "Guardar Cambios"
5. ✅ Debería funcionar sin errores

---

## 🆘 Si sigue dando error

### Error: "Permission denied"
**Causa**: Las reglas no se aplicaron correctamente  
**Solución**: 
1. Volver a Firebase Console → Firestore → Rules
2. Verificar que las reglas están publicadas
3. Esperar 1-2 minutos (a veces tarda en propagarse)
4. Refrescar la página del admin

### Error: "Missing or insufficient permissions"
**Causa**: No estás autenticado como admin  
**Solución**:
1. Ir a http://localhost:3001/login
2. Iniciar sesión con tu usuario admin
3. Volver a intentar

### Error en la consola del navegador
**Solución**:
1. Abrir la consola del navegador (F12)
2. Buscar el error específico
3. Copiar el mensaje completo para debugging

---

## 📝 Notas Importantes

- ⚠️ **NO uses `allow read, write: if true;`** en `settings` - eso permitiría que cualquiera modifique los horarios
- ✅ La configuración actual es segura y correcta
- 🔄 Los cambios en las reglas se aplican inmediatamente (puede tardar 1-2 minutos máximo)
- 📱 Estas reglas funcionan tanto en desarrollo como en producción

---

## 🎉 ¡Listo!

Una vez publicadas las nuevas reglas, el editor de horarios funcionará perfectamente y podrás:
- ✅ Ver horarios en el footer (público)
- ✅ Editar horarios desde el admin (solo tú)
- ✅ Generar slots de reserva automáticamente según los horarios

**¡Ahora sí todo debería funcionar!** 🚀
