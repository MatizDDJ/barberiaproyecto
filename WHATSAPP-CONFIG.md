# 📱 Integración de WhatsApp - Configuración

## ✅ ¿Qué se implementó?

Ahora cuando un cliente hace una reserva, puede enviar los detalles directamente a WhatsApp de la barbería con un solo clic.

### Flujo implementado:
1. Cliente completa el formulario de reserva
2. Se guarda en Firebase
3. Aparece pantalla de confirmación
4. **NUEVO**: Botón "Enviar por WhatsApp"
5. Se abre WhatsApp con mensaje pre-llenado
6. Cliente hace clic en enviar
7. La barbería recibe la confirmación

---

## 🔧 Configuración del Número de WhatsApp

### Ubicación del archivo:
📄 `lib/whatsapp.ts`

### Números actuales:
```typescript
export const WHATSAPP_NUMBERS = {
  centro: "59899220239", // Centro - Mangarelli 585
  real: "59899220239",   // El Real - Roger Balet 201
}
```

### Para cambiar los números:

1. **Abrir el archivo:**
   - `lib/whatsapp.ts`

2. **Modificar los números:**
   ```typescript
   export const WHATSAPP_NUMBERS = {
     centro: "59899220239", // ← Cambiar este número
     real: "59899220239",   // ← Cambiar este número
   }
   ```

3. **Formato del número:**
   - ✅ **Correcto**: `"59899220239"` (código país + número sin espacios)
   - ❌ **Incorrecto**: `"099 220 239"` (sin código de país)
   - ❌ **Incorrecto**: `"+598 99 220 239"` (con espacios)

4. **Ejemplos:**
   ```typescript
   // Uruguay
   centro: "59899123456"  // Código país 598 + 099123456
   
   // Argentina
   centro: "5491123456789"  // Código país 549 + 11 + número
   
   // Brasil
   centro: "5511987654321"  // Código país 55 + 11 + número
   ```

---

## 📋 Formato del Mensaje

### Mensaje que se envía:
```
🪒 *Nueva Reserva - Blades Barbers*

👤 *Cliente:* Juan Pérez
📱 *Teléfono:* 099 123 456
📍 *Sucursal:* Centro - Mangarelli 585
✂️ *Servicio:* Corte (incluye barba y cejas)
📅 *Fecha:* 10/11/2025
🕐 *Hora:* 15:00

_Reserva realizada desde la web_
```

### Para personalizar el mensaje:

Editar la función `generateWhatsAppMessage` en `lib/whatsapp.ts`:

```typescript
export function generateWhatsAppMessage(booking: BookingData): string {
  const message = `🪒 *Nueva Reserva - Blades Barbers*

👤 *Cliente:* ${booking.nombre}
📱 *Teléfono:* ${booking.telefono}
// ... resto del mensaje
`
  return message
}
```

**Puedes:**
- ✅ Cambiar los emojis
- ✅ Agregar más información
- ✅ Cambiar el formato
- ✅ Agregar enlaces o promociones

---

## 🎨 Personalización Visual

### Botón de WhatsApp

El botón usa el color oficial de WhatsApp: `#25D366`

Para cambiar el estilo, editar en `booking-section.tsx`:

```tsx
<Button
  type="button"
  onClick={() => sendToWhatsApp(formData)}
  className="bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2 mx-auto"
>
  // ... contenido
</Button>
```

---

## 🔄 Números Diferentes por Sucursal

### Opción 1: Números separados (YA SOPORTADO)
```typescript
export const WHATSAPP_NUMBERS = {
  centro: "59899220239",  // Número del Centro
  real: "59899555555",    // Número de El Real
}
```

### Opción 2: Mismo número para todas
```typescript
export const WHATSAPP_NUMBERS = {
  centro: "59899220239",
  real: "59899220239",  // Mismo número
}
```

---

## 🧪 Cómo Probar

### 1. En desarrollo (localhost):
1. Hacer una reserva de prueba
2. Completar todos los campos
3. Enviar formulario
4. Hacer clic en "Enviar por WhatsApp"
5. Se abre WhatsApp Web o la app
6. Verificar que el mensaje está correcto
7. **NO enviar** (es solo prueba)

