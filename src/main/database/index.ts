import DatabaseSlite from 'better-sqlite3'
import { existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { getAppDataDir } from '../utils'
import { MigrationRunner } from './migration-runner'
import { is } from '@electron-toolkit/utils'

export type SqliteConnection = DatabaseSlite.Database

let dbInstance: SqliteConnection | null = null

export default class Database {
  static resolveDatabasePath(): string {
    const databaseDirectory = getAppDataDir()
    const databaseFile = join(databaseDirectory, 'app.sqlite')
    const parent = dirname(databaseFile)
    if (!existsSync(parent)) {
      mkdirSync(parent, { recursive: true })
    }
    return databaseFile
  }

  static db(): SqliteConnection {
    if (!dbInstance) this.initialize()
    return dbInstance!
  }

  static initialize(): SqliteConnection | null {
    if (dbInstance) return null

    const dbPath = this.resolveDatabasePath()
    console.log('📂 Database path:', dbPath)

    const db = new DatabaseSlite(dbPath, {
      fileMustExist: false,
      verbose: is.dev ? console.log : undefined
    })

    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')

    try {
      const migrationRunner = new MigrationRunner(db)
      migrationRunner.run()
    } catch (error) {
      console.error('❌ Failed to run migrations:', error)
      db.close()
      throw error
    }

    dbInstance = db
    return db
  }

  static disconnect(): void {
    if (dbInstance) {
      dbInstance.close()
      dbInstance = null
    }
  }
}
