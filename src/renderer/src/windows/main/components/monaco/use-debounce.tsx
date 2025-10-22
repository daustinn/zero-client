/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export default function <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const callbackRef = React.useRef<T>(callback)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const debouncedCallback = React.useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args)
      }, delay)
    },
    [delay]
  )

  const cancel = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return { debouncedCallback, cancel }
}
