import { useSearchParams } from 'react-router-dom'
import {
  IconBolt,
  IconCheck,
  IconPencil,
  IconSearch,
  IconTrash
} from '@tabler/icons-react'
import React from 'react'
import useQuery from '@renderer/hooks/use-query'
import { useDebounce } from '@renderer/hooks/use-debounce'
import { Query } from '@renderer/types'
import Body from '@renderer/ui/components/body'
import Input from '@renderer/ui/commons/input'
import { format, timeAgo } from '@renderer/utils/dayjs'

const periodos = {
  today: 'Today',
  yesterday: 'Yesterday',
  thisWeek: 'This Week',
  thisMonth: 'This Month',
  older: 'Older'
}

type PeriodKey = keyof typeof periodos

export default function MainQueriesPage() {
  const [debouncedValue, setValue, value] = useDebounce({
    delay: 200
  })

  const [queries, isLoading, { execute, setData }] = useQuery(
    `queries-${debouncedValue}`,
    () => window.api.queries(debouncedValue)
  )

  const grouped = React.useMemo(() => {
    const groups: { [key: string]: Query[] } = {
      today: [],
      yesterday: [],
      thisWeek: [],
      thisMonth: [],
      older: []
    }
    const now = new Date()

    queries?.forEach((query) => {
      const createdAt = new Date(query.createdAt)
      const diffTime = now.getTime() - createdAt.getTime()
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 0) {
        groups.today.push(query)
      } else if (diffDays === 1) {
        groups.yesterday.push(query)
      } else if (diffDays < 7) {
        groups.thisWeek.push(query)
      } else if (diffDays < 30) {
        groups.thisMonth.push(query)
      } else {
        groups.older.push(query)
      }
    })

    return groups
  }, [queries])

  return (
    <Body title="Queries">
      <div className="flex flex-col grow overflow-auto">
        <div className="px-3 py-1 pb-3">
          <Input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search query..."
            beforeContent={<IconSearch size={17} className="opacity-40 ml-3" />}
          />
        </div>
        {isLoading ? (
          <div className="grow grid place-content-center text-sm opacity-30">
            Loading...
          </div>
        ) : queries.length === 0 ? (
          <div className="grow grid place-content-center text-sm opacity-30">
            No queries found
          </div>
        ) : (
          <ul className="overflow-auto grow ">
            {Object.entries(grouped).map(
              ([key, group]) =>
                group.length > 0 && (
                  <li key={key} className="">
                    <div className="border-b dark:border-stone-300/10 px-4">
                      <h3 className="text-sm font-medium opacity-30 mb-1">
                        {periodos[key as PeriodKey]}
                      </h3>
                    </div>
                    <ul className="p-1">
                      {group.map((query) => (
                        <QueryExecutionComp
                          setData={setData}
                          query={query}
                          key={query.id}
                          refetch={execute}
                        />
                      ))}
                    </ul>
                  </li>
                )
            )}
          </ul>
        )}
      </div>
    </Body>
  )
}

function QueryExecutionComp({
  query,
  refetch,
  setData
}: {
  query: Query
  setData: (data: Query[]) => void
  refetch: () => void
}) {
  const [search] = useSearchParams()
  const [edit, setEdit] = React.useState(false)
  const [name, setName] = React.useState(query.name)

  const handleDelete = async () => {
    const confirm = await window.api.alert({
      type: 'question',
      message: 'Are you sure you want to delete this query execution?',
      detail: 'This action cannot be undone.',
      buttons: ['No, cancel', 'Yes, Delete']
    })

    if (confirm[1]) {
      const res = await window.api.queriesDelete(query.id)
      if (res.ok) setData(res.data)
    }
  }

  const isCurrent = search.get('currentQueryId') === query.id

  const parentId = search.get('parentId') || ''

  const handleEdit = async () => {
    setEdit(false)
    await window.api.queriesUpdate(query.id, {
      name,
      content: query.content,
      connectionId: query.connectionId
    })
    refetch()
  }

  return (
    <li
      tabIndex={0}
      data-disabled={isCurrent ? '' : undefined}
      data-edit={edit ? '' : undefined}
      className="hover:dark:bg-stone-600/40 w-full rounded-lg group/query flex items-center relative p-1 px-2 overflow-hidden text-left gap-2"
    >
      <button
        disabled={isCurrent}
        onDoubleClick={() => {
          window.api.queriesChange(parentId, query)
          window.close()
        }}
        className="absolute disabled:pointer-events-none outline-none inset-0 z-[1]"
      />
      <IconBolt size={20} className="opacity-40 min-w-[20px]" />
      <div className="grow">
        {edit ? (
          <input
            autoFocus
            type="text"
            value={name ?? ''}
            onChange={(e) => setName(e.target.value)}
            className="relative z-[4] outline-none w-full placeholder:opacity-20"
            placeholder="Query name"
            onBlur={handleEdit}
          />
        ) : (
          <p className="group-hover/query:opacity-100 grow text-ellipsis opacity-80  overflow-hidden line-clamp-1">
            {query.name || <span className="opacity-70">Query</span>}
          </p>
        )}
        <p className="text-xs opacity-30 font-medium text-nowrap">
          {timeAgo(query.createdAt)} | {format(query.createdAt, 'DD MMM YYYY')}
        </p>
      </div>
      {isCurrent && (
        <div className="text-xs opacity-30 text-nowrap mr-1 select-none">
          Current
        </div>
      )}
      <div className="hidden relative px-2 gap-1.5 z-[2] group-hover/query:flex group-data-edit/query:flex">
        <button
          onClick={() => {
            edit ? handleEdit() : setEdit(true)
          }}
          className="opacity-50 hover:opacity-100"
        >
          {edit ? <IconCheck size={16} /> : <IconPencil size={16} />}
        </button>
        {!isCurrent && (
          <button
            onClick={handleDelete}
            className="opacity-50 hover:opacity-100"
          >
            <IconTrash size={16} />
          </button>
        )}
      </div>
    </li>
  )
}
