import { useDebounce } from '@renderer/hooks/use-debounce'
import useQuery from '@renderer/hooks/use-query'
import Button from '@renderer/ui/commons/button'
import { Connection, Entity, Query } from '@renderer/types'

import React from 'react'
import { useParams } from 'react-router-dom'

type ContextState = {
  error: string | null
  database: string | null
  setDatabase: (db: string | null) => void
  connection: Connection
  setConnection: (conn: Connection) => void

  query: Query | null
  setQuery: (query: Query) => void
  setQueryValue: (text: string) => void

  entities: Entity[] | null

  bottomBar: boolean
  setBottomBar: React.Dispatch<React.SetStateAction<boolean>>
}

const Context = React.createContext<ContextState>({} as ContextState)

// eslint-disable-next-line react-refresh/only-export-components
export function useMain() {
  return React.useContext(Context)
}

export default function MainProvider({
  children
}: {
  children: React.ReactNode
}) {
  const { id } = useParams()

  const [database, setDatabase] = React.useState<string | null>(null)

  const [bottomBar, setBottomBar] = React.useState(false)

  const [connection, isLoadingConnection, { error, setData: setConnection }] =
    useQuery(`connection-${id}`, () => window.api.connectionsOne(id!), {
      onSuccess(data) {
        setDatabase(data?.database ?? null)
      }
    })

  const [query, isLoadingQuery, { setData: setQueryState }] = useQuery(
    `last-query`,
    () => window.api.queriesLast(connection!.id),
    {
      enabled: !!connection
    }
  )

  const [entities] = useQuery(
    `entities-${database}-${connection?.id}`,
    () => window.api.coreEntities(database!, connection!),
    {
      enabled: !!database && !!connection
    }
  )

  const [, setValue] = useDebounce({
    delay: 2000,
    onChange(value) {
      setQueryState((pre) => (pre ? { ...pre, content: value } : pre))
    },
    onDebounced(value) {
      if (!query) return
      window.api.queriesUpdate(query.id, {
        content: value,
        name: query?.name,
        connectionId: query?.id
      })
    }
  })

  React.useEffect(() => {
    window.api.queriesChangeSubscribe((query) => {
      setQueryState(query)
    })
  }, [])

  if (isLoadingConnection) {
    return (
      <main className="h-svh drag w-full grid place-content-center">
        <p className="text-sm opacity-30">Loading...</p>
      </main>
    )
  }

  if (isLoadingQuery) {
    return (
      <main className="h-svh drag w-full grid place-content-center">
        <p className="text-sm opacity-30">Loading...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="h-svh w-full grid place-content-center px-5">
        <p className="text-center pb-2 text-sm dark:text-red-400">
          {error || 'An error occurred while fetching connection.'}
        </p>
        <Button
          variant="outline"
          size="xs"
          className="w-fit mx-auto h-6"
          onClick={() => window.close()}
        >
          Close connection
        </Button>
      </main>
    )
  }

  if (!connection) {
    return (
      <main className="h-svh w-full grid place-content-center px-5">
        <p className="text-center pb-2 text-sm dark:text-red-400">
          Connection not found.
        </p>
        <Button
          variant="outline"
          size="xs"
          className="w-fit mx-auto h-6"
          onClick={() => window.close()}
        >
          Close connection
        </Button>
      </main>
    )
  }

  return (
    <Context.Provider
      value={{
        bottomBar,
        setBottomBar,
        connection,
        error,
        entities,
        database,
        setDatabase,
        query,
        setQuery: setQueryState,
        setQueryValue: setValue,
        setConnection
      }}
    >
      {children}
    </Context.Provider>
  )
}
