/* eslint-disable @typescript-eslint/no-explicit-any */
const convertToTXT = (data: any[]) => {
  if (data.length === 0) return ''

  const headers = Object.keys(data[0])
  const headerRow = headers.join('|')

  const rows = data.map((obj) => {
    return headers
      .map((header) => {
        return obj[header]?.toString() || ''
      })
      .join('|')
  })

  return [headerRow, ...rows].join('\n')
}

export default (data: any[]) => {
  const txtString = convertToTXT(data)
  const blob = new Blob([txtString], { type: 'text/plain;charset=utf-8;' })
  const href = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = href
  link.download = 'untitled.txt'
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  URL.revokeObjectURL(href)
}

export const copyToClipboardTxt = (data: any[]) => {
  const txtString = convertToTXT(data)
  navigator.clipboard.writeText(txtString)
}
