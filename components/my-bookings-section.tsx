"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getActiveBookings, type ClientBookingWithId } from "@/lib/client-session"
import { Calendar, Clock, Scissors, User, Phone } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

export function MyBookingsSection() {
  const [bookings, setBookings] = useState<ClientBookingWithId[]>([])
  const { ref: cardRef, isInView: cardInView } = useInView({ threshold: 0.2 })

  useEffect(() => {
    // Cargar reservas al montar
    loadBookings()

    // Actualizar cada 10 segundos por si hay cambios
    const interval = setInterval(loadBookings, 10000)
    return () => clearInterval(interval)
  }, [])

  const loadBookings = () => {
    const activeBookings = getActiveBookings()
    setBookings(activeBookings)
  }

  if (bookings.length === 0) {
    return null // No mostrar nada si no hay reservas
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">⏳ Pendiente</Badge>
      case "confirmado":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">✓ Confirmado</Badge>
      case "cancelado":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">✗ Cancelado</Badge>
      case "completado":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">✓ Completado</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const getServicioLabel = (value: string) => {
    const servicios: Record<string, string> = {
      "corte-clasico": "Corte clásico",
      "afeitado-navaja": "Afeitado con navaja",
      "diseno-barba": "Diseño de barba",
      "tratamiento-capilar": "Tratamiento capilar",
    }
    return servicios[value] || value
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card 
            ref={cardRef}
            className={`border-accent/20 shadow-lg animate-on-scroll ${cardInView ? 'animate-slide-down' : ''}`}
          >
            <CardHeader className="bg-linear-to-r from-accent/5 to-accent/10">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calendar className="w-6 h-6 text-accent" />
                Mis Reservas
              </CardTitle>
              <CardDescription>
                Tus próximos turnos en Blades Barbers
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {bookings.map((booking, index) => (
                  <div
                    key={booking.bookingId}
                    className="p-4 border border-border rounded-lg hover:border-accent/50 hover:shadow-md transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Scissors className="w-4 h-4 text-accent" />
                          <span className="font-semibold text-lg">
                            {getServicioLabel(booking.servicio)}
                          </span>
                          {getEstadoBadge(booking.estado)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(booking.fecha).toLocaleDateString("es-AR", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="font-semibold">{booking.hora}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{booking.nombre}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{booking.telefono}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            // Agregar a calendario
                            const event = {
                              title: `Turno en Blades Barbers - ${getServicioLabel(booking.servicio)}`,
                              start: `${booking.fecha}T${booking.hora}:00`,
                              duration: 30, // minutos
                            }
                            // Abrir Google Calendar
                            const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${booking.fecha.replace(/-/g, "")}T${booking.hora.replace(":", "")}00/${booking.fecha.replace(/-/g, "")}T${booking.hora.replace(":", "")}00`
                            window.open(googleCalUrl, "_blank")
                          }}
                        >
                          📅 Agregar al calendario
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground text-center">
                💡 <strong>Tip:</strong> Llegá 5 minutos antes de tu turno
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
