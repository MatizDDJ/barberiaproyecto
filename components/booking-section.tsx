"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBooking, getAvailableSlots } from "@/lib/bookings"
import { updateClientSession, saveClientBooking, getCurrentSession } from "@/lib/client-session"
import { toast } from "sonner"
import { Clock, CheckCircle2, XCircle } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const SERVICES = [
  { value: "corte-completo", label: "Corte (incluye barba y cejas)", precio: "$380", duracion: "45 min" },
  { value: "solo-peine", label: "Solo peine", precio: "$250", duracion: "30 min" },
  { value: "estetica-barba", label: "Estética de barba", precio: "$200", duracion: "30 min" },
  { value: "mechas", label: "Mechas", precio: "$1.100", duracion: "90 min" },
  { value: "global", label: "Global", precio: "$1.800", duracion: "120 min" },
]

const SUCURSALES = [
  { value: "centro", label: "Centro - Mangarelli 585", direccion: "Mangarelli 585" },
  { value: "real", label: "El Real - Roger Balet 201", direccion: "Roger Balet 201" },
]

// Generar todos los horarios del día (10:00 - 20:00)
const ALL_TIME_SLOTS = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00"
]

export function BookingSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    servicio: "",
    sucursal: "",
    fecha: "",
    hora: "",
  })
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [allSlots, setAllSlots] = useState<{ time: string; available: boolean }[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [confirmedBooking, setConfirmedBooking] = useState<{ fecha: string; hora: string } | null>(null)

  // Cargar datos de sesión si existen
  useEffect(() => {
    const session = getCurrentSession()
    if (session && session.nombre && session.telefono) {
      setFormData((prev) => ({
        ...prev,
        nombre: session.nombre,
        telefono: session.telefono,
      }))
    }
  }, [])

  useEffect(() => {
    if (formData.fecha && formData.sucursal) {
      loadAvailableSlots(formData.fecha, formData.sucursal)
    } else {
      setAvailableSlots([])
      setAllSlots([])
    }
  }, [formData.fecha, formData.sucursal])

  const loadAvailableSlots = async (fecha: string, sucursal: string) => {
    setLoadingSlots(true)
    try {
      const slots = await getAvailableSlots(fecha, sucursal)
      setAvailableSlots(slots)
      
      // Crear array con todos los horarios y su disponibilidad
      const slotsWithStatus = ALL_TIME_SLOTS.map(time => ({
        time,
        available: slots.includes(time)
      }))
      setAllSlots(slotsWithStatus)
      
      // Reset hora if currently selected time is no longer available
      if (formData.hora && !slots.includes(formData.hora)) {
        setFormData((prev) => ({ ...prev, hora: "" }))
      }
    } catch (error) {
      console.error("[v0] Error loading slots:", error)
      toast.error("Error al cargar horarios disponibles")
    } finally {
      setLoadingSlots(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    if (!formData.nombre || !formData.telefono || !formData.sucursal || !formData.servicio || !formData.fecha || !formData.hora) {
      toast.error("Por favor completá todos los campos")
      return
    }

    setLoading(true)

    try {
      // Crear la reserva en Firebase
      const result = await createBooking({
        nombre: formData.nombre,
        telefono: formData.telefono,
        sucursal: formData.sucursal,
        servicio: formData.servicio,
        fecha: formData.fecha,
        hora: formData.hora,
        estado: "pendiente",
      })

      // Guardar en sesión local
      updateClientSession(formData.nombre, formData.telefono)
      saveClientBooking(result.id || Date.now().toString(), {
        nombre: formData.nombre,
        telefono: formData.telefono,
        servicio: formData.servicio,
        sucursal: formData.sucursal,
        fecha: formData.fecha,
        hora: formData.hora,
        estado: "pendiente",
        createdAt: Date.now(),
      })

      setConfirmedBooking({ fecha: formData.fecha, hora: formData.hora })
      setSubmitted(true)
      toast.success("¡Turno reservado exitosamente!")

      // Recargar la página después de 3 segundos para mostrar "Mis Reservas"
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (error: any) {
      console.error("[v0] Error creating booking:", error)
      toast.error(error.message || "Error al crear la reserva. Intentá nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const { ref: cardRef, isInView: cardInView } = useInView({ threshold: 0.2 })

  return (
    <section id="reservas" className="py-20 md:py-32 bg-muted/30 w-full overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card 
            ref={cardRef}
            className={`border-border animate-on-scroll ${cardInView ? 'animate-scale-in' : ''}`}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">Reservá tu turno</CardTitle>
              <CardDescription className="text-lg">
                Completá el formulario para reservar tu cita en Blades Barbers
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted && confirmedBooking ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">¡Turno confirmado!</h3>
                  <p className="text-muted-foreground">
                    Tu turno fue reservado para el <strong>{confirmedBooking.fecha}</strong> a las{" "}
                    <strong>{confirmedBooking.hora}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">Te esperamos en Blades Barbers</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre completo</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Juan Pérez"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => {
                        // Solo permitir números, espacios, guiones y paréntesis
                        const value = e.target.value.replace(/[^0-9\s\-\+\(\)]/g, '')
                        setFormData({ ...formData, telefono: value })
                      }}
                      placeholder="099 123 456"
                      required
                      disabled={loading}
                      pattern="[0-9\s\-\+\(\)]+"
                      title="Ingresá solo números"
                      inputMode="numeric"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sucursal">Sucursal</Label>
                    <Select
                      value={formData.sucursal}
                      onValueChange={(value) => setFormData({ ...formData, sucursal: value })}
                      disabled={loading}
                      required
                    >
                      <SelectTrigger id="sucursal">
                        <SelectValue placeholder="Seleccioná una sucursal" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={5}>
                        {SUCURSALES.map((sucursal) => (
                          <SelectItem key={sucursal.value} value={sucursal.value}>
                            {sucursal.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="servicio">Servicio</Label>
                    <Select
                      value={formData.servicio}
                      onValueChange={(value) => setFormData({ ...formData, servicio: value })}
                      disabled={loading}
                      required
                    >
                      <SelectTrigger id="servicio">
                        <SelectValue placeholder="Seleccioná un servicio" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={5}>
                        {SERVICES.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            <div className="flex items-center justify-between gap-4 w-full">
                              <span className="flex-1">{service.label}</span>
                              <div className="flex items-center gap-2 text-xs">
                                <span className="font-semibold text-accent">{service.precio}</span>
                                <span className="text-muted-foreground">• {service.duracion}</span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fecha">Fecha</Label>
                    <Input
                      id="fecha"
                      name="fecha"
                      type="date"
                      value={formData.fecha}
                      onChange={handleChange}
                      min={getMinDate()}
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* Visual time slot selector */}
                  {formData.fecha && formData.sucursal && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-base">Horarios disponibles</Label>
                        {loadingSlots && (
                          <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Cargando...
                          </span>
                        )}
                      </div>

                      {/* Leyenda */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-muted-foreground">Disponible</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-muted-foreground">Ocupado</span>
                        </div>
                      </div>

                      {/* Grid de horarios */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-[400px] overflow-y-auto p-1">
                        {allSlots.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => {
                              if (slot.available) {
                                setFormData({ ...formData, hora: slot.time })
                              }
                            }}
                            disabled={!slot.available || loading}
                            className={`
                              relative p-3 rounded-lg border-2 transition-all duration-200
                              flex flex-col items-center justify-center gap-1
                              ${
                                formData.hora === slot.time
                                  ? "border-accent bg-accent text-accent-foreground shadow-md scale-105"
                                  : slot.available
                                    ? "border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-300 dark:border-green-900 dark:bg-green-950 dark:hover:bg-green-900"
                                    : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950 opacity-60 cursor-not-allowed"
                              }
                            `}
                          >
                            <Clock className="w-4 h-4" />
                            <span className="font-semibold text-sm">{slot.time}</span>
                            {slot.available ? (
                              <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-400" />
                            ) : (
                              <XCircle className="w-3 h-3 text-red-500 dark:text-red-400" />
                            )}
                          </button>
                        ))}
                      </div>

                      {allSlots.length > 0 && availableSlots.length === 0 && (
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            😔 No hay horarios disponibles para esta fecha. Probá con otra fecha.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {!formData.fecha && (
                    <div className="text-center p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted">
                      <Clock className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                      <p className="text-sm text-muted-foreground">
                        Seleccioná una fecha para ver los horarios disponibles
                      </p>
                    </div>
                  )}

                  {formData.hora && (
                    <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-accent" />
                        <span className="font-medium">
                          Turno seleccionado: <strong>{formData.fecha}</strong> a las <strong>{formData.hora}</strong>
                        </span>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg py-6"
                    disabled={loading || !formData.hora}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Procesando...
                      </span>
                    ) : !formData.hora ? (
                      "Seleccioná un horario"
                    ) : (
                      "Confirmar turno"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
