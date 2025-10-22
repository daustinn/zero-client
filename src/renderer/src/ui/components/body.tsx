import React from 'react'
import { cn } from '@renderer/utils/cn'
import useFocus from '@renderer/hooks/use-focus'

type Props = Omit<React.ComponentProps<'main'>, 'title'> & {
  title?: React.ReactNode
  rightNav?: React.ReactNode
}

export default function Body({
  children,
  className,
  rightNav,
  title,
  ...props
}: Props) {
  const focus = useFocus()

  return (
    <main
      {...props}
      className={cn(
        'flex overflow-auto w-full bg-body h-dvh flex-col',
        className
      )}
    >
      <nav className="drag group flex justify-between h-[30px] min-h-[30px] dark:border-neutral-500/20 p-1 px-3">
        <div
          data-focus={focus ? '' : undefined}
          className="opacity-50 data-focus:opacity-100 gap-2 h-full flex items-center"
        >
          {title}
        </div>
        <div
          data-focus={focus ? '' : undefined}
          className="opacity-70 data-focus:opacity-100 grow basis-0 justify-end flex items-center"
        >
          {rightNav}
          <div className="!w-[calc(100vw-env(titlebar-area-width))]"></div>
        </div>
      </nav>
      {children}
    </main>
  )
}
