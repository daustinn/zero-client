import React from 'react'
import { cn } from '../../utils/cn'
import WarningImage from '@renderer/assets/warning.webp'
import { Tooltip } from './tooltip'
type Props = React.ComponentProps<'input'> & {
  error?: string
  success?: boolean
  input?: React.ComponentProps<'input'>
  beforeContent?: React.ReactNode
}

export default function Input({
  error,
  className,
  input,
  success,
  disabled,
  beforeContent,
  ...props
}: Props) {
  const [focus, setFocus] = React.useState(false)
  return (
    <div
      data-disabled={disabled ? '' : undefined}
      data-success={success ? '' : undefined}
      data-error={error ? '' : undefined}
      data-focus={focus ? '' : undefined}
      className={cn(
        'h-[25px] dark:bg-[#292927] relative data-disabled:border-transparent disabled:dark:bg-[#212121] data-disabled:dark:text-neutral-300/30 w-full border border-[#323232] border-b-stone-700 rounded-md dark:text-neutral-200 flex items-center data-error:dark:!bg-red-400/30 data-success:dark:bg-lime-400/30',
        'outline-4 outline-offset-px transition-all data-focus:outline-[#588b48] outline-transparent data-focus:border-[#5e9f4b]',
        className
      )}
    >
      {beforeContent}
      <input
        {...props}
        {...input}
        onFocus={(e) => {
          setFocus(true)
          input?.onFocus?.(e)
        }}
        onBlur={(e) => {
          setFocus(false)
          input?.onBlur?.(e)
        }}
        disabled={disabled || input?.disabled}
        data-error={error ? '' : undefined}
        className={cn(
          'placeholder:opacity-50 data-error:pr-6 outline-none px-3 w-full h-full',
          input?.className
        )}
      />
      {error && (
        <Tooltip tooltip={error}>
          <img
            src={WarningImage}
            alt="warning"
            className="w-4 h-4 absolute right-1 top-1/2 -translate-y-1/2"
          />
        </Tooltip>
      )}
    </div>
  )
}
