import { useEffect, useState } from 'react'

export const UI_SESSION_STORAGE_PREFIX = 'dent22.ui.'

const canUseSessionStorage = () => typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined'

const readStoredValue = (key, initialValue) => {
  if (!canUseSessionStorage()) return initialValue

  try {
    const rawValue = window.sessionStorage.getItem(key)
    if (rawValue == null) return initialValue
    return JSON.parse(rawValue)
  } catch {
    return initialValue
  }
}

export const clearSessionStorageByPrefix = (prefix = UI_SESSION_STORAGE_PREFIX) => {
  if (!canUseSessionStorage()) return

  const keysToRemove = []
  for (let index = 0; index < window.sessionStorage.length; index += 1) {
    const key = window.sessionStorage.key(index)
    if (key?.startsWith(prefix)) {
      keysToRemove.push(key)
    }
  }

  keysToRemove.forEach((key) => window.sessionStorage.removeItem(key))
}

function useSessionStorageState(key, initialValue) {
  const [value, setValue] = useState(() => readStoredValue(key, initialValue))

  useEffect(() => {
    setValue(readStoredValue(key, initialValue))
  }, [key])

  useEffect(() => {
    if (!canUseSessionStorage()) return

    try {
      if (value === undefined) {
        window.sessionStorage.removeItem(key)
        return
      }

      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore storage write failures and keep the in-memory state working.
    }
  }, [key, value])

  return [value, setValue]
}

export default useSessionStorageState
