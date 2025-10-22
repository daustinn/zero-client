import React from 'react'
import { cn } from '../../utils/cn'
type Props = React.ComponentProps<'fieldset'> & {
  span?: React.ComponentProps<'span'>
  label?: React.ReactNode
}

export default function Label({
  children,
  className,
  span,
  label,
  ...props
}: Props) {
  return (
    <fieldset
      {...props}
      className={cn('flex w-full items-center gap-3', className)}
    >
      <span
        {...span}
        className={cn(
          'text-nowrap dark:text-stone-300 text-sm text-end inline-block min-w-[50px] w-[50px]',
          span?.className
        )}
      >
        {label}
      </span>
      <div className="w-full">{children}</div>
    </fieldset>
  )
}
