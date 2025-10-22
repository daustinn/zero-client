/* eslint-disable @typescript-eslint/no-explicit-any */
export default (data: any[]) => {
  const csvString = convertToCSV(data)
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const href = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = href
  link.download = 'untitled.csv'
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  URL.revokeObjectURL(href)
}

function convertToCSV(data: any[]) {
  if (data.length === 0) return ''

  const headers = Object.keys(data[0])
  const headerRow = headers.join(',')

  const rows = data.map((obj) => {
    return headers
      .map((header) => {
        const value = obj[header]?.toString() || ''
        const scape = value.replace(/"/g, '""')
        return value.includes(',') || value.includes('"') ? `"${scape}"` : scape
      })
      .join(',')
  })

  return [headerRow, ...rows].join('\n')
}

export const copyToClipboardCsv = (data: any[]) => {
  const csvString = convertToCSV(data)
  navigator.clipboard.writeText(csvString)
}
