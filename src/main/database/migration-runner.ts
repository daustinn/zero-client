import { SqliteConnection } from './'
import { migrations } from './migrations'

export class MigrationRunner {
  private db: SqliteConnection

  constructor(db: SqliteConnection) {
    this.db = db
  }

  private initializeMigrationsTable(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS "_migrations" (
        "version" INTEGER PRIMARY KEY,
        "name" TEXT NOT NULL,
        "applied_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "checksum" TEXT NULL
      )
    `)
  }

  private getCurrentVersion(): number {
    const result = this.db
      .prepare('SELECT MAX(version) as version FROM "_migrations"')
      .get() as { version: number | null }
    return result.version || 0
  }

  private getAppliedMigrations(): Set<number> {
    const rows = this.db
      .prepare('SELECT version FROM "_migrations" ORDER BY version')
      .all() as Array<{ version: number }>
    return new Set(rows.map((r) => r.version))
  }

  private calculateChecksum(sql: string): string {
    let hash = 0
    for (let i = 0; i < sql.length; i++) {
      const char = sql.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return hash.toString(36)
  }

  public run(): void {
    this.initializeMigrationsTable()
    const currentVersion = this.getCurrentVersion()
    const appliedMigrations = this.getAppliedMigrations()

    const pendingMigrations = migrations.filter(
      (m) => !appliedMigrations.has(m.version)
    )

    if (pendingMigrations.length === 0) {
      console.log('✅ Database is up to date (version:', currentVersion, ')')
      return
    }

    for (const migration of pendingMigrations) {
      this.applyMigration(migration)
    }
  }

  private applyMigration(migration: {
    version: number
    name: string
    sql: string
  }): void {
    console.log(
      `  → Applying migration ${migration.version}: ${migration.name}`
    )

    const checksum = this.calculateChecksum(migration.sql)

    try {
      this.db.exec('BEGIN TRANSACTION')

      this.db.exec(migration.sql)

      this.db
        .prepare(
          'INSERT INTO "_migrations" (version, name, checksum) VALUES (?, ?, ?)'
        )
        .run(migration.version, migration.name, checksum)

      this.db.exec('COMMIT')

      console.log(`  ✓ Migration ${migration.version} applied successfully`)
    } catch (error) {
      this.db.exec('ROLLBACK')
      console.error(`  ✗ Migration ${migration.version} failed:`, error)
      throw new Error(
        `Migration ${migration.version} (${migration.name}) failed: ${error}`
      )
    }
  }
}
