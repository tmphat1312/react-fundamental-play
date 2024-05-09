import { useEffect, useState } from "react"

export function useLocalStorageState<T = unknown>(
  initialValue: T,
  key: string
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}
