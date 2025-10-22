import migration001 from './001-initial-schema'
import migration002 from './002-add-queries-table'
import migration003 from './003-add-queries-pinned'

export interface Migration {
  version: number
  name: string
  sql: string
}

export const migrations: Migration[] = [
  {
    version: 1,
    name: 'initial_schema',
    sql: migration001
  },
  {
    version: 2,
    name: 'add_queries_table',
    sql: migration002
  },
  {
    version: 3,
    name: 'add_queries_pinned',
    sql: migration003
  }
]
