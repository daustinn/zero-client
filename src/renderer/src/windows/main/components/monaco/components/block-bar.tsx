import { IconCopy, IconLogs, IconPlayerPlay } from '@tabler/icons-react'
import { RunBlockBarProps } from './block-zone'
import React from 'react'
import Spinner from '@renderer/ui/commons/spinner'

export const RunBlockBar = ({ onRun, onCopy, onSelect }: RunBlockBarProps) => {
  const [isRunning, setIsRunning] = React.useState(false)

  const handleRun = async () => {
    setIsRunning(true)
    await onRun()
    setIsRunning(false)
  }

  return (
    <div className="h-full flex pb-0.5 items-end text-sm [&>button]:!outline-none font-semibold dark:text-stone-300">
      <button
        onClick={handleRun}
        disabled={isRunning}
        className="flex disabled:opacity-40 disabled:pointer-events-none opacity-30 items-center hover:opacity-100 gap-1"
      >
        {isRunning ? (
          <Spinner size={14} />
        ) : (
          <IconPlayerPlay size={14} strokeWidth={3} />
        )}
        <p>Run block</p>
      </button>
      <div className="px-1.5 opacity-30">|</div>
      <button
        onClick={onSelect}
        className="flex opacity-30 items-center hover:opacity-100 gap-1"
      >
        <IconLogs size={15} strokeWidth={3} />
        <p>Select block</p>
      </button>
      <div className="px-1.5 opacity-30">|</div>
      <button
        onClick={onCopy}
        className="flex opacity-30 items-center hover:opacity-100 gap-1"
      >
        <IconCopy size={14} strokeWidth={3} />
        <p>Copy</p>
      </button>
    </div>
  )
}
