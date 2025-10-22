import * as monaco from 'monaco-editor'

export type Block = {
  startLine: number
  endLine: number
}

function findPrevNonEmptyLine(
  model: monaco.editor.ITextModel,
  from: number,
  limit: number
): number {
  let line = from
  while (line >= limit) {
    if (model.getLineContent(line).trim() !== '') return line
    line--
  }
  return -1
}

export default (
  model: monaco.editor.ITextModel,
  keys: string[] = ['# QUERY', '-- QUERY']
): Block[] => {
  const blocks: Block[] = []
  const lineCount = model.getLineCount()

  let start = -1
  let firstBlockFound = false

  for (let line = 1; line <= lineCount; line++) {
    const text = model.getLineContent(line).trim()

    const isComment = keys.some((key) =>
      text.toLowerCase().startsWith(key.toLowerCase())
    )

    if (isComment) {
      if (!firstBlockFound) {
        if (line > 1) {
          const end = findPrevNonEmptyLine(model, line - 1, 1)
          if (1 <= end) {
            blocks.push({ startLine: 1, endLine: end })
          }
        }
        firstBlockFound = true
      }

      if (start !== -1) {
        const end = findPrevNonEmptyLine(model, line - 1, start)
        if (start <= end) {
          blocks.push({ startLine: start, endLine: end })
        }
      }
      start = line
    }
  }

  if (!firstBlockFound) {
    const end = findPrevNonEmptyLine(model, lineCount, 1)
    if (1 <= end) {
      blocks.push({ startLine: 1, endLine: end })
    }
  } else if (start !== -1) {
    const end = findPrevNonEmptyLine(model, lineCount, start)
    if (start <= end) {
      blocks.push({ startLine: start, endLine: end })
    }
  }

  return blocks
}
