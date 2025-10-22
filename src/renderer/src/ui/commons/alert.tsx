import { IconAlertTriangle } from '@tabler/icons-react'
import { cva } from 'class-variance-authority'
import React from 'react'

type Props = React.ComponentProps<'div'> & {
  title?: React.ReactNode
}

const alertVariants = cva(
  'border w-fit flex items-center gap-2 p-2 rounded-lg',
  {
    variants: {
      color: {
        default:
          'dark:border-neutral-500/40 dark:text-stone-200 dark:bg-neutral-500/10',
        success: ''
      }
    },
    defaultVariants: {
      color: 'default'
    }
  }
)

export default function Alert({ children, ...props }: Props) {
  return (
    <div role="alert" {...props} className={alertVariants()}>
      <IconAlertTriangle size={20} />
      <div className="">{children}</div>
    </div>
  )
}
