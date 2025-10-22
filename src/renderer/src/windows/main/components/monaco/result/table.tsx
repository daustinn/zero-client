/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import {
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconFileSpreadsheet,
  IconFileTextSpark
} from '@tabler/icons-react'
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  Table,
  useReactTable
} from '@tanstack/react-table'
import {
  useVirtualizer,
  VirtualItem,
  Virtualizer
} from '@tanstack/react-virtual'
import { cn } from '../../../../../utils/cn'
import exportJson, { copyToClipboardJson } from '../utils/export-json'
import exportCsv, { copyToClipboardCsv } from '../utils/export-csv'
import exportTxt, { copyToClipboardTxt } from '../utils/export-txt'
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuSeparator,
  MenuTrigger
} from '@renderer/ui/commons/menu'
import Button from '@renderer/ui/commons/button'
import { IconJsonAlt } from '@renderer/ui/icons'

export default function ResultTable({
  result,
  fields
}: {
  result: any[]
  fields: any[]
}) {
  const dataWithIndice = React.useMemo(
    () =>
      Array.isArray(result)
        ? result.map((item, idx) => ({ ...item, _originalIndex: idx + 1 }))
        : [],
    [result]
  )

  const columns = React.useMemo<ColumnDef<any>[]>(
    () =>
      [
        {
          accessorKey: '_originalIndex',
          header: '#',
          size: 50,
          maxSize: 80,
          minSize: 30,
          cell: (info) => info.getValue()
        },
        ...fields.map((key) => ({
          accessorKey: key,
          header: key,
          size: 100,
          minSize: 50,
          maxSize: 600
        }))
      ] as ColumnDef<any>[],
    [result]
  )

  const table = useReactTable({
    data: dataWithIndice,
    columns,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })
  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className="grow flex cursor-default flex-col relative overflow-auto">
      <div
        ref={tableContainerRef}
        className="overflow-auto flex flex-col relative grow cursor-default"
      >
        <table className="w-full ">
          <thead className="!bg-[#252526] font-mono z-[1] sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="flex w-full dark:bg-[#292929] divide-x-2 dark:divide-stone-400/10 border-b dark:border-stone-400/10"
              >
                {headerGroup.headers.map((header, key) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        width: header.getSize(),
                        position: 'relative'
                      }}
                      className={cn(
                        'py-px text-center overflow-hidden text-ellipsis',
                        {
                          '[&>div]:justify-end [&>div>p]:opacity-40 !bg-[#292929] z-[1] !sticky left-0':
                            key === 0
                        }
                      )}
                    >
                      <div
                        className="flex px-2 cursor-pointer justify-center"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <p className="select-none text-center font-medium text-nowrap overflow-hidden overflow-ellipsis">
                          {typeof header.column.columnDef.header === 'string'
                            ? header.column.columnDef.header
                            : header.column.id}
                        </p>
                        <div>
                          {{
                            asc: (
                              <IconArrowNarrowUp
                                size={14}
                                className="dark:text-blue-500 inline-block ml-1"
                              />
                            ),
                            desc: (
                              <IconArrowNarrowDown
                                size={14}
                                className="dark:text-blue-500 inline-block ml-1"
                              />
                            )
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </div>
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={cn(
                          'resizer absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none',
                          {
                            'bg-blue-700 opacity-100':
                              header.column.getIsResizing(),
                            'bg-transparent hover:bg-gray-400/50':
                              !header.column.getIsResizing()
                          }
                        )}
                        style={{
                          transform:
                            table.options.columnResizeMode === 'onEnd' &&
                            header.column.getIsResizing()
                              ? `translateX(${
                                  (table.options.columnResizeDirection === 'rtl'
                                    ? -1
                                    : 1) *
                                  (table.getState().columnSizingInfo
                                    .deltaOffset ?? 0)
                                }px)`
                              : ''
                        }}
                      />
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <TableBody table={table} tableContainerRef={tableContainerRef} />
        </table>
      </div>
      <Footer result={result} />
    </div>
  )
}

function Footer({ result }: { result: any[] }) {
  const exportJSON = React.useCallback(() => {
    exportJson(result)
  }, [result])

  const exportCSV = React.useCallback(() => {
    exportCsv(result)
  }, [result])

  const exportTXT = React.useCallback(() => {
    exportTxt(result)
  }, [result])

  const copyToClipboardJSON = React.useCallback(() => {
    copyToClipboardJson(result)
  }, [result])

  const copyToClipboardTXT = React.useCallback(() => {
    copyToClipboardTxt(result)
  }, [result])

  const copyToClipboardCSV = React.useCallback(() => {
    copyToClipboardCsv(result)
  }, [result])

  return (
    <div className="border-t dark:border-neutral-400/20 bg-background p-1 items-center flex justify-between">
      <div className="grow flex basis-0"></div>
      <div className="flex gap-3 opacity-70 items-center">
        <p>{result.length} rows</p>
      </div>
      <div className="grow flex justify-end basis-0">
        <Menu>
          <MenuTrigger asChild>
            <Button variant="transparent" className="h-5">
              Export result
            </Button>
          </MenuTrigger>
          <MenuContent className="w-[180px]" sideOffset={10}>
            <MenuGroup>
              <MenuItem onClick={exportJSON} icon={<IconJsonAlt />}>
                Export (.json)
              </MenuItem>
              <MenuItem onClick={exportCSV} icon={<IconFileSpreadsheet />}>
                Export (.csv)
              </MenuItem>
              <MenuItem onClick={exportTXT} icon={<IconFileTextSpark />}>
                Export (.txt)
              </MenuItem>
            </MenuGroup>
            <MenuSeparator />
            <MenuGroup>
              <MenuItem onClick={copyToClipboardJSON}>Copy JSON</MenuItem>
              <MenuItem onClick={copyToClipboardCSV}>Copy CSV</MenuItem>
              <MenuItem onClick={copyToClipboardTXT}>Copy Text</MenuItem>
            </MenuGroup>
          </MenuContent>
        </Menu>
      </div>
    </div>
  )
}

interface TableBodyProps {
  table: Table<any>
  tableContainerRef: React.RefObject<HTMLDivElement | null>
}

function TableBody({ table, tableContainerRef }: TableBodyProps) {
  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length,
    estimateSize: () => 35,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5
  })

  // When the number of rows changes, we need to re-measure the virtualizer
  React.useEffect(() => {
    if (rowVirtualizer && tableContainerRef.current) {
      rowVirtualizer.measure()
    }
  }, [rowVirtualizer, rows.length])

  return (
    <tbody
      className="relative grid"
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<any>
        return (
          <TableBodyRow
            key={row.id}
            row={row}
            virtualRow={virtualRow}
            rowVirtualizer={rowVirtualizer}
          />
        )
      })}
    </tbody>
  )
}
interface TableBodyRowProps {
  row: Row<any>
  virtualRow: VirtualItem
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>
}

