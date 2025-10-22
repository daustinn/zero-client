// -- Migration: Add queries table
// -- Version: 2
// -- Description: Create queries table with connection relationship

export default `CREATE TABLE IF NOT EXISTS "queries" (
  "id" VARCHAR(255) NOT NULL,
  "content" TEXT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "name" VARCHAR(255) NULL,
  "connectionId" VARCHAR(255) NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY (connectionId) REFERENCES "connections" (id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "idx_queries_connectionId" ON "queries" ("connectionId");`
