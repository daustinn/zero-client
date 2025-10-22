import * as React from 'react'

export default function useFocus() {
  const id = window.api.id()

  const [windowFocused, setWindowFocused] = React.useState(true)

  React.useEffect(() => {
    const unsub = window.api.windowsFocusSubscribe(setWindowFocused)
    return unsub
  }, [id])

  return windowFocused
}
