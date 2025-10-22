import useQuery from '@renderer/hooks/use-query'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@renderer/ui/commons/command'
import { timeAgo } from '@renderer/utils/dayjs'
import { IconBolt, IconCheck, IconPencil, IconTrash } from '@tabler/icons-react'
import { Query } from '@renderer/types'
import React from 'react'
import { useMain } from '../../provider'

const periods = {
  today: 'Today',
  yesterday: 'Yesterday',
  thisWeek: 'This Week',
  thisMonth: 'This Month',
  older: 'Older'
}

type PeriodKey = keyof typeof periods

export default function Queries({
  setOpen,
  open
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const [queries, , { setData, execute }] = useQuery(
    'queries',
    window.api.queries,
    {
      enabled: open,
      cache: false
    }
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
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type or search query..." />
        <CommandList>
          <CommandEmpty className="p-5 text-center opacity-40">
            Query not found. Try searching again.
          </CommandEmpty>
          {Object.entries(grouped).map(([key, group], i) => {
            if (group.length === 0) return null
            return (
              <React.Fragment key={key}>
                {i !== 0 ? <CommandSeparator /> : null}
                <CommandGroup heading={periods[key as PeriodKey]}>
                  {group.map((query) => (
                    <QueryComp
                      key={query.id}
                      query={query}
                      setOpen={setOpen}
                      setData={setData}
                      refetch={execute}
                    />
                  ))}
                </CommandGroup>
              </React.Fragment>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}

function QueryComp({
  query,
  refetch,
  setData,
  setOpen
}: {
  query: Query
  setData: (data: Query[]) => void
  refetch: () => void
  setOpen: (f: boolean) => void
}) {
  const { query: currentQuery } = useMain()
  const [edit, setEdit] = React.useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
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

  const isCurrent = currentQuery?.id === query.id

  const handleEdit = (value: string) => {
    window.api.queriesUpdate(query.id, {
      name: value,
      content: query.content,
      connectionId: query.connectionId,
      onUpdatedAt: false
    })
  }

  const handleBlur = () => {
    setEdit(false)
    refetch()
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    edit ? handleBlur() : setEdit(true)
  }

  return (
    <CommandItem
      defaultChecked={isCurrent}
      onSelect={() => {
        window.api.queriesChangeCurrent(query)
        setOpen(false)
      }}
      className="group/query relative"
    >
      <IconBolt size={18} className="opacity-50 mx-1 min-w-[18px]" />
      <div className="grow">
        {edit ? (
          <input
            autoFocus
            type="text"
            onBlur={handleBlur}
            defaultValue={query.name || ''}
            onChange={(e) => handleEdit(e.target.value)}
            className="relative z-[4] py-px outline-none w-full placeholder:opacity-50"
            placeholder="Query name"
          />
        ) : (
          <p className="group-hover/query:opacity-100 grow text-ellipsis text-base overflow-hidden line-clamp-1">
            {query.name || <span className="opacity-70">Query</span>}
          </p>
        )}
        <p className="text-xs opacity-40 pt-px text-nowrap">
          {timeAgo(query.createdAt)}
        </p>
        <span className="hidden">{query.id}</span>
      </div>
      {isCurrent && (
        <div className="text-xs opacity-30 text-nowrap mr-1 select-none">
          Current
        </div>
      )}
      <div className="hidden relative px-2 gap-1.5 z-[2] group-hover/query:flex group-data-edit/query:flex">
        <button
          onClick={handleEditClick}
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
    </CommandItem>
  )
}