### 2. En tu teléfono:
1. Abrir el sitio desde el móvil
2. Hacer reserva de prueba
3. Clic en botón de WhatsApp
4. Se abre la app de WhatsApp
5. El mensaje aparece pre-llenado
6. Puedes editarlo antes de enviar

---

## 🎯 Ventajas de Esta Implementación

### Para el cliente:
✅ Confirmación rápida en WhatsApp  
✅ Mensaje pre-llenado (no tiene que escribir)  
✅ Puede agregar notas adicionales antes de enviar  
✅ Queda registrado en su chat de WhatsApp  

### Para la barbería:
✅ Recibís confirmaciones directas por WhatsApp  
✅ Tenés el número del cliente para contactar  
✅ Podés responder confirmando o sugiriendo cambios  
✅ Chat directo para recordatorios futuros  

### Para el sistema:
✅ La reserva ya está en Firebase (no se pierde)  
✅ WhatsApp es OPCIONAL (no bloquea la reserva)  
✅ El cliente decide si envía o no  

---

## 📱 Flujo Completo Recomendado

### Cuando llega un mensaje por WhatsApp:

1. **Leer el mensaje** con los datos de la reserva
2. **Ir al panel admin** (http://localhost:3001/admin)
3. **Buscar la reserva** en la lista
4. **Confirmar el turno** desde el admin
5. **Responder por WhatsApp**: 
   ```
   ✅ ¡Listo! Tu turno está confirmado para el [fecha] a las [hora].
   
   📍 Te esperamos en [sucursal]
   
   Si necesitás cancelar o cambiar, avisanos por acá.
   
   Saludos,
   Blades Barbers ✂️
   ```

---

## 🔐 Seguridad y Privacidad

### ¿Es seguro?
✅ **Sí**, porque:
- El número de la barbería es público (no es privado)
- El cliente decide si envía o no
- WhatsApp encripta los mensajes
- No se expone información sensible

### ¿Qué datos se comparten?
- Nombre del cliente
- Teléfono del cliente
- Fecha y hora de la reserva
- Servicio solicitado
- Sucursal elegida

### ¿Qué NO se comparte?
- ❌ Datos de pago (no los capturamos)
- ❌ Contraseñas
- ❌ Información de otras reservas
- ❌ Datos de otros clientes

---

## 🆘 Troubleshooting

### El botón no abre WhatsApp
**Causa:** Bloqueador de pop-ups  
**Solución:** Permitir pop-ups para el sitio

### Se abre WhatsApp Web en lugar de la app
**Causa:** En desktop es el comportamiento normal  
**Solución:** Desde móvil se abre la app directamente

### El número no es reconocido
**Causa:** Formato incorrecto del número  
**Solución:** Verificar que tiene código de país sin espacios

### El mensaje tiene caracteres raros
**Causa:** Emojis no soportados  
**Solución:** Usar emojis estándar o texto plano

---

## 💡 Ideas para Expandir

### 1. Recordatorio Automático (Próximamente)
- 24 horas antes, enviar recordatorio automático
- Requiere: Firebase Cloud Functions + Twilio/WhatsApp API

### 2. Confirmación Bidireccional
- Cliente responde "Confirmo" o "Cancelo"
- Requiere: Webhook de WhatsApp Business API

### 3. Template Messages
- Mensajes aprobados por WhatsApp
- Mayor formalidad
- Requiere: WhatsApp Business API

---

## 📞 Números de WhatsApp de las Sucursales

### Centro
- **Número actual**: +598 99 220 239
- **Ubicación**: Mangarelli 585

### El Real
- **Número actual**: +598 99 220 239 (mismo)
- **Ubicación**: Roger Balet 201

**Para actualizar:**  
Editar `WHATSAPP_NUMBERS` en `lib/whatsapp.ts`

---

## ✅ Checklist de Configuración

- [x] Implementado botón de WhatsApp
- [x] Mensaje formateado correctamente
- [x] Funciona en desktop y móvil
- [ ] Configurar números de WhatsApp correctos
- [ ] Probar desde el móvil
- [ ] Definir mensaje de respuesta estándar
- [ ] Capacitar al equipo sobre cómo responder

---

**¡La integración de WhatsApp está lista para usar!** 🚀

Solo falta que verifiques/actualices los números en `lib/whatsapp.ts` si es necesario.
