import { createRoot, Root } from 'react-dom/client'
import * as monaco from 'monaco-editor'
import { Block } from '../registers/compute-sql-blocks'
import { ZoneRecord } from '../registers/mount-dynamic-block-zones'
import { RunBlockBar } from './block-bar'

export type RunBlockBarProps = {
  onRun: () => Promise<void>
  onSelect?: () => void
  onCopy?: () => void
}

export type RunBlockBarCallbacks = {
  onRun?: (text: string) => Promise<void>
  onSelect?: () => void
  onCopy?: (text: string) => void
}

export function createBlockZone({
  block,
  editor,
  callbacks
}: {
  editor: monaco.editor.IStandaloneCodeEditor
  block: Block
  callbacks?: RunBlockBarCallbacks
}): ZoneRecord | null {
  const model = editor.getModel()

  if (!model) return null

  const container = document.createElement('div')
  container.style.zIndex = '10'
  container.style.pointerEvents = 'auto'

  const root: Root = createRoot(container)

  root.render(
    <RunBlockBar
      onRun={async () => {
        const text = model.getValueInRange({
          startLineNumber: block.startLine,
          startColumn: 1,
          endLineNumber: block.endLine,
          endColumn: model.getLineMaxColumn(block.endLine)
        })
        await callbacks?.onRun?.(text)
      }}
      onSelect={() => {
        editor.setSelection({
          startLineNumber: block.startLine,
          startColumn: 1,
          endLineNumber: block.endLine,
          endColumn: model.getLineMaxColumn(block.endLine)
        })
        editor.revealLineInCenter(block.startLine)
      }}
      onCopy={() => {
        const text = model.getValueInRange({
          startLineNumber: block.startLine,
          startColumn: 1,
          endLineNumber: block.endLine,
          endColumn: model.getLineMaxColumn(block.endLine)
        })
        callbacks?.onCopy?.(text)
      }}
    />
  )

  let zoneId: string = ''
  editor.changeViewZones((accessor) => {
    zoneId = accessor.addZone({
      afterLineNumber: Math.max(0, block.startLine - 1),
      heightInPx: 30,
      domNode: container
    })
  })

  return { zoneId, root, container, block }
}

export function disposeZone(
  editor: monaco.editor.IStandaloneCodeEditor,
  zr: ZoneRecord
) {
  setTimeout(() => {
    zr.root.unmount()
  }, 0)
  editor.changeViewZones((accessor) => accessor.removeZone(zr.zoneId))
}
