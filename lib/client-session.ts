// Sistema de gestión de sesión del cliente
// Usa localStorage para persistir reservas sin necesidad de autenticación

export interface ClientSession {
  id: string
  nombre: string
  telefono: string
  createdAt: number
}

export interface ClientBookingWithId {
  bookingId: string
  nombre: string
  telefono: string
  servicio: string
  fecha: string
  hora: string
  estado: "pendiente" | "confirmado" | "cancelado" | "completado"
  createdAt: number
}

const SESSION_KEY = "blades_client_session"
const BOOKINGS_KEY = "blades_client_bookings"

// Generar ID único para la sesión
function generateSessionId(): string {
  return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Crear o recuperar sesión del cliente
export function getOrCreateClientSession(nombre?: string, telefono?: string): ClientSession {
  const existingSession = localStorage.getItem(SESSION_KEY)

  if (existingSession) {
    return JSON.parse(existingSession)
  }

  const newSession: ClientSession = {
    id: generateSessionId(),
    nombre: nombre || "",
    telefono: telefono || "",
    createdAt: Date.now(),
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(newSession))
  return newSession
}

// Actualizar información de sesión
export function updateClientSession(nombre: string, telefono: string): ClientSession {
  const session = getOrCreateClientSession()
  session.nombre = nombre
  session.telefono = telefono
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

// Obtener sesión actual (si existe)
export function getCurrentSession(): ClientSession | null {
  const session = localStorage.getItem(SESSION_KEY)
  return session ? JSON.parse(session) : null
}

// Guardar reserva en el historial del cliente
export function saveClientBooking(bookingId: string, bookingData: Omit<ClientBookingWithId, "bookingId">) {
  const bookings = getClientBookings()
  const newBooking: ClientBookingWithId = {
    bookingId,
    ...bookingData,
  }

  bookings.push(newBooking)
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
}

// Obtener todas las reservas del cliente
export function getClientBookings(): ClientBookingWithId[] {
  const bookings = localStorage.getItem(BOOKINGS_KEY)
  return bookings ? JSON.parse(bookings) : []
}

// Obtener reservas activas (pendientes o confirmadas)
export function getActiveBookings(): ClientBookingWithId[] {
  const bookings = getClientBookings()
  return bookings.filter(
    (b) => b.estado === "pendiente" || b.estado === "confirmado"
  )
}

// Actualizar estado de una reserva local
export function updateLocalBookingStatus(
  bookingId: string,
  estado: "pendiente" | "confirmado" | "cancelado" | "completado"
) {
  const bookings = getClientBookings()
  const updated = bookings.map((b) =>
    b.bookingId === bookingId ? { ...b, estado } : b
  )
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated))
}

// Cancelar una reserva (actualiza Firebase y localStorage)
export async function cancelClientBooking(bookingId: string): Promise<void> {
  const { updateDoc, doc } = await import("firebase/firestore")
  const { db } = await import("./firebase")

  if (!db) {
    throw new Error("Firebase no está configurado")
  }

  // Actualizar en Firebase
  const bookingRef = doc(db, "reservas", bookingId)
  await updateDoc(bookingRef, {
    estado: "cancelado",
    canceladoAt: new Date().toISOString(),
  })

  // Actualizar en localStorage
  updateLocalBookingStatus(bookingId, "cancelado")
}

// Limpiar reservas antiguas (más de 30 días)
export function cleanOldBookings() {
  const bookings = getClientBookings()
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
  const filtered = bookings.filter((b) => b.createdAt > thirtyDaysAgo)
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered))
}

// Limpiar toda la sesión (útil para testing)
export function clearClientSession() {
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(BOOKINGS_KEY)
}
