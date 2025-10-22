// -- Migration: Add Pinned Queries
// -- Version: 3
// -- Description: Add isPinned column to queries table

export default `ALTER TABLE "queries" ADD COLUMN "isPinned" INTEGER DEFAULT 0;`
