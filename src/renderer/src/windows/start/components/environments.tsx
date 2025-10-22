import {
  IconBox,
  IconChevronRight,
  IconCircleArrowRight,
  IconPlus,
  IconRefresh
} from '@tabler/icons-react'

import useQuery from '@renderer/hooks/use-query'
import React from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger
} from '@renderer/ui/commons/context-menu'
import { PlugCircleOutline } from '@renderer/ui/icons'
import Button from '@renderer/ui/commons/button'
import Spinner from '@renderer/ui/commons/spinner'
import ColorPicker from '@renderer/ui/commons/color-picker'
import providers from '@renderer/const/providers'
import { randomColorHex } from '@renderer/utils'
import { Connection, Environment } from '@renderer/types'

export default function Enviroments({
  connections,
  refetch
}: {
  connections: Connection[]
  refetch: () => void
}) {
  const [environments, , { setData }] = useQuery(
    'environments',
    window.api.environments
  )

  React.useEffect(() => {
    const unsub = window.api.environmentsSubscribe(setData)
    return unsub
  }, [])

  const hasEnvironments = React.useMemo(() => {
    return environments && environments.length > 0
  }, [environments])

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="z-[1] absolute inset-0"></div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-[150px]">
          <ContextMenuGroup>
            <ContextMenuLabel className="text-xs opacity-80 font-medium px-2">
              <span className="block pb-1">New</span>
            </ContextMenuLabel>
            {Object.entries(providers).map(([key, provider]) => (
              <ContextMenuItem
                key={key}
                onClick={() => {
                  window.api.windowsConnection({
                    provider: key as keyof typeof providers
                  })
                }}
                icon={<provider.icon />}
              >
                {provider.name}
              </ContextMenuItem>
            ))}
            <ContextMenuItem
              onClick={() => {
                window.api.windowsEnvironment()
              }}
              icon={<IconBox />}
            >
              Environment
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem icon={<IconRefresh />} onClick={refetch}>
              Refetch
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      {hasEnvironments ? (
        <div className="grow h-full overflow-y-auto p-2 flex flex-col">
          {environments?.map((env) => {
            return (
              <EnvironmentComp
                key={env.id}
                environments={environments}
                connections={connections}
                environment={env}
              />
            )
          })}
        </div>
      ) : (
        <div className="grow grid place-content-center text-center text-xs select-none">
          <p className="opacity-50 max-w-xs mx-auto">
            {`No connections! Click right mouse button or the "New Connection"
            button`}
          </p>
        </div>
      )}

      <footer className="relative z-[2]">
        <button
          onClick={() => {
            window.api.windowsConnection({
              provider: 'mysql'
            })
          }}
          className="p-2 hover:underline opacity-40 hover:opacity-80"
        >
          New Connection
        </button>
      </footer>
    </>
  )
}

function EnvironmentComp({
  environment,
  connections,
  environments
}: {
  environment: Environment
  connections: Connection[]
  environments: Environment[]
}) {
  const [expanded, setExpanded] = React.useState(true)
  const list = connections.filter(
    (conn) => conn.environmentId === environment.id
  )

  const handleDeleteEnvironment = () => {
    window.api
      .alert({
        parentId: 'start',
        buttons: ['No, keep it', 'Yes, delete'],
        message: `¿Delete "${environment?.name}" environment?`,
        detail: 'This action cannot be undone.'
      })
      .then((res) => {
        if (res[1]) {
          window.api.environmentsDelete(environment.id)
        }
      })
  }

  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger onClick={() => setExpanded(!expanded)} asChild>
          <button className="flex w-full z-[2] relative py-1.5 items-center">
            <IconChevronRight
              data-expanded={expanded ? '' : undefined}
              size={14}
              className="data-expanded:rotate-90 mx-2 opacity-60 transition-transform"
            />
            <p className="opacity-80">{environment.name}</p>
          </button>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-[200px]">
          <ContextMenuGroup>
            <ContextMenuLabel className="font-medium px-2">
              <span className="block pb-1">New</span>
            </ContextMenuLabel>
            {Object.entries(providers).map(([key, provider]) => (
              <ContextMenuItem
                key={key}
                onClick={() => {
                  window.api.windowsConnection({
                    provider: key as keyof typeof providers,
                    environmentId: environment.id
                  })
                }}
                icon={<provider.icon />}
              >
                {provider.name}
              </ContextMenuItem>
            ))}
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem
              onClick={() => window.api.windowsEnvironment(environment)}
            >
              Edit
            </ContextMenuItem>
            <ContextMenuItem onClick={handleDeleteEnvironment}>
              Delete
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <div
        data-expanded={expanded ? '' : undefined}
        className="pl-7 max-h-0 data-expanded:max-h-[2000px] overflow-hidden flex flex-col"
      >
        {list.length === 0 && (
          <button
            onClick={() =>
              window.api.windowsConnection({
                environmentId: environment.id
              })
            }
            className="dark:text-neutral-300 hover:dark:bg-stone-300/10 text-left flex p-1 rounded-xl z-[2] relative px-2 items-center gap-1.5"
          >
            <div className="rounded-full font-medium text-stone-400 tracking-tight size-[30px] grid place-content-center border-2 dark:border-stone-300/40">
              <IconPlus size={20} />
            </div>
            <div className="grow">
              <p className="">New connection</p>
              <p className="break-all opacity-50">
                New connection in <span>{environment.name}</span>
              </p>
            </div>
          </button>
        )}
        {list.map((conn) => (
          <ConnectionComp
            environments={environments}
            connection={conn}
            key={conn.id}
          />
        ))}
      </div>
    </div>
  )
}

