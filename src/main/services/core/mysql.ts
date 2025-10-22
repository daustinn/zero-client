/* eslint-disable @typescript-eslint/no-explicit-any */

import mysql from 'mysql2/promise'
import { Connection, Entity, TestConnectionRequest } from '../../../types'
import { response } from '../../../utils'
import Database from '../../database'
import { serializedFields } from '../../utils'

type PoolConnection = {
  winId: string
  connId: string
  pool: mysql.Pool
}

const pools: PoolConnection[] = []

export default class MySQL {
  static getPool(winId: string, conn: Connection) {
    let poolConn = pools.find((p) => p.winId === winId)
    if (!poolConn) {
      const newPool = mysql.createPool({
        host: conn.host || 'localhost',
        port: Number(conn.port) || 3306,
        user: conn.user,
        password: conn.password,
        database: conn.database || undefined,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        multipleStatements: true,
        connectTimeout: 10000,
        charset: 'utf8mb4',
        supportBigNumbers: true,
        bigNumberStrings: true,
        dateStrings: true
      })
      poolConn = { winId, connId: conn.id, pool: newPool }
      pools.push(poolConn)
    }
    return poolConn.pool
  }

  static removePool(winId: string) {
    const index = pools.findIndex((p) => p.winId === winId)
    if (index !== -1) {
      pools.splice(index, 1)
    }
  }

  static async testConnection(req: TestConnectionRequest) {
    if (req.type !== 'mysql')
      return response(false, 'Invalid request type for MySQL connection test.')
    try {
      const client = await mysql.createConnection({
        host: req.host,
        port: Number(req.port),
        user: req.user,
        password: req.password,
        database: req.database
      })

      await client.connect()
      await client.end()

      return response(true, 'Successfully connected to MySQL server.')
    } catch (error) {
      return response(
        false,
        (error as Error).message || 'Error stablishing MySQL connection.'
      )
    }
  }

  static async connectPool(winId: string, conn: Connection) {
    const pool = this.getPool(winId, conn)
    return pool
  }

  static async getDatabases(winId: string, conn: Connection) {
    const pool = this.getPool(winId, conn)

    const connection = await pool!.getConnection()

    try {
      const [rows] = await connection.query(`SELECT
          table_schema AS name,
          SUM(data_length + index_length) AS size,
          COUNT(table_name) AS count
          FROM information_schema.tables
          GROUP BY table_schema
          ORDER BY name;`)

      const databases: Database[] = (rows as any[]).map((row) => ({
        name: row.name,
        count: row.count,
        size: row.size
      }))

      return response(true, databases)
    } catch (error) {
      return response(
        false,
        (error as Error).message || 'Error fetching MySQL databases.'
      )
    } finally {
      connection.release()
    }
  }

  static async changeDatabase(
    winId: string,
    database: string,
    conn: Connection
  ) {
    const pool = this.getPool(winId, conn)
    const connection = await pool.getConnection()

    try {
      await connection.changeUser({ database })

      return response(true, 'Database changed successfully.')
    } catch (error) {
      return response(
        false,
        (error as Error).message || 'Error fetching MySQL databases.'
      )
    } finally {
      connection.release()
    }
  }

  static async command(winId: string, sql: string, conn: Connection) {
    const pool = this.getPool(winId, conn)

    const connection = await pool!.getConnection()

    try {
      const [QueryResults, FieldPackets] = await connection.query(sql)

      const results = Array.isArray((QueryResults as any)[0])
        ? QueryResults
        : [QueryResults]

      const fields = serializedFields(FieldPackets)

      return response(true, { results, fields })
    } catch (error) {
      return response(
        false,
        (error as Error).message || 'Error executing MySQL command.'
      )
    } finally {
      connection.release()
    }
  }

  static async getEntities(winId: string, database: string, conn: Connection) {
    const pool = this.getPool(winId, conn)

    const connection = await pool.getConnection()

    try {
      const [rows] = await connection.query(
        `SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_KEY
         FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = ?
         ORDER BY TABLE_NAME, ORDINAL_POSITION;`,
        [database]
      )

      const tables: Entity[] = []

      let currentTable: Entity | null = null

      for (const row of rows as any[]) {
        if (!currentTable || currentTable.name !== row.TABLE_NAME) {
          if (currentTable) {
            tables.push(currentTable)
          }
          currentTable = {
            name: row.TABLE_NAME,
            columns: []
          }
        }

        currentTable.columns.push({
          name: row.COLUMN_NAME,
          type: row.DATA_TYPE,
          nullable: row.IS_NULLABLE as 'YES' | 'NO',
          key:
            row.COLUMN_KEY === ''
              ? null
              : (row.COLUMN_KEY as 'PRI' | 'MUL' | 'UNI')
        })
      }

      if (currentTable) {
        tables.push(currentTable)
      }

      return response(true, tables)
    } catch (error) {
      return response(
        false,
        (error as Error).message || 'Error fetching MySQL tables.'
      )
    } finally {
      connection.release()
    }
  }

  static async disconnect(winId: string, conn: Connection) {
    try {
      const pool = this.getPool(winId, conn)
      if (pool) {
        await pool.end()
        this.removePool(winId)
        return response(true, 'MySQL connection pool closed.')
      }
      return response(false, 'No MySQL connection pool found to close.')
    } catch (error) {
      return response(
        false,
        (error as Error).message || 'Error disconnecting MySQL connection.'
      )
    }
  }
}
