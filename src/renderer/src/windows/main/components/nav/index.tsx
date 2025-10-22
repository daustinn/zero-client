import { useMain } from '../../provider'
import useFocus from '../../../../hooks/use-focus'

import { useKeyPress } from 'use-handler-hooks'
import { Tooltip } from '@renderer/ui/commons/tooltip'
import { IconCancel } from '@renderer/ui/icons'
import useTitle from '@renderer/hooks/use-title'
import Queries from './queries'
import React from 'react'
import {
  IconHistory,
  IconLayoutBottombar,
  IconLayoutBottombarFilled
} from '@tabler/icons-react'

export default function Nav() {
  const { connection, database, setBottomBar, bottomBar } = useMain()
  const [open, setOpen] = React.useState(false)
  const focus = useFocus()

  const newQuery = async () => {
    try {
      const res = await window.api.queriesCreate({
        content: null,
        name: null,
        connectionId: connection.id
      })
      if (!res.ok) alert(res.error)
      else window.api.queriesChangeCurrent(res.data)
    } catch (error) {
      window.api.alert({
        type: 'error',
        message: (error as Error).message,
        detail: 'Error creating new query'
      })
    }
  }

  useKeyPress('Ctrl+N', newQuery)

  useKeyPress('Ctrl+Shift+N', () => window.api.windowsStart())

  useKeyPress('Ctrl+Shift+P', () => setOpen((f) => !f))

  useKeyPress('Ctrl+J', () => setBottomBar((f) => !f))

  useTitle(`${connection?.name ?? '...'} - Zero client`)

  return (
    <>
      <nav
        data-focus={focus ? '' : undefined}
        className="flex z-[100] [&>*]:transition-[opacity] items-center [&>*]:opacity-40 [&>*]:grayscale data-focus:[&>*]:grayscale-0 data-focus:[&>*]:opacity-100 [&>*]:pointer-events-none data-focus:[&>*]:pointer-events-auto drag dark:text-white border-b dark:border-stone-500/20 px-[5px] h-[34px] min-h-[34px"
      >
        <div className="flex items-center h-full justify-start [&>button]:h-full [&>button]:flex [&>button]:px-2 [&>button]:items-center [&>button]:dark:text-stone-400">
          <Tooltip tooltip="Disconnect">
            <button
              onClick={() => window.close()}
              className="flex justify-center relative z-[2]"
            >
              <IconCancel size={17} />
            </button>
          </Tooltip>
        </div>

        <div className="overflow-hidden text-sm items-center px-1 gap-3 font-mono rounded-md h-full text-left flex">
          <div
            className="size-2 min-w-2 rounded-full bg-blue-500"
            style={{
              backgroundColor: connection.color
            }}
          />
          <div className="overflow-ellipsis overflow-hidden gap-4">
            <p className="leading-4 text-ellipsis opacity-60 overflow-hidden text-nowrap">
              MySQL | {connection?.name}{' '}
              {database ? ` : ${database}` : undefined}
            </p>
          </div>
        </div>

        <div className="flex items-center grow basis-0 justify-end [&>button]:px-2 h-full [&>button]:dark:text-stone-400">
          <Tooltip tooltip="New query tab (Ctrl+N)">
            <button
              onClick={newQuery}
              className="flex h-full items-center justify-center"
            >
              <IconCancel size={17} className="rotate-45" />
            </button>
          </Tooltip>
          <Tooltip tooltip="Query history (Ctrl+Shift+P)">
            <button
              onClick={() => {
                setOpen(true)
              }}
              className="flex h-full items-center justify-center"
            >
              <IconHistory size={17} />
            </button>
          </Tooltip>
          <Tooltip
            tooltip={
              bottomBar
                ? 'Hide bottom panel (Ctrl+J)'
                : 'Show bottom panel (Ctrl+J)'
            }
          >
            <button
              onClick={() => {
                setBottomBar((f) => !f)
              }}
              className="flex h-full items-center justify-center"
            >
              {bottomBar ? (
                <IconLayoutBottombarFilled size={17} />
              ) : (
                <IconLayoutBottombar size={17} />
              )}
            </button>
          </Tooltip>
          <div className="!w-[calc(100vw-env(titlebar-area-width))]"></div>
        </div>
      </nav>
      <Queries open={open} setOpen={setOpen} />
    </>
  )
}
