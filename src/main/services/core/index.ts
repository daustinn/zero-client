import { Connection, TestConnectionRequest } from '../../../types'
import { response } from '../../../utils'
import MySQL from './mysql'

export default class CoreService {
  static async testConnection(req: TestConnectionRequest) {
    switch (req.type) {
      case 'mysql':
        return await MySQL.testConnection(req)
      default:
        return response(false, 'Unsupported database type.')
    }
  }

  static async getDatabases(winId: string, conn: Connection) {
    switch (conn.type) {
      case 'mysql':
        return MySQL.getDatabases(winId, conn)
      default:
        return response(false, 'Unsupported database type.')
    }
  }

  static async runCommand(winId: string, sql: string, conn: Connection) {
    switch (conn.type) {
      case 'mysql':
        return MySQL.command(winId, sql, conn)
      default:
        return response(false, 'Unsupported database type.')
    }
  }

  static async changeDatabase(
    winId: string,
    database: string,
    conn: Connection
  ) {
    switch (conn.type) {
      case 'mysql':
        return MySQL.changeDatabase(winId, database, conn)
      default:
        return response(false, 'Unsupported database type.')
    }
  }

  static async getEntities(winId: string, database: string, conn: Connection) {
    switch (conn.type) {
      case 'mysql':
        return MySQL.getEntities(winId, database, conn)
      default:
        return response(false, 'Unsupported database type.')
    }
  }

  static async disconnect(winId: string, conn: Connection) {
    switch (conn.type) {
      case 'mysql':
        return MySQL.disconnect(winId, conn)
      default:
        return response(false, 'Unsupported database type.')
    }
  }
}
