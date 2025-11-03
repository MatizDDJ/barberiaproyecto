import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  orderBy,
  Timestamp,
} from "firebase/firestore"
import { db, isFirebaseConfigured } from "./firebase"
import { getBusinessHours } from "./business-hours"

export interface Booking {
  id?: string
  nombre: string
  telefono: string
  servicio: string
  sucursal: string
  fecha: string
  hora: string
  estado: "pendiente" | "confirmado" | "cancelado" | "completado"
  createdAt?: Timestamp
}

const mockBookings: Booking[] = []

// Create a new booking
export async function createBooking(booking: Omit<Booking, "id" | "createdAt">) {
  if (!isFirebaseConfigured || !db) {
    const isAvailable = await checkAvailability(booking.fecha, booking.hora, booking.sucursal)
    if (!isAvailable) {
      throw new Error("Este horario ya está reservado")
    }

    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: Timestamp.now(),
    }
    mockBookings.push(newBooking)
    return { success: true, id: newBooking.id }
  }

  try {
    const isAvailable = await checkAvailability(booking.fecha, booking.hora, booking.sucursal)
    if (!isAvailable) {
      throw new Error("Este horario ya está reservado")
    }

    const docRef = await addDoc(collection(db, "reservas"), {
      ...booking,
      createdAt: Timestamp.now(),
    })
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error("Error creating booking:", error)
    throw error
  }
}

// Check if a time slot is available
export async function checkAvailability(fecha: string, hora: string, sucursal: string): Promise<boolean> {
  if (!isFirebaseConfigured || !db) {
    const bookedSlots = mockBookings.filter(
      (b) => b.fecha === fecha && b.hora === hora && b.sucursal === sucursal && ["pendiente", "confirmado"].includes(b.estado),
    )
    return bookedSlots.length === 0
  }

  const q = query(
    collection(db, "reservas"),
    where("fecha", "==", fecha),
    where("hora", "==", hora),
    where("sucursal", "==", sucursal),
    where("estado", "in", ["pendiente", "confirmado"]),
  )

  const querySnapshot = await getDocs(q)
  return querySnapshot.empty
}

// Get available time slots for a specific date and sucursal
export async function getAvailableSlots(fecha: string, sucursal: string): Promise<string[]> {
  // Obtener horarios configurados para ese día específico
  const selectedDate = new Date(fecha + "T12:00:00")
  const dayNames: ("domingo" | "lunes" | "martes" | "miercoles" | "jueves" | "viernes" | "sabado")[] = [
    "domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"
  ]
  const selectedDay = dayNames[selectedDate.getDay()]
  
  const businessHours = await getBusinessHours()
  const daySchedule = businessHours[selectedDay]
  
  // Si el negocio está cerrado ese día, no hay slots disponibles
  if (!daySchedule.isOpen) {
    return []
  }
  
  // Generar slots basados en los horarios del negocio
  const allSlots = generateTimeSlotsForDay(daySchedule.openTime, daySchedule.closeTime)

  if (!isFirebaseConfigured || !db) {
    const bookedSlots = mockBookings
      .filter((b) => b.fecha === fecha && b.sucursal === sucursal && ["pendiente", "confirmado"].includes(b.estado))
      .map((b) => b.hora)
    return allSlots.filter((slot) => !bookedSlots.includes(slot))
  }

  const q = query(
    collection(db, "reservas"),
    where("fecha", "==", fecha),
    where("sucursal", "==", sucursal),
    where("estado", "in", ["pendiente", "confirmado"]),
  )

  const querySnapshot = await getDocs(q)
  const bookedSlots = querySnapshot.docs.map((doc) => doc.data().hora)

  return allSlots.filter((slot) => !bookedSlots.includes(slot))
}

// Generate time slots from 10:00 to 20:00 in 30-minute intervals (fallback)
function generateTimeSlots(): string[] {
  const slots: string[] = []
  for (let hour = 10; hour < 20; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`)
    slots.push(`${hour.toString().padStart(2, "0")}:30`)
  }
  slots.push("20:00")
  return slots
}

// Generate time slots for a specific time range in 30-minute intervals
function generateTimeSlotsForDay(startTime: string, endTime: string): string[] {
  const slots: string[] = []
  const [startHour, startMin] = startTime.split(":").map(Number)
  const [endHour, endMin] = endTime.split(":").map(Number)
  
  let currentHour = startHour
  let currentMin = startMin
  
  // Generar slots hasta la hora de cierre (incluyendo la hora de cierre)
  while (currentHour < endHour || (currentHour === endHour && currentMin <= endMin)) {
    slots.push(`${String(currentHour).padStart(2, "0")}:${String(currentMin).padStart(2, "0")}`)
    
    currentMin += 30
    if (currentMin >= 60) {
      currentMin = 0
      currentHour++
    }
  }
  
  return slots
}

// Update booking status
export async function updateBookingStatus(bookingId: string, estado: "confirmado" | "cancelado" | "completado") {
  if (!isFirebaseConfigured || !db) {
    const booking = mockBookings.find((b) => b.id === bookingId)
    if (booking) {
      booking.estado = estado
    }
    return { success: true }
  }

  try {
    const bookingRef = doc(db, "reservas", bookingId)
    await updateDoc(bookingRef, { estado })
    return { success: true }
  } catch (error) {
    console.error("Error updating booking:", error)
    throw error
  }
}

// Subscribe to bookings in real-time
export function subscribeToBookings(callback: (bookings: Booking[]) => void) {
  if (!isFirebaseConfigured || !db) {
    callback(mockBookings)
    return () => {}
  }

  const q = query(collection(db, "reservas"), orderBy("createdAt", "desc"))

  return onSnapshot(q, (querySnapshot) => {
    const bookings: Booking[] = []
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() } as Booking)
    })
    callback(bookings)
  })
}

// Get bookings filtered by date and/or status
export async function getFilteredBookings(fecha?: string, estado?: string): Promise<Booking[]> {
  if (!isFirebaseConfigured || !db) {
    let filtered = [...mockBookings]
    if (fecha) {
      filtered = filtered.filter((b) => b.fecha === fecha)
    }
    if (estado) {
      filtered = filtered.filter((b) => b.estado === estado)
    }
    return filtered
  }

  let q = query(collection(db, "reservas"), orderBy("createdAt", "desc"))

  if (fecha && estado) {
    q = query(collection(db, "reservas"), where("fecha", "==", fecha), where("estado", "==", estado))
  } else if (fecha) {
    q = query(collection(db, "reservas"), where("fecha", "==", fecha))
  } else if (estado) {
    q = query(collection(db, "reservas"), where("estado", "==", estado))
  }

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Booking)
}
