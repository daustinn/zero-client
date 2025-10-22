export default (sql: string) => {
  const regex = /use\s+([a-zA-Z0-9_]+)\s*;/gi
  let match
  let changed = null

  while ((match = regex.exec(sql)) !== null) {
    changed = match[1]
  }

  return changed
}
