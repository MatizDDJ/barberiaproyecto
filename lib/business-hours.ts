import { db, isFirebaseConfigured } from "./firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

export interface DaySchedule {
  isOpen: boolean
  openTime: string // formato HH:mm
  closeTime: string // formato HH:mm
}

export interface BusinessHours {
  lunes: DaySchedule
  martes: DaySchedule
  miercoles: DaySchedule
  jueves: DaySchedule
  viernes: DaySchedule
  sabado: DaySchedule
  domingo: DaySchedule
}

// Horarios por defecto
const DEFAULT_BUSINESS_HOURS: BusinessHours = {
  lunes: { isOpen: true, openTime: "09:00", closeTime: "20:00" },
  martes: { isOpen: true, openTime: "09:00", closeTime: "20:00" },
  miercoles: { isOpen: true, openTime: "09:00", closeTime: "20:00" },
  jueves: { isOpen: true, openTime: "09:00", closeTime: "20:00" },
  viernes: { isOpen: true, openTime: "09:00", closeTime: "20:00" },
  sabado: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
  domingo: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
}

const DAYS_MAP: Record<number, keyof BusinessHours> = {
  0: "domingo",
  1: "lunes",
  2: "martes",
  3: "miercoles",
  4: "jueves",
  5: "viernes",
  6: "sabado",
}

/**
 * Obtiene la hora actual en UTC-3 (Uruguay)
 */
export function getCurrentTimeUTC3(): Date {
  const now = new Date()
  // Convertir a UTC-3
  const uruguayTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Montevideo" }))
  return uruguayTime
}

/**
 * Verifica si el negocio está abierto ahora
 */
export async function isBusinessOpen(): Promise<{ isOpen: boolean; message: string; nextOpenTime?: string }> {
  try {
    const businessHours = await getBusinessHours()
    const now = getCurrentTimeUTC3()
    const dayOfWeek = now.getDay()
    const currentDay = DAYS_MAP[dayOfWeek]
    const todaySchedule = businessHours[currentDay]

    // Si no abre hoy
    if (!todaySchedule.isOpen) {
      const nextOpenDay = findNextOpenDay(businessHours, dayOfWeek)
      return {
        isOpen: false,
        message: "Cerrado",
        nextOpenTime: nextOpenDay ? `Abrimos ${nextOpenDay.dayName} a las ${nextOpenDay.openTime}` : "Horarios no disponibles",
      }
    }

    // Verificar si está dentro del horario
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    
    if (currentTime >= todaySchedule.openTime && currentTime < todaySchedule.closeTime) {
      return {
        isOpen: true,
        message: `Abierto hasta las ${todaySchedule.closeTime}`,
      }
    }

    // Está cerrado pero abre hoy
    if (currentTime < todaySchedule.openTime) {
      return {
        isOpen: false,
        message: "Cerrado",
        nextOpenTime: `Abrimos hoy a las ${todaySchedule.openTime}`,
      }
    }

    // Ya cerró hoy
    const nextOpenDay = findNextOpenDay(businessHours, dayOfWeek)
    return {
      isOpen: false,
      message: "Cerrado",
      nextOpenTime: nextOpenDay ? `Abrimos ${nextOpenDay.dayName} a las ${nextOpenDay.openTime}` : "Horarios no disponibles",
    }
  } catch (error) {
    console.error("Error checking business hours:", error)
    return {
      isOpen: false,
      message: "Cerrado",
    }
  }
}

/**
 * Encuentra el próximo día que abre
 */
function findNextOpenDay(
  businessHours: BusinessHours,
  currentDayOfWeek: number
): { dayName: string; openTime: string } | null {
  const daysInSpanish: Record<keyof BusinessHours, string> = {
    lunes: "lunes",
    martes: "martes",
    miercoles: "miércoles",
    jueves: "jueves",
    viernes: "viernes",
    sabado: "sábado",
    domingo: "domingo",
  }

  // Buscar en los próximos 7 días
  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (currentDayOfWeek + i) % 7
    const nextDayKey = DAYS_MAP[nextDayIndex]
    const nextDaySchedule = businessHours[nextDayKey]

    if (nextDaySchedule.isOpen) {
      return {
        dayName: daysInSpanish[nextDayKey],
        openTime: nextDaySchedule.openTime,
      }
    }
  }

  return null
}

/**
 * Obtiene los horarios del negocio desde Firebase
 */
export async function getBusinessHours(): Promise<BusinessHours> {
  if (!isFirebaseConfigured || !db) {
    console.warn("[v0] Firebase not configured, using default business hours")
    return DEFAULT_BUSINESS_HOURS
  }

  try {
    const docRef = doc(db, "settings", "businessHours")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as BusinessHours
    }

    // Si no existe, crear con valores por defecto
    await setDoc(docRef, DEFAULT_BUSINESS_HOURS)
    return DEFAULT_BUSINESS_HOURS
  } catch (error) {
    console.error("[v0] Error fetching business hours:", error)
    return DEFAULT_BUSINESS_HOURS
  }
}

/**
 * Actualiza los horarios del negocio en Firebase
 */
export async function updateBusinessHours(businessHours: BusinessHours): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase not configured")
  }

  try {
    const docRef = doc(db, "settings", "businessHours")
    await setDoc(docRef, businessHours)
  } catch (error) {
    console.error("[v0] Error updating business hours:", error)
    throw error
  }
}

/**
 * Formatea el horario para mostrar en el footer de forma compacta
 */
export function formatBusinessHours(businessHours: BusinessHours): string {
  const daysInSpanish: Record<string, string> = {
    lunes: "Lunes",
    martes: "Martes",
    miercoles: "Miércoles",
    jueves: "Jueves",
    viernes: "Viernes",
    sabado: "Sábado",
    domingo: "Domingo",
  }

  const dayOrder: (keyof BusinessHours)[] = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
  
  // Agrupar días consecutivos con el mismo horario
  const groups: Array<{ days: string[], schedule: DaySchedule }> = []
  
  for (const day of dayOrder) {
    const schedule = businessHours[day]
    
    if (!schedule.isOpen) continue
    
    const lastGroup = groups[groups.length - 1]
    
    if (lastGroup && lastGroup.schedule.openTime === schedule.openTime && lastGroup.schedule.closeTime === schedule.closeTime) {
      lastGroup.days.push(daysInSpanish[day])
    } else {
      groups.push({ days: [daysInSpanish[day]], schedule })
    }
  }

  if (groups.length === 0) {
    return "Horarios no disponibles"
  }

  // Formatear cada grupo
  return groups.map(group => {
    const dayRange = group.days.length > 1 
      ? `${group.days[0]} a ${group.days[group.days.length - 1]}`
      : group.days[0]
    return `${dayRange}: ${group.schedule.openTime} - ${group.schedule.closeTime}`
  }).join("\n")
}
