/**
 * Utilidades para integración con WhatsApp
 */

export const WHATSAPP_NUMBERS = {
  centro: "59899220239", // Centro - Mangarelli 585
  real: "59899220239",   // El Real - Roger Balet 201 (mismo número por ahora)
}

interface BookingData {
  nombre: string
  telefono: string
  servicio: string
  sucursal: string
  fecha: string
  hora: string
}

const SERVICES_LABELS: Record<string, string> = {
  "corte-completo": "Corte (incluye barba y cejas)",
  "solo-peine": "Solo peine",
  "estetica-barba": "Estética de barba",
  "mechas": "Mechas",
  "global": "Global",
}

const SUCURSALES_LABELS: Record<string, string> = {
  centro: "Centro - Mangarelli 585",
  real: "El Real - Roger Balet 201",
}

/**
 * Genera el mensaje de WhatsApp para una reserva
 */
export function generateWhatsAppMessage(booking: BookingData): string {
  const serviceLabel = SERVICES_LABELS[booking.servicio] || booking.servicio
  const sucursalLabel = SUCURSALES_LABELS[booking.sucursal] || booking.sucursal
  
  const message = `🪒 *Nueva Reserva - Blades Barbers*

👤 *Cliente:* ${booking.nombre}
📱 *Teléfono:* ${booking.telefono}
📍 *Sucursal:* ${sucursalLabel}
✂️ *Servicio:* ${serviceLabel}
📅 *Fecha:* ${formatDate(booking.fecha)}
🕐 *Hora:* ${booking.hora}

_Reserva realizada desde la web_`

  return message
}

/**
 * Formatea una fecha en formato dd/mm/yyyy
 */
function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-")
  return `${day}/${month}/${year}`
}

/**
 * Abre WhatsApp con un mensaje pre-llenado
 */
export function sendToWhatsApp(booking: BookingData): void {
  const phoneNumber = WHATSAPP_NUMBERS[booking.sucursal as keyof typeof WHATSAPP_NUMBERS] || WHATSAPP_NUMBERS.centro
  const message = generateWhatsAppMessage(booking)
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  
  // Abrir en nueva pestaña
  window.open(whatsappUrl, "_blank")
}

/**
 * Genera el enlace de WhatsApp (sin abrir automáticamente)
 */
export function getWhatsAppLink(booking: BookingData): string {
  const phoneNumber = WHATSAPP_NUMBERS[booking.sucursal as keyof typeof WHATSAPP_NUMBERS] || WHATSAPP_NUMBERS.centro
  const message = generateWhatsAppMessage(booking)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}