function TableBodyRow({ row, virtualRow, rowVirtualizer }: TableBodyRowProps) {
  return (
    <tr
      data-index={virtualRow.index}
      ref={(node) => rowVirtualizer.measureElement(node)}
      key={row.id}
      className="absolute even:[&>td]:bg-[#282828] center flex w-full divide-x-2 dark:divide-[#2a2929]"
      style={{
        transform: `translateY(${virtualRow.start}px)`
      }}
    >
      {row.getVisibleCells().map((cell, index) => {
        return (
          <Td
            value={cell.getValue()}
            key={cell.id}
            index={index}
            style={{
              width: cell.column.getSize()
            }}
          />
        )
      })}
    </tr>
  )
}

function Td({
  value,
  style,
  index
}: {
  value: unknown
  style: React.CSSProperties
  index: number
}) {
  return (
    <td
      style={style}
      className={cn('flex py-0.5 dark:text-stone-200 ', {
        'justify-end [&>*]:opacity-50 dark:bg-[#1e1d1c] z-[2] !sticky left-0':
          index === 0
      })}
    >
      <div
        title={
          typeof value === 'object'
            ? JSON.stringify(value, null, 2)
            : value === null
              ? 'NULL'
              : String(value)
        }
        className="text-nowrap px-2 overflow-hidden overflow-ellipsis"
      >
        {value === null ? (
          <span className="opacity-40">NULL</span>
        ) : value === '' ? (
          <span className="opacity-40">EMPTY</span>
        ) : typeof value === 'object' ? (
          JSON.stringify(value)
        ) : (
          String(value)
        )}
      </div>
    </td>
  )
}
