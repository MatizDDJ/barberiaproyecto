"use client"

import { useEffect, useState } from "react"
import { isBusinessOpen } from "@/lib/business-hours"
import { Clock } from "lucide-react"

export function BusinessStatus() {
  const [status, setStatus] = useState<{
    isOpen: boolean
    message: string
    nextOpenTime?: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkStatus()
    // Actualizar cada minuto
    const interval = setInterval(checkStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  const checkStatus = async () => {
    try {
      const result = await isBusinessOpen()
      setStatus(result)
    } catch (error) {
      console.error("Error checking business status:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !status) {
    return null
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300">
      {status.isOpen ? (
        <>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-semibold text-green-700 dark:text-green-400">Abierto</span>
          </div>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {status.message}
          </span>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="font-semibold text-red-700 dark:text-red-400">Cerrado</span>
          </div>
          {status.nextOpenTime && (
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {status.nextOpenTime}
            </span>
          )}
        </>
      )}
    </div>
  )
}
