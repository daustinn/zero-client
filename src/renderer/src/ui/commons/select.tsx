'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '../../utils/cn'
import { IconCheck, IconSelector } from '@tabler/icons-react'
import { Tooltip } from './tooltip'
import WarningImage from '@renderer/assets/warning.webp'

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      className={cn('text-nowrap line-clamp-1', className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  children,
  error,
  success,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  error?: string
  success?: boolean
}) {
  return (
    <SelectPrimitive.Trigger
      data-error={error ? '' : undefined}
      data-success={success ? '' : undefined}
      disabled={props.disabled}
      className={cn(
        'dark:bg-[#4a4945] text-nowrap text-ellipsis overflow-hidden relative data-disabled:border-transparent disabled:dark:bg-[#212121] data-disabled:dark:text-neutral-300/30 w-full border border-[#323232] border-b-stone-500 rounded-md dark:text-neutral-200 data-error:dark:!bg-red-400/30 data-success:dark:bg-lime-300/40 placeholder:opacity-20 outline-4 text-left outline-offset-px focus:outline-[#588b48] outline-transparent flex items-center data-error:pr-6 px-3 pr-0 h-[25px] data-focus:border-[#5e9f4b]',
        className
      )}
      {...props}
    >
      {children}
      <div className="ml-auto flex flex-col">
        <SelectPrimitive.Icon asChild>
          <IconSelector size={20} />
        </SelectPrimitive.Icon>
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
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        sideOffset={6}
        className={cn(
          'dark:bg-[#4b4b4b] border dark:border-neutral-500/30 shadow-[0_0_15px_rgba(5,5,5,.5)] rounded-lg',
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-0.5',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'text-sm rounded-md flex items-center p-[3px] pr-3 outline-none cursor-default ',
        'data-[state="checked"]:dark:bg-[#0c59e9] dark:text-white focus:dark:bg-neutral-500/40',
        className
      )}
      {...props}
    >
      <div className="w-[23px] justify-center flex">
        <SelectPrimitive.ItemIndicator>
          <IconCheck size={13} strokeWidth={3} />
        </SelectPrimitive.ItemIndicator>
      </div>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator className={cn('', className)} {...props} />
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton className={cn('', className)} {...props}>
      {/* <ChevronUpIcon className="size-4" /> */}
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton className={cn('', className)} {...props}>
      {/* <ChevronDownIcon className="size-4" /> */}
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}
