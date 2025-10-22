import React from 'react'

type Props = React.ComponentProps<'svg'> & {
  size?: number
}

export default function Spinner({ size = 20, ...props }: Props) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className="animate-spin dark:text-stone-400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="7"
        width="1.5"
        height="5"
        rx="1"
        fill="currentColor"
        fillOpacity="0.8"
      />
      <rect
        x="12.9497"
        y="1.63604"
        width="1.5"
        height="5"
        rx="1"
        transform="rotate(45 12.9497 1.63604)"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <rect
        x="16"
        y="7"
        width="1.5"
        height="5"
        rx="1"
        transform="rotate(90 16 7)"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <rect
        x="14.364"
        y="12.9497"
        width="1.5"
        height="5"
        rx="1"
        transform="rotate(135 14.364 12.9497)"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <rect
        x="9"
        y="16"
        width="1.5"
        height="5"
        rx="1"
        transform="rotate(180 9 16)"
        fill="currentColor"
        fillOpacity="0.4"
      />
      <rect
        x="3.05025"
        y="14.364"
        width="1.5"
        height="5"
        rx="1"
        transform="rotate(-135 3.05025 14.364)"
        fill="currentColor"
        fillOpacity="0.5"
      />
      <rect
        y="9"
        width="1.5"
        height="5"
        rx="1"
        transform="rotate(-90 0 9)"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <rect
        x="1.63604"
        y="3.05025"
        width="1.5"
        height="5"
        rx="1"
        transform="rotate(-45 1.63604 3.05025)"
        fill="currentColor"
        fillOpacity="0.7"
      />
    </svg>
  )
}
