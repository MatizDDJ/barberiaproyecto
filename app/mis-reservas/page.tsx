"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getClientBookings, cancelClientBooking, type ClientBookingWithId } from "@/lib/client-session"
import { Calendar, Clock, Scissors, User, Phone, CalendarPlus, AlertCircle, X, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MisReservasPage() {
  const [bookings, setBookings] = useState<ClientBookingWithId[]>([])
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadBookings()
    const interval = setInterval(loadBookings, 10000)
    return () => clearInterval(interval)
  }, [])

  const loadBookings = () => {
    setLoading(true)
    const allBookings = getClientBookings()
    setBookings(allBookings)
    setLoading(false)
  }

  const handleCancelBooking = async (bookingId: string) => {
    setCancelling(bookingId)
    try {
      await cancelClientBooking(bookingId)
      loadBookings()
      toast({
        title: "Reserva cancelada",
        description: "Tu turno ha sido cancelado exitosamente.",
      })
    } catch (error) {
      console.error("Error al cancelar:", error)
      toast({
        title: "Error",
        description: "No se pudo cancelar la reserva. Intentá de nuevo.",
        variant: "destructive",
      })
    } finally {
      setCancelling(null)
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300 dark:bg-yellow-950 dark:text-yellow-400">⏳ Pendiente</Badge>
      case "confirmado":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-400">✓ Confirmado</Badge>
      case "cancelado":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300 dark:bg-red-950 dark:text-red-400">✗ Cancelado</Badge>
      case "completado":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950 dark:text-blue-400">✓ Completado</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const getServicioLabel = (value: string) => {
    const servicios: Record<string, string> = {
      "corte-completo": "Corte (incluye barba y cejas)",
      "solo-peine": "Solo peine",
      "estetica-barba": "Estética de barba",
      "mechas": "Mechas",
      "global": "Global",
    }
    return servicios[value] || value
  }

  const getSucursalLabel = (value: string) => {
    const sucursales: Record<string, string> = {
      "centro": "Centro - Mangarelli 585",
      "real": "El Real - Roger Balet 201",
    }
    return sucursales[value] || value
  }

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha + "T00:00:00")
    return date.toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const addToCalendar = (booking: ClientBookingWithId) => {
    const title = `Turno en Blades Barbers - ${getServicioLabel(booking.servicio)}`
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${booking.fecha.replace(/-/g, "")}T${booking.hora.replace(":", "")}00/${booking.fecha.replace(/-/g, "")}T${booking.hora.replace(":", "")}00`
    window.open(googleCalUrl, "_blank")
  }

  const activeBookings = bookings.filter(b => b.estado === "pendiente" || b.estado === "confirmado")
  const pastBookings = bookings.filter(b => b.estado === "completado" || b.estado === "cancelado")

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-[72px]">
        <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Mis Reservas
              </h1>
              <p className="text-lg text-muted-foreground">
                Gestiona tus turnos en Blades Barbers
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Cargando reservas...</span>
                </div>
              </div>
            ) : bookings.length === 0 ? (
              <Card className="border-border">
                <CardContent className="pt-12 pb-12 text-center">
                  <AlertCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No tenés reservas todavía
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Hacé tu primera reserva para verla aquí
                  </p>
                  <Button
                    onClick={() => window.location.href = "/#reservas"}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Reservar turno
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {/* Reservas Activas */}
                {activeBookings.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-accent" />
                      Próximos Turnos
                    </h2>
                    <div className="space-y-4">
                      {activeBookings.map((booking, index) => (
                        <Card
                          key={booking.bookingId}
                          className="border-border hover:border-accent/50 hover:shadow-md transition-all duration-300"
                        >
                          <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Scissors className="w-5 h-5 text-accent" />
                                  <span className="font-semibold text-xl">
                                    {getServicioLabel(booking.servicio)}
                                  </span>
                                  {getEstadoBadge(booking.estado)}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span className="capitalize">{formatFecha(booking.fecha)}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-semibold text-foreground">{booking.hora}</span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                    <span className="font-medium text-foreground">{getSucursalLabel(booking.sucursal)}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <User className="w-4 h-4" />
                                    <span>{booking.nombre}</span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="w-4 h-4" />
                                    <span>{booking.telefono}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addToCalendar(booking)}
                                  className="whitespace-nowrap"
                                >
                                  <CalendarPlus className="w-4 h-4 mr-2" />
                                  Agregar al calendario
                                </Button>
                                
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="whitespace-nowrap border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                                      disabled={cancelling === booking.bookingId}
                                    >
                                      {cancelling === booking.bookingId ? (
                                        <>
                                          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                          </svg>
                                          Cancelando...
                                        </>
                                      ) : (
                                        <>
                                          <X className="w-4 h-4 mr-2" />
                                          Cancelar turno
                                        </>
                                      )}
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>¿Cancelar reserva?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Esta acción cancelará tu turno para el{" "}
                                        <strong>{formatFecha(booking.fecha)}</strong> a las{" "}
                                        <strong>{booking.hora}</strong>.
                                        <br />
                                        <br />
                                        Si necesitás reprogramar, podés hacer una nueva reserva después.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>No, mantener</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleCancelBooking(booking.bookingId)}
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                      >
                                        Sí, cancelar turno
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Historial */}
                {pastBookings.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-6 h-6 text-muted-foreground" />
                      Historial
                    </h2>
                    <div className="space-y-4">
                      {pastBookings.map((booking, index) => (
                        <Card
                          key={booking.bookingId}
                          className="border-border opacity-75"
                        >
                          <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Scissors className="w-5 h-5 text-muted-foreground" />
                                  <span className="font-semibold text-lg">
                                    {getServicioLabel(booking.servicio)}
                                  </span>
                                  {getEstadoBadge(booking.estado)}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span className="capitalize">{formatFecha(booking.fecha)}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{booking.hora}</span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{getSucursalLabel(booking.sucursal)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Info */}
                <Card className="bg-muted/30 border-border">
                  <CardContent className="pt-6">
                    <div className="text-center text-sm text-muted-foreground">
                      <p className="mb-2">
                        💡 <strong>Tip:</strong> Llegá 5 minutos antes de tu turno
                      </p>
                      <p>
                        Podés cancelar tu turno desde esta página. Para reprogramar, contactanos al <strong>099 220 239</strong>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
