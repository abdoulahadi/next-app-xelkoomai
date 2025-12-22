import { useEffect, useRef, useCallback } from "react"
import { useDebounce } from "./useDebounce"

interface AutosaveOptions<T> {
  data: T
  onSave: (data: T) => Promise<void> | void
  interval?: number
  enabled?: boolean
}

export function useAutosave<T>({
  data,
  onSave,
  interval = 30000, // 30 seconds default
  enabled = true,
}: AutosaveOptions<T>) {
  const debouncedData = useDebounce(data, 3000) // Debounce changes by 3 seconds
  const lastSavedRef = useRef<T>(data)
  const isSavingRef = useRef(false)

  const save = useCallback(async () => {
    if (isSavingRef.current || !enabled) return

    // Compare with last saved version
    if (JSON.stringify(debouncedData) === JSON.stringify(lastSavedRef.current)) {
      return
    }

    try {
      isSavingRef.current = true
      await onSave(debouncedData)
      lastSavedRef.current = debouncedData
    } catch (error) {
      console.error("Autosave error:", error)
    } finally {
      isSavingRef.current = false
    }
  }, [debouncedData, onSave, enabled])

  // Autosave on data change (debounced)
  useEffect(() => {
    if (!enabled) return
    save()
  }, [debouncedData, save, enabled])

  // Periodic autosave
  useEffect(() => {
    if (!enabled || !interval) return

    const timer = setInterval(() => {
      save()
    }, interval)

    return () => clearInterval(timer)
  }, [interval, save, enabled])

  // Save on unmount/page leave
  useEffect(() => {
    if (!enabled) return

    const handleBeforeUnload = () => {
      if (JSON.stringify(data) !== JSON.stringify(lastSavedRef.current)) {
        // Synchronous save on page unload
        onSave(data)
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [data, onSave, enabled])

  return {
    save,
    isSaving: isSavingRef.current,
  }
}
