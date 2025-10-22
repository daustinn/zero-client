// -- Migration: Initial schema
// -- Version: 1
// -- Description: Create environments and connections tables

export default `CREATE TABLE IF NOT EXISTS "environments" (
  "id" VARCHAR(255) NOT NULL,
  "name" VARCHAR(255) NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "connections" (
  "id" VARCHAR(255) NOT NULL,
  "createdAt" DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  "name" TEXT NULL,
  "color" TEXT NULL,
  "url" TEXT NULL,
  "host" TEXT NULL,
  "port" TEXT NULL,
  "user" TEXT NULL,
  "password" TEXT NULL,
  "database" TEXT NULL,
  "updatedAt" DATETIME NULL,
  "type" TEXT NOT NULL,
  "environmentId" VARCHAR(255) NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY (environmentId) REFERENCES "environments" (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "idx_connections_environmentId" ON "connections" ("environmentId");

INSERT INTO environments VALUES('VjY77SCbWWs32cQpBFLDY','Local','2025-10-18 06:07:39',NULL);
INSERT INTO environments VALUES('jfLTMDCr15HkfCdwxTzIx','Production','2025-10-18 06:12:43',NULL);`
