/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import ResultInfo from './info'
import ResultTable from './table'
import { Xmark } from '@renderer/ui/icons'
import { ResultCommand } from '@renderer/types'

export function Result({
  results,
  setShowResultPanel,
  error
}: {
  results: ResultCommand<any[]> | null
  error: string | null
  setShowResultPanel: (show: boolean) => void
}) {
  const data = React.useMemo(() => {
    return Array.isArray(results?.results?.[0]) &&
      !!results?.results?.[0]?.[0]?.serverStatus &&
      results?.results.length === 1
      ? results?.results?.[0]
      : results?.results
  }, [results])

  const [tabs, setTabs] = React.useState<number[]>(
    (data ?? []).map((_, idx) => idx)
  )

  const [currentTab, setCurrentTab] = React.useState(0)

  React.useEffect(() => {
    setTabs((data ?? []).map((_, idx) => idx))
    setCurrentTab((data ?? []).length - 1)
  }, [data])

  const { isMany, resultSelected, fieldsSelected } = React.useMemo(() => {
    const resultSelected = data?.[currentTab]
    const fieldsSelected = results?.fields?.[currentTab]

    const isMany = tabs.length > 0
    return { resultSelected, isMany, fieldsSelected }
  }, [tabs, currentTab, data, results])

  return (
    <div className="overflow-auto grow flex flex-col">
      <div className="flex text-sm grow flex-col overflow-auto w-full">
        {error ? (
          <div className="overflow-auto flex flex-col h-full grow">
            <p className="p-2 font-mono opacity-90">
              <IconAlertTriangle
                size={14}
                className="inline-block opacity-60"
              />{' '}
              Query 1: {error}
            </p>
          </div>
        ) : (
          <>
            {tabs.length > 1 && (
              <ul className="flex tracking-tight border-b dark:border-stone-400/10 min-h-[25px] h-[25px] scroll-hide overflow-x-auto divide-x dark:divide-stone-400/10 dark:text-stone-100/70 w-full font-mono dark:bg-[#202020]">
                {tabs.map((tab) => (
                  <li
                    key={tab}
                    data-current={currentTab === tab && isMany ? '' : undefined}
                    className="data-current:dark:text-white data-current:dark:bg-stone-200/20 cursor-pointer w-full relative group/tab flex px-1 items-center justify-between"
                  >
                    <button
                      onClick={() => setCurrentTab(tab)}
                      className="outline-none absolute inset-0"
                    />
                    <div className="basis-0 grow flex" />
                    <p className="text-nowrap pointer-events-none grow flex group-hover/tab:dark:opacity-90 group-data-current/tab:opacity-90">
                      Query {tab + 1}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const newTabs = tabs.filter((i) => i !== tab)
                        setTabs(newTabs)
                        if (currentTab === tab) {
                          setCurrentTab((prev) => {
                            if (newTabs.length === 0) return 0
                            if (prev === 0) return newTabs[0]
                            return newTabs[newTabs.length - 1]
                          })
                        }
                        if (newTabs.length === 0) {
                          setShowResultPanel(false)
                        }
                      }}
                      className="basis-0 transition-opacity flex justify-end opacity-0 group-hover/tab:opacity-30 hover:opacity-80 group-data-current/tab:opacity-50"
                    >
                      <Xmark size={13} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="overflow-auto grow flex flex-col">
              <ResultBody
                idx={currentTab}
                result={resultSelected}
                fields={fieldsSelected}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ResultBody({
  idx,
  result,
  fields
}: {
  result: any
  idx: number
  fields: any[]
}) {
  const isTable = React.useMemo(() => {
    return (
      Array.isArray(result) &&
      result.length > 0 &&
      typeof result[0] === 'object' &&
      !Array.isArray(result[0])
    )
  }, [result])

  const isObject = React.useMemo(() => {
    return typeof result === 'object' && result !== null
  }, [result])

  return (
    <>
      {isTable || fields?.length > 0 ? (
        <ResultTable fields={fields} result={result} />
      ) : isObject ? (
        Object.keys(result).length === 0 ? (
          <p className="text-sm dark:text-stone-200 font-mono p-2">
            Query {idx + 1}: Empty object returned
          </p>
        ) : (
          <ResultInfo data={result} index={idx} />
        )
      ) : (
        <p className="text-sm dark:text-stone-200 font-mono p-2">
          Query {idx + 1}: Ok
        </p>
      )}
    </>
  )
}
