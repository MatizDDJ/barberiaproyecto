"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { getBusinessHours, updateBusinessHours, type BusinessHours, type DaySchedule } from "@/lib/business-hours"
import { Clock, Save, RotateCcw } from "lucide-react"
import { toast } from "sonner"

export function BusinessHoursEditor() {
  const [businessHours, setBusinessHours] = useState<BusinessHours | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadBusinessHours()
  }, [])

  const loadBusinessHours = async () => {
    try {
      const hours = await getBusinessHours()
      setBusinessHours(hours)
    } catch (error) {
      console.error("Error loading business hours:", error)
      toast.error("Error al cargar horarios")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!businessHours) return

    setSaving(true)
    try {
      await updateBusinessHours(businessHours)
      toast.success("Horarios actualizados correctamente")
    } catch (error) {
      console.error("Error saving business hours:", error)
      toast.error("Error al guardar horarios")
    } finally {
      setSaving(false)
    }
  }

  const handleDayToggle = (day: keyof BusinessHours) => {
    if (!businessHours) return
    setBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day],
        isOpen: !businessHours[day].isOpen,
      },
    })
  }

  const handleTimeChange = (day: keyof BusinessHours, field: "openTime" | "closeTime", value: string) => {
    if (!businessHours) return
    setBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day],
        [field]: value,
      },
    })
  }

  const daysInSpanish: Record<keyof BusinessHours, string> = {
    lunes: "Lunes",
    martes: "Martes",
    miercoles: "Miércoles",
    jueves: "Jueves",
    viernes: "Viernes",
    sabado: "Sábado",
    domingo: "Domingo",
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Cargando horarios...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!businessHours) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8 text-muted-foreground">
            Error al cargar horarios
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Horarios de Atención
        </CardTitle>
        <CardDescription>
          Configura los días y horarios en que la barbería está abierta (Zona horaria: UTC-3 / Uruguay)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Lista de días */}
        <div className="space-y-4">
          {Object.entries(businessHours).map(([day, schedule]) => (
            <div
              key={day}
              className={`p-4 border rounded-lg transition-all ${
                schedule.isOpen ? "border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20" : "border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/20"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Día y switch */}
                <div className="flex items-center justify-between md:w-48">
                  <Label htmlFor={`switch-${day}`} className="text-base font-semibold">
                    {daysInSpanish[day as keyof BusinessHours]}
                  </Label>
                  <Switch
                    id={`switch-${day}`}
                    checked={schedule.isOpen}
                    onCheckedChange={() => handleDayToggle(day as keyof BusinessHours)}
                  />
                </div>

                {/* Horarios */}
                {schedule.isOpen && (
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`open-${day}`} className="text-sm text-muted-foreground">
                        Apertura
                      </Label>
                      <Input
                        id={`open-${day}`}
                        type="time"
                        value={schedule.openTime}
                        onChange={(e) => handleTimeChange(day as keyof BusinessHours, "openTime", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`close-${day}`} className="text-sm text-muted-foreground">
                        Cierre
                      </Label>
                      <Input
                        id={`close-${day}`}
                        type="time"
                        value={schedule.closeTime}
                        onChange={(e) => handleTimeChange(day as keyof BusinessHours, "closeTime", e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {!schedule.isOpen && (
                  <div className="flex-1 text-sm text-muted-foreground italic">
                    Cerrado
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </>
            )}
          </Button>
          <Button
            onClick={loadBusinessHours}
            variant="outline"
            disabled={saving}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Recargar
          </Button>
        </div>

        {/* Info */}
        <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
          <p className="font-medium mb-2">ℹ️ Información importante:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Los horarios se actualizan en tiempo real en la web</li>
            <li>La zona horaria es UTC-3 (Montevideo, Uruguay)</li>
            <li>Los cambios son visibles inmediatamente para los clientes</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
