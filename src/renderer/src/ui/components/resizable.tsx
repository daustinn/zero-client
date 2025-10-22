import { cn } from '@renderer/utils/cn'
import React from 'react'

type Props = React.ComponentProps<'aside'> & {
  minHeight: number
  maxHeight?: number | null
  handlerPosition: 'top' | 'bottom'
  cssVariable?: string
  show: boolean
}

export default function Resizable({
  className,
  children,
  minHeight,
  maxHeight = null,
  handlerPosition,
  cssVariable = '--resizable-height',
  show = false,
  ...props
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null)

  // On mount, load from localStorage y set the css variable if present
  React.useEffect(() => {
    const key = cssVariable
    const saved = localStorage.getItem(key)
    if (saved) {
      document.documentElement.style.setProperty(key, saved)
    }
  }, [cssVariable])

  const handleResize =
    (handlerPosition: 'top' | 'bottom') => (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const startY = e.clientY
      const startHeight = ref.current?.offsetHeight || 0

      const onMouseMove = (event: MouseEvent) => {
        let diffY = event.clientY - startY
        if (handlerPosition === 'top') diffY = -diffY

        let newHeight = startHeight + diffY
        if (newHeight < minHeight) newHeight = minHeight
        if (maxHeight !== null && newHeight > maxHeight) newHeight = maxHeight

        if (ref.current) {
          const value = newHeight + 'px'
          document.documentElement.style.setProperty(cssVariable, value)
          // Save in localStorage
          localStorage.setItem(cssVariable, value)
        }
      }

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }

  // Clases para posicionar el handler arriba o abajo
  const handlerPositionClasses = {
    top: 'top-[-6px] inset-x-0 h-3 !cursor-ns-resize',
    bottom: 'bottom-[-4px] inset-x-0 h-3 !cursor-ns-resize'
  }

  if (!show) return null

  return (
    <div {...props} ref={ref} className={cn('relative', className)}>
      <button
        onMouseDown={handleResize(handlerPosition)}
        data-handler-position={handlerPosition}
        className={cn(
          'absolute flex items-center z-20 group justify-center',
          handlerPositionClasses[handlerPosition]
        )}
      >
        <div className="w-full h-px group-active:dark:bg-blue-600"></div>
      </button>
      {children}
    </div>
  )
}
