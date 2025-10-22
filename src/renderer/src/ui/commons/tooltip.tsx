'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '../../utils/cn'

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
}

function Tooltip({
  tooltip,
  children,
  defaultOpen,
  className,
  delayDuration = 400,
  sideOffset = 5,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & {
  tooltip: React.ReactNode
  defaultOpen?: boolean
  delayDuration?: number
}) {
  return (
    <TooltipPrimitive.Root
      delayDuration={delayDuration}
      defaultOpen={defaultOpen}
      disableHoverableContent
      {...props}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          alignOffset={20}
          sideOffset={sideOffset}
          className={cn(
            'dark:bg-[#141414] max-w-[300px] border py-1 px-2 dark:border-stone-500/20 mx-2 shadow-[0_2px_9px_rgba(5,5,5,.5)] rounded-md text-sm z-50 dark:text-neutral-200/50',
            className
          )}
          {...props}
        >
          {tooltip}
          {/* <TooltipPrimitive.Arrow className="bg-[#272622] fill-[#272622] z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" /> */}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}

export { Tooltip, TooltipProvider }
