/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Connection,
  ConnectionInput,
  Environment,
  EnvironmentInput,
  MoveConnectionInput,
  Query,
  QueryInput
} from '../../types'
import { response } from '../../utils'
import Database from '../database'
import windowsStore from '../store/windows'
import { id } from '../utils'

export class ZeroClientService {
  // Environments
  static getEnvironments() {
    try {
      const db = Database.db()

      const sql =
        "SELECT *, datetime(createdAt, 'localtime') AS createdAt FROM environments ORDER BY createdAt DESC"

      const rows = db.prepare(sql).all() as Environment[]

      return response(true, rows)
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }

  static createEnvironment(environment: EnvironmentInput) {
    try {
      const db = Database.db()
      const now = new Date().toISOString()

      const newEnvironment: Environment = {
        ...environment,
        id: id(),
        createdAt: now,
        updatedAt: null
      }

      const sql = 'INSERT INTO environments (id, name) VALUES (?, ?)'

      db.prepare(sql).run(newEnvironment.id, newEnvironment.name)

      const newEnvironments = this.getEnvironments()

      windowsStore.sendToAll(
        'zero:environments:subscribe',
        newEnvironments.ok ? newEnvironments.data : []
      )

      return response(true, newEnvironment)
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }

  static updateEnvironment(id: string, environment: EnvironmentInput) {
    try {
      const db = Database.db()

      const now = new Date().toISOString()

      const sql = 'UPDATE environments SET name = ?, updatedAt = ? WHERE id = ?'

      const result = db.prepare(sql).run(environment.name, now, id)

      const newEnvironments = this.getEnvironments()

      windowsStore.sendToAll(
        'zero:environments:subscribe',
        newEnvironments.ok ? newEnvironments.data : []
      )

      return response(true, String(result?.lastInsertRowid))
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }

  static deleteEnvironment(id: string) {
    try {
      const db = Database.db()

      const sqlConnections = `DELETE FROM connections WHERE environmentId = ?`

      db.prepare(sqlConnections).run(id)

      const sql = `DELETE FROM environments WHERE id = ?`

      const result = db.prepare(sql).run(id)

      const newEnvironments = this.getEnvironments()
      const newConnections = this.getConnections()

      windowsStore.sendToAll(
        'zero:environments:subscribe',
        newEnvironments.ok ? newEnvironments.data : []
      )
      windowsStore.sendToAll(
        'zero:connections:subscribe',
        newConnections.ok ? newConnections.data : []
      )

      return response(true, String(result?.lastInsertRowid))
    } catch (error) {
      console.log({ error })

      return response(false, (error as Error).name)
    }
  }

  // Connections
  static createConnection(connection: ConnectionInput) {
    try {
      const db = Database.db()
      const now = new Date().toISOString()

      const newConnection: Connection = {
        ...connection,
        id: id(),
        createdAt: now,
        updatedAt: null
      }

      const sql = `
        INSERT INTO connections (id, name, color, type, host, port, database, user, password, url, environmentId)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

      const stmt = db.prepare(sql)

      stmt.run(
        newConnection.id,
        newConnection.name,
        newConnection.color,
        newConnection.type,
        newConnection.host || null,
        newConnection.port || null,
        newConnection.database || null,
        newConnection.user || null,
        newConnection.password || null,
        null,
        newConnection.environmentId || null
      )

      this.createQuery({
        name: null,
        content: null,
        connectionId: newConnection.id
      })

      const newConnections = this.getConnections()

      windowsStore.sendToAll(
        'zero:connections:subscribe',
        newConnections.ok ? newConnections.data : []
      )

      return response(true, newConnection)
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }

  static updateConnection(id: string, connection: ConnectionInput) {
    try {
      const db = Database.db()
      const now = new Date().toISOString()

      const sql = `
        UPDATE connections
        SET name = ?, color = ?, type = ?, host = ?, port = ?, database = ?, user = ?, password = ?, environmentId = ?, updatedAt = ?
        WHERE id = ?
      `

      const result = db
        .prepare(sql)
        .run(
          connection.name,
          connection.color,
          connection.type,
          connection.host ?? null,
          connection.port ?? null,
          connection.database ?? null,
          connection.user ?? null,
          connection.password ?? null,
          connection.environmentId ?? null,
          now,
          id
        )

      const newConnections = this.getConnections()

      windowsStore.sendToAll(
        'zero:connections:subscribe',
        newConnections.ok ? newConnections.data : []
      )

      return response(true, String(result.lastInsertRowid))
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }

  static moveConnectionToEnv(prop: MoveConnectionInput) {
    try {
      const db = Database.db()

      const now = new Date().toISOString()

      const sql = `
          UPDATE connections
          SET environmentId = ?, updatedAt = ?
          WHERE id = ?
        `

      const result = db.prepare(sql).run(prop.envId, now, prop.id)

      const newConnections = this.getConnections()

      windowsStore.sendToAll(
        'zero:connections:subscribe',
        newConnections.ok ? newConnections.data : []
      )

      return response(true, String(result?.lastInsertRowid))
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }

  static deleteConnection(id: string) {
    try {
      const db = Database.db()

      const sql = `DELETE FROM connections WHERE id = ?`

      const result = db.prepare(sql).run(id)

      const newConnections = this.getConnections()

      windowsStore.sendToAll(
        'zero:connections:subscribe',
        newConnections.ok ? newConnections.data : []
      )

      return response(true, String(result?.lastInsertRowid))
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }

  static getConnections() {
    try {
      const db = Database.db()

      const sql = `SELECT *, datetime(createdAt, 'localtime') AS createdAt FROM connections ORDER BY createdAt DESC `

      const rows = db.prepare(sql).all() as Connection[]

      return response(true, rows)
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }

  static getConnection(id: string) {
    try {
      const db = Database.db()

      const sql = `SELECT c.*, e.id as envId, e.name as envName FROM connections AS c INNER JOIN environments AS e ON c.environmentId = e.id WHERE c.id = ?`

      const row = db.prepare(sql).get(id) as any

      return response(true, {
        ...row,
        environment: {
          id: row.envId,
          name: row.envName
        }
      } as Connection)
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }

  // Queries
  static getQueries(q?: string) {
    try {
      const db = Database.db()

      let sql =
        "SELECT *, datetime(createdAt, 'localtime') AS createdAt FROM queries"
      const params: any[] = []

      if (q && q.trim().length > 0) {
        sql += ' WHERE name LIKE ? OR content LIKE ?'
        const search = `%${q}%`
        params.push(search, search)
      }

      sql += ' ORDER BY updatedAt DESC'

      const rows = db.prepare(sql).all(...params) as Query[]

      return response(true, rows)
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }

  static createQuery(input: QueryInput) {
    try {
      const db = Database.db()

      const newQuery = {
        ...input,
        id: id()
      } as Query

      const sql =
        'INSERT INTO queries (id, name, content, connectionId) VALUES (?, ?, ?, ?)'

      db.prepare(sql).run(
        newQuery.id,
        newQuery.name,
        newQuery.content,
        input.connectionId
      )

      const newQueries = this.getQueries()

      windowsStore.sendToAll('queries', newQueries.ok ? newQueries.data : [])

      return response(true, newQuery)
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }

  static updateQuery(id: string, query: QueryInput) {
    const { onUpdatedAt = true } = query
    try {
      const db = Database.db()
      const now = new Date().toISOString()

      const sql = onUpdatedAt
        ? 'UPDATE queries SET name = ?, content = ?, updatedAt = ? WHERE id = ?'
        : 'UPDATE queries SET name = ?, content = ? WHERE id = ?'

      const result = onUpdatedAt
        ? db.prepare(sql).run(query.name, query.content, now, id)
        : db.prepare(sql).run(query.name, query.content, id)

      const newQueries = this.getQueries()

      windowsStore.sendToAll('queries', newQueries.ok ? newQueries.data : [])

      return response(true, String(result?.lastInsertRowid))
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }

  static getQuery(id: string) {
    try {
      const db = Database.db()

      const sql = 'SELECT * FROM queries WHERE id = ?'

      const row = db.prepare(sql).get(id) as Query

      return response(true, row)
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }

  static getLastQuery(connId: string) {
    try {
      const db = Database.db()

      const sql =
        'SELECT * FROM queries WHERE connectionId = ? ORDER BY updatedAt DESC LIMIT 1'

      let row = db.prepare(sql).get(connId) as Query

      if (!row) {
        const res = this.createQuery({
          name: null,
          content: null,
          connectionId: connId
        })
        if (res.ok) row = res.data
      }

      return response(true, row)
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }

  static changeQuery(winId: string, query: Query) {
    try {
      windowsStore.sendToWindow(winId, 'zero:queries:change:subscribe', query)
      return response(true, 'Ok')
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }

  static deleteQuery(id: string) {
    try {
      const db = Database.db()

      const sql = 'DELETE FROM queries WHERE id = ?'

      db.prepare(sql).run(id)

      const newQueries = this.getQueries()

      windowsStore.sendToAll('queries', newQueries.ok ? newQueries.data : [])

      return response(true, newQueries.ok ? newQueries.data : [])
    } catch (error) {
      return response(false, (error as Error).name)
    }
  }
}
