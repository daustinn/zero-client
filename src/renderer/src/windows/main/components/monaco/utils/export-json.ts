/* eslint-disable @typescript-eslint/no-explicit-any */
export default (result: any[]) => {
  const json = JSON.stringify(result, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const href = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = href
  link.download = 'untitled.json'
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  URL.revokeObjectURL(href)
}

export const copyToClipboardJson = (result: any[]) => {
  const json = JSON.stringify(result, null, 2)
  navigator.clipboard.writeText(json)
}
