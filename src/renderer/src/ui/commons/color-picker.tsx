import React from 'react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'
import { randomColorHex } from '@renderer/utils'
type Props = React.ComponentProps<'div'> & {
  colors?: string[]
  onChangeColor?: (color: string) => void
  defaultColor?: string
  color?: string
  error?: string
  defaultRandom?: boolean
}

export default function ColorPicker({
  defaultColor: defaultProp,
  color: prop,
  defaultRandom,
  onChangeColor,
  colors = ['#676b6f', '#59006d', '#be8a15', '#007f3d', '#6d0000', '#004fc4'],
  ...props
}: Props) {
  const defaultColor = defaultRandom ? randomColorHex() : defaultProp

  const inputRef = React.useRef<HTMLInputElement>(null)

  const [value, setValue] = useControllableState({
    defaultProp: defaultColor,
    prop,
    onChange(state) {
      onChangeColor?.(state || '')
    }
  })

  return (
    <div {...props} className="flex gap-2">
      <input
        ref={inputRef}
        onChange={(e) => setValue?.(e.target.value)}
        value={value}
        type="color"
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        style={{
          backgroundColor: value || '#000000'
        }}
        className="size-4 outline-3 border dark:border-neutral-900 data-[selected]:outline-lime-400/50 outline-transparent rounded-full"
      />
      <div className="h-2 w-px bg-stone-500/40 my-auto"></div>
      {colors?.map((color) => (
        <button
          type="button"
          onClick={() => setValue?.(color)}
          key={color}
          data-selected={color === value ? '' : undefined}
          className="size-4 outline-3 border dark:border-neutral-900 data-[selected]:outline-lime-400/50 outline-transparent rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  )
}
