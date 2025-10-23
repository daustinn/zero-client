/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useMain } from '../../provider'
import Editor from './editor'
import { Result } from './result'
import getSelectedDatabase from './utils/get-selected-database'
import Resizable from '@renderer/ui/components/resizable'
import { ResultCommand } from '@renderer/types'

export type CursorPosition = {
  lineNumber: number
  column: number
}

export default function Monaco() {
  const {
    query,
    setQueryValue,
    database,
    connection,
    setDatabase,
    setConnection,
    entities
  } = useMain()
  const [results, setResults] = React.useState<ResultCommand<any[]> | null>(
    null
  )

  const { bottomBar, setBottomBar } = useMain()
  const [error, setError] = React.useState<string | null>(null)

  const databaseRef = React.useRef(database)

  // Callbacks
  const onRun = React.useCallback(
    async (sql: string) => {
      try {
        const response = await window.api.coreCommand(sql, connection)
        if (response.ok) {
          setResults(response.data)
          setError(null)
          const changedDatabase = getSelectedDatabase(sql)
          if (changedDatabase) {
            setDatabase(changedDatabase)
            setConnection({ ...connection, database: changedDatabase })
          }
        } else {
          setError(response.error)
          setResults(null)
        }
      } catch (error) {
        setResults(null)
        setError((error as Error).message || 'Unknown error')
      } finally {
        setBottomBar(true)
      }
    },
    [connection, setConnection, setDatabase]
  )

  const onCopy = React.useCallback((text: string) => {
    window.navigator.clipboard.writeText(text)
  }, [])

  React.useEffect(() => {
    databaseRef.current = database
  }, [database])

  const hasResults = React.useMemo(() => {
    if (!results) return false
    if (Array.isArray(results) && results.length === 0) return false
    return true
  }, [results])

  const showPanel = React.useMemo(() => {
    return (!!hasResults || !!error) && bottomBar
  }, [hasResults, error, bottomBar])

  return (
    <div
      data-show={showPanel ? '' : undefined}
      className="grow group/editor flex flex-col overflow-auto"
    >
      <Editor
        entities={entities}
        defaultValue={query?.content || ''}
        onChange={setQueryValue}
        onCopy={onCopy}
        onRun={onRun}
      />
      <Resizable
        show={showPanel}
        handlerPosition="top"
        className="h-[var(--resizable-height)] bg-secondary-background z-[10] !transition-none border-t dark:border-stone-400/20 max-h-[80vh] overflow-auto min-h-[100px] flex flex-col absolute inset-x-0 bottom-0"
        minHeight={100}
      >
        <Result
          error={error}
          setShowResultPanel={setBottomBar}
          results={results}
        />
      </Resizable>
    </div>
  )
}
