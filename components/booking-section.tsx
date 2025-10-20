"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBooking, getAvailableSlots } from "@/lib/bookings"
import { toast } from "sonner"

const SERVICES = [
  { value: "corte-clasico", label: "Corte clásico" },
  { value: "afeitado-navaja", label: "Afeitado con navaja" },
  { value: "diseno-barba", label: "Diseño de barba" },
  { value: "tratamiento-capilar", label: "Tratamiento capilar" },
]

export function BookingSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    servicio: "",
    fecha: "",
    hora: "",
  })
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [confirmedBooking, setConfirmedBooking] = useState<{ fecha: string; hora: string } | null>(null)

  useEffect(() => {
    if (formData.fecha) {
      loadAvailableSlots(formData.fecha)
    } else {
      setAvailableSlots([])
    }
  }, [formData.fecha])

  const loadAvailableSlots = async (fecha: string) => {
    try {
      const slots = await getAvailableSlots(fecha)
      setAvailableSlots(slots)
      // Reset hora if currently selected time is no longer available
      if (formData.hora && !slots.includes(formData.hora)) {
        setFormData((prev) => ({ ...prev, hora: "" }))
      }
    } catch (error) {
      console.error("[v0] Error loading slots:", error)
      toast.error("Error al cargar horarios disponibles")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    if (!formData.nombre || !formData.telefono || !formData.servicio || !formData.fecha || !formData.hora) {
      toast.error("Por favor completá todos los campos")
      return
    }

    setLoading(true)

    try {
      await createBooking({
        nombre: formData.nombre,
        telefono: formData.telefono,
        servicio: formData.servicio,
        fecha: formData.fecha,
        hora: formData.hora,
        estado: "pendiente",
      })

      setConfirmedBooking({ fecha: formData.fecha, hora: formData.hora })
      setSubmitted(true)
      toast.success("¡Turno reservado exitosamente!")

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
        setConfirmedBooking(null)
        setFormData({ nombre: "", telefono: "", servicio: "", fecha: "", hora: "" })
      }, 5000)
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

  return (
    <section id="reservas" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-border">
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
                      onChange={handleChange}
                      placeholder="099 123 456"
                      required
                      disabled={loading}
                      pattern="[0-9\s\-\+$$$$]+"
                      title="Ingresá un número de teléfono válido"
                    />
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
                      <SelectContent>
                        {SERVICES.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    <div className="space-y-2">
                      <Label htmlFor="hora">Hora</Label>
                      <Select
                        value={formData.hora}
                        onValueChange={(value) => setFormData({ ...formData, hora: value })}
                        disabled={loading || !formData.fecha || availableSlots.length === 0}
                        required
                      >
                        <SelectTrigger id="hora">
                          <SelectValue
                            placeholder={
                              !formData.fecha
                                ? "Seleccioná una fecha primero"
                                : availableSlots.length === 0
                                  ? "No hay horarios disponibles"
                                  : "Seleccioná un horario"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg py-6"
                    disabled={loading}
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