function ConnectionComp({
  connection,
  environments
}: {
  connection: Connection
  environments: Environment[]
}) {
  const [connecting, setConnecting] = React.useState(false)

  const handleDelete = async () => {
    window.api
      .alert({
        parentId: 'start',
        buttons: ['No, keep it', 'Yes, delete'],
        message: `¿Delete "${connection.name}" connection?`,
        detail: 'This action cannot be undone.'
      })
      .then((res) => {
        if (res[1]) {
          window.api.connectionsDelete(connection.id)
        }
      })
  }

  const handleUpdate = (options: Partial<Connection>) => {
    window.api.connectionsUpdate(connection.id, {
      ...connection,
      ...options
    })
  }

  const handleConnect = async (closeOpenStart?: boolean) => {
    setConnecting(true)
    try {
      const res = await window.api.coreTest({
        type: 'mysql',
        host: connection.host!,
        port: connection.port!,
        password: connection.password!,
        user: connection.user!,
        database: connection.database
      })
      if (!res.ok) {
        window.api.alert({
          type: 'error',
          parentId: 'start',
          buttons: ['OK'],
          message: `Connection failed`,
          detail: res.error || 'Unknown error'
        })
        return
      }
      window.api.windowsMain(connection, closeOpenStart).then(() => {
        if (closeOpenStart) window.close()
      })
    } catch (error) {
      window.api.alert({
        type: 'error',
        parentId: 'start',
        buttons: ['OK'],
        message: `Connection error`,
        detail: (error as Error).message || 'Unknown error'
      })
      return
    } finally {
      setConnecting(false)
    }
  }

  const handleDuplicate = () => {
    const nameMatch = connection.name?.match(/^(.*?)(\s\((\d+)\))?$/)
    let newName = connection.name || 'Untitled'

    if (nameMatch) {
      const baseName = nameMatch[1]
      const number = nameMatch[3] ? parseInt(nameMatch[3]) + 1 : 1
      newName = `${baseName} (${number})`
    }

    window.api.connectionsCreate({
      ...connection,
      name: newName,
      color: randomColorHex()
    })
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          key={connection.id}
          className="dark:text-neutral-300 z-[2] relative text-left flex p-1 rounded-xl px-2 items-center gap-1.5"
        >
          <div
            className="rounded-full tracking-tighter font-medium text-stone-950 min-w-[30px] size-[30px] grid place-content-center dark:bg-neutral-500"
            style={{
              backgroundColor: connection.color || undefined
            }}
          >
            {connection.name?.[0]?.toUpperCase() +
              connection.name?.[1]?.toUpperCase() || <PlugCircleOutline />}
          </div>
          <div className="grow overflow-hidden">
            <p className="text-nowrap text-ellipsis overflow-hidden">
              {connection.name}
            </p>
            <p className="text-nowrap text-ellipsis overflow-hidden break-all opacity-50">
              {connection.host}
              {connection.port ? `:${connection.port}` : ''}
              {connection.database ? `/${connection.database}` : ''}
            </p>
          </div>

          <p className="mx-2 pointer-events-none inline-flex dark:bg-neutral-500/30 font-medium rounded-full px-1 py-px text-[10px]">
            <span className="opacity-50">
              {providers[connection.type as keyof typeof providers]?.name}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleConnect(true)}
              variant="outline"
              size="xs"
              disabled={connecting}
              className="h-5 px-3 relative"
            >
              {connecting ? (
                <Spinner size={14} />
              ) : (
                <IconCircleArrowRight size={16} className="opacity-60" />
              )}
              <span>Start</span>
            </Button>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem onClick={() => handleConnect(false)}>
            Open in new window
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem onClick={handleDelete}>Delete</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem
            onClick={() =>
              window.api.windowsConnection({ connetion: connection })
            }
          >
            Edit
          </ContextMenuItem>
          <ContextMenuItem onClick={handleDuplicate}>Duplicate</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel className="p-1 px-2">
            <ColorPicker
              defaultRandom
              color={connection.color}
              onChangeColor={(color) => {
                handleUpdate({
                  color
                })
              }}
            />
          </ContextMenuLabel>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel className="text-xs opacity-50 px-2">
            <span className="block pb-1">Move to</span>
          </ContextMenuLabel>
          {environments.map((env) => {
            if (env.id === connection.environmentId) return null
            return (
              <ContextMenuItem
                key={env.id}
                onClick={() =>
                  handleUpdate({
                    environmentId: env.id
                  })
                }
                icon={<IconBox />}
              >
                {env.name}
              </ContextMenuItem>
            )
          })}
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
