"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { subscribeToBookings, updateBookingStatus, type Booking } from "@/lib/bookings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { LogOut, Calendar, Filter } from "lucide-react"

const SERVICE_LABELS: Record<string, string> = {
  "corte-clasico": "Corte clásico",
  "afeitado-navaja": "Afeitado con navaja",
  "diseno-barba": "Diseño de barba",
  "tratamiento-capilar": "Tratamiento capilar",
}

export function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [filterDate, setFilterDate] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    console.log("[v0] Setting up bookings subscription")
    const unsubscribe = subscribeToBookings((newBookings) => {
      console.log("[v0] Received bookings update:", newBookings.length)
      setBookings(newBookings)
      setLoading(false)

      if (bookings.length > 0 && newBookings.length > bookings.length) {
        toast.success("Nueva reserva recibida!")
      }
    })

    return () => unsubscribe()
  }, [bookings.length])

  // Apply filters
  useEffect(() => {
    let filtered = [...bookings]

    if (filterDate) {
      filtered = filtered.filter((booking) => booking.fecha === filterDate)
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((booking) => booking.estado === filterStatus)
    }

    setFilteredBookings(filtered)
  }, [bookings, filterDate, filterStatus])

  const handleStatusChange = async (bookingId: string, newStatus: "confirmado" | "cancelado" | "completado") => {
    try {
      await updateBookingStatus(bookingId, newStatus)
      toast.success(
        `Reserva ${newStatus === "confirmado" ? "confirmada" : newStatus === "cancelado" ? "cancelada" : "completada"}`,
      )
    } catch (error) {
      console.error("[v0] Error updating status:", error)
      toast.error("Error al actualizar el estado")
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast.success("Sesión cerrada")
      router.push("/login")
    } catch (error) {
      console.error("[v0] Error signing out:", error)
      toast.error("Error al cerrar sesión")
    }
  }

  const getStatusBadge = (estado: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pendiente: "secondary",
      confirmado: "default",
      cancelado: "destructive",
      completado: "outline",
    }

    return <Badge variant={variants[estado] || "default"}>{estado.charAt(0).toUpperCase() + estado.slice(1)}</Badge>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Panel de Administración</h1>
              <p className="text-sm text-muted-foreground">Blades Barbers</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Reservas</CardDescription>
              <CardTitle className="text-3xl text-accent">{bookings.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pendientes</CardDescription>
              <CardTitle className="text-3xl text-yellow-500">
                {bookings.filter((b) => b.estado === "pendiente").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Confirmadas</CardDescription>
              <CardTitle className="text-3xl text-green-500">
                {bookings.filter((b) => b.estado === "confirmado").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completadas</CardDescription>
              <CardTitle className="text-3xl text-blue-500">
                {bookings.filter((b) => b.estado === "completado").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="filter-date">Filtrar por fecha</Label>
                <Input
                  id="filter-date"
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filter-status">Filtrar por estado</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger id="filter-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="confirmado">Confirmado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                    <SelectItem value="completado">Completado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Reservas ({filteredBookings.length})
            </CardTitle>
            <CardDescription>Gestión de turnos en tiempo real</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <svg className="animate-spin h-8 w-8 text-accent" viewBox="0 0 24 24">
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
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No hay reservas {filterDate || filterStatus !== "all" ? "que coincidan con los filtros" : "aún"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Servicio</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.fecha}</TableCell>
                        <TableCell>{booking.hora}</TableCell>
                        <TableCell>{booking.nombre}</TableCell>
                        <TableCell>{booking.telefono}</TableCell>
                        <TableCell>{SERVICE_LABELS[booking.servicio] || booking.servicio}</TableCell>
                        <TableCell>{getStatusBadge(booking.estado)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {booking.estado === "pendiente" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() => handleStatusChange(booking.id!, "confirmado")}
                                >
                                  Confirmar
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleStatusChange(booking.id!, "cancelado")}
                                >
                                  Cancelar
                                </Button>
                              </>
                            )}
                            {booking.estado === "confirmado" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(booking.id!, "completado")}
                              >
                                Completar
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
