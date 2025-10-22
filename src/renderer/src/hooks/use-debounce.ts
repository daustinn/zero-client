import * as React from 'react'

const DEFAULT_DELAY = 500
const DEFAULT_ON_DEBOUNCED = () => {}
const DEFAULT_ON_CHANGE = () => {}
const DEFAULT_DEFAULT_VALUE = undefined

type UseDebounceProps<T> = {
  delay?: number
  onDebounced?: (value: T) => void
  onChange?: (value: T) => void
  defaultValue?: T
}

type UseDebounceReturn<T> = [
  T | undefined,
  setValue: (e: T) => void,
  // setValue: (e: React.ChangeEvent<HTMLElement> | T) => void,
  value: T | undefined
]

export function useDebounce<T = string>(
  props?: UseDebounceProps<T>
): UseDebounceReturn<T> {
  const {
    delay = DEFAULT_DELAY,
    onDebounced = DEFAULT_ON_DEBOUNCED,
    onChange = DEFAULT_ON_CHANGE,
    defaultValue = DEFAULT_DEFAULT_VALUE
  } = props || {}

  const [value, setValue] = React.useState<T | undefined>()

  const [debouncedValue, setDebouncedValue] = React.useState<T | undefined>(
    defaultValue
  )

  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const didMount = React.useRef(false)

  React.useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (value !== undefined) {
      timeoutRef.current = setTimeout(() => {
        onDebounced?.(value)
        setDebouncedValue(value)
      }, delay)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [value, delay])

  const handlerSetValue = React.useCallback(
    // prop: React.ChangeEvent<HTMLElement> |
    (prop: T) => {
      setValue(prop)
      onChange?.(prop)
      // if (typeof prop === 'object' && 'target' in prop) {
      //   const newValue = prop.target.value as T
      //   setValue(newValue)
      //   onChange?.(newValue)
      // }
      // if (typeof prop !== 'object') {
      //   setValue(prop)
      //   onChange?.(prop)
      // }
    },
    [onChange]
  )

  return [debouncedValue, handlerSetValue, value]
}
