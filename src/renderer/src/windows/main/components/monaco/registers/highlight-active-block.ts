import * as monaco from 'monaco-editor'
import computeDynamicSqlBlocks, { Block } from './compute-dynamic-sql-blocks'

export default (
  editor: monaco.editor.IStandaloneCodeEditor,
  monaco: typeof import('monaco-editor') | null
): (() => void) => {
  if (!monaco) return () => {}
  const model = editor.getModel()
  if (!model) return () => {}

  let decorationsCollection: monaco.editor.IEditorDecorationsCollection | null =
    null

  const applyDecoration = (pos: monaco.Position, blocks: Block[]) => {
    const totalLines = model.getLineCount()

    const activeBlock = blocks.find(
      (b) => pos.lineNumber >= b.startLine && pos.lineNumber <= b.endLine
    )

    if (!activeBlock) {
      decorationsCollection?.clear()
      return
    }

    const decorations: monaco.editor.IModelDeltaDecoration[] = []

    for (
      let line = activeBlock.startLine;
      line <= activeBlock.endLine;
      line++
    ) {
      if (line < 1 || line > totalLines) continue
      const lastColumn = model.getLineLastNonWhitespaceColumn(line)
      if (lastColumn < 1) continue

      decorations.push({
        range: new monaco.Range(line, 1, line, lastColumn),
        options: { className: 'sql-block-highlight-inline' }
      })
    }

    if (!decorationsCollection) {
      decorationsCollection = editor.createDecorationsCollection(decorations)
    } else {
      decorationsCollection.set(decorations)
    }
  }

  let currentBlocks = computeDynamicSqlBlocks(model)

  const cursorListener = editor.onDidChangeCursorPosition((e) => {
    applyDecoration(e.position, currentBlocks)
  })

  const contentListener = model.onDidChangeContent(() => {
    currentBlocks = computeDynamicSqlBlocks(model)
    const pos = editor.getPosition()
    if (pos) applyDecoration(pos, currentBlocks)
  })

  const initialPos = editor.getPosition()
  if (initialPos) applyDecoration(initialPos, currentBlocks)

  return () => {
    cursorListener.dispose()
    contentListener.dispose()
    decorationsCollection?.clear()
    decorationsCollection = null
  }
}
