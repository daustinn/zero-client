import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  '[&>svg]:w-5 cursor-pointer rounded-[5px] disabled:grayscale !outline-none disabled:[&>svg]:opacity-100 disabled:[&>*]:opacity-30 text-sm disabled:opacity-50 flex outline-none justify-center gap-2 items-center',
  {
    variants: {
      variant: {
        default:
          'dark:border-neutral-500/80 dark:bg-neutral-200/20 disabled:!cursor-default dark:text-neutral-300 not-disabled:hover:dark:text-neutral-100',
        transparent:
          'not-disabled:hover:dark:bg-neutral-500/10 disabled:!cursor-default dark:text-neutral-400 not-disabled:hover:dark:text-neutral-100',
        outline:
          'border border-neutral-500/30 dark:text-neutral-300 disabled:!cursor-default not-disabled:hover:dark:bg-neutral-500/10'
      },
      size: {
        xs: 'h-4 text-xs px-2',
        sm: 'h-6 text-sm px-3',
        lg: 'h-10 text-md px-5'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm'
    }
  }
)

type Props = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export default function Button({ className, variant, size, ...props }: Props) {
  return (
    <button
      {...props}
      className={buttonVariants({
        className,
        variant,
        size
      })}
    />
  )
}
