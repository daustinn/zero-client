interface ResultData {
  fieldCount?: number
  affectedRows?: number
  insertId?: number
  info?: string
  serverStatus?: number
  warningStatus?: number
  changedRows?: number
  stateChanges?: {
    systemVariables?: Record<string, unknown>
    schema?: string
    gtids?: unknown[]
    trackStateChange?: unknown
  }
}

export default function ResultInfo({
  data,
  index
}: {
  data: ResultData
  index: number
}) {
  const getMessage = (): string => {
    const messages: string[] = []

    if (data.stateChanges?.schema) {
      messages.push(`Database changed to: ${data.stateChanges.schema}`)
    }

    const info = data.info?.toLowerCase() || ''

    if (info.includes('created')) {
      messages.push('Object created successfully')
    }

    if (data.serverStatus && data.serverStatus & 128) {
      messages.push('Database dropped')
    } else if (info.includes('dropped')) {
      messages.push('Object dropped successfully')
    }

    if (info.includes('altered') || info.includes('records:')) {
      const recordsMatch = info.match(/records:\s*(\d+)/)
      const duplicatesMatch = info.match(/duplicates:\s*(\d+)/)
      const warningsMatch = info.match(/warnings:\s*(\d+)/)

      if (recordsMatch) {
        messages.push(`Table altered: ${recordsMatch[1]} record(s) processed`)
        if (duplicatesMatch && parseInt(duplicatesMatch[1]) > 0) {
          messages.push(`${duplicatesMatch[1]} duplicate(s)`)
        }
        if (warningsMatch && parseInt(warningsMatch[1]) > 0) {
          messages.push(`${warningsMatch[1]} warning(s)`)
        }
      } else {
        messages.push('Table structure altered')
      }
    }

    if (info.includes('truncate') || (data.affectedRows === 0 && info === '')) {
      const isTruncate = info.includes('truncate')
      if (isTruncate) {
        messages.push('Table truncated')
      }
    }

    if (data.insertId && data.insertId > 0) {
      messages.push(
        `${data.affectedRows} row(s) inserted with last ID: ${data.insertId}`
      )
    } else if (
      data.affectedRows &&
      data.affectedRows > 0 &&
      data.changedRows === 0 &&
      !info.includes('duplicate') &&
      !data.stateChanges?.schema
    ) {
      if (info.includes('delete')) {
        messages.push(`${data.affectedRows} row(s) deleted`)
      } else {
        messages.push(`${data.affectedRows} row(s) inserted`)
      }
    }

    if (data.changedRows !== undefined && data.changedRows > 0) {
      messages.push(
        `${data.changedRows} row(s) updated out of ${data.affectedRows} matched`
      )
    } else if (
      data.affectedRows &&
      data.affectedRows > 0 &&
      data.changedRows === 0 &&
      info.includes('matched')
    ) {
      messages.push(`${data.affectedRows} row(s) matched but not changed`)
    }

    if (
      data.affectedRows &&
      data.affectedRows > 0 &&
      !data.insertId &&
      !data.changedRows &&
      !data.stateChanges?.schema &&
      !info.includes('insert') &&
      !info.includes('alter')
    ) {
      messages.push(`${data.affectedRows} row(s) deleted`)
    }

    if (info.includes('rename')) {
      messages.push('Table renamed successfully')
    }

    if (info.includes('index')) {
      messages.push('Index created successfully')
    }

    if (info.includes('records loaded')) {
      messages.push(info)
    }

    if (info.includes('replaced')) {
      messages.push(`${data.affectedRows} row(s) replaced`)
    }

    if (
      data.warningStatus &&
      data.warningStatus > 0 &&
      !info.includes('warnings')
    ) {
      messages.push(`${data.warningStatus} warning(s)`)
    }

    if (data.info && data.info.trim() !== '' && messages.length === 0) {
      messages.push(data.info)
    }

    if (
      data.stateChanges?.systemVariables &&
      Object.keys(data.stateChanges.systemVariables).length > 0
    ) {
      const vars = Object.keys(data.stateChanges.systemVariables)
      messages.push(`System variable(s) changed: ${vars.join(', ')}`)
    }

    if (data.serverStatus) {
      if (data.serverStatus & 1) {
        messages.push('Transaction active')
      }
      if (data.serverStatus & 8) {
        messages.push('No good index used')
      }
      if (data.serverStatus & 16) {
        messages.push('No index used')
      }
      if (data.serverStatus & 1024) {
        messages.push('Slow query')
      }
    }

    if (messages.length === 0) {
      if (data.affectedRows === 0 && !data.stateChanges?.schema) {
        messages.push('Query executed successfully with no changes')
      } else {
        messages.push('Operation completed successfully')
      }
    }

    return messages.join(' / ')
  }

  return (
    <p className="text-sm dark:text-stone-200 font-mono p-2">
      Query {index + 1}: {getMessage()}
    </p>
  )
}
