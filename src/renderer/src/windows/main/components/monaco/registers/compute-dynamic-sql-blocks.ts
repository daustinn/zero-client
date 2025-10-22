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

export default (model: monaco.editor.ITextModel): Block[] => {
  const blocks: Block[] = []
  const lineCount = model.getLineCount()

  let start = 1

  for (let line = 1; line <= lineCount; line++) {
    const text = model.getLineContent(line).trim()
    if (text.endsWith(';')) {
      const end = findPrevNonEmptyLine(model, line, start)
      if (start <= end) {
        blocks.push({ startLine: start, endLine: end })
      }
      start = line + 1
    }
  }

  if (start <= lineCount) {
    const end = findPrevNonEmptyLine(model, lineCount, start)
    if (start <= end) {
      blocks.push({ startLine: start, endLine: end })
    }
  }

  return blocks
}
