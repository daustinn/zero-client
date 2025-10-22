import { Root } from 'react-dom/client'
import computeSqlBlocks, { Block } from './compute-sql-blocks'
import * as monaco from 'monaco-editor'
import {
  createBlockZone,
  disposeZone,
  RunBlockBarCallbacks
} from '../components/block-zone'

export type ZoneRecord = {
  zoneId: string
  root: Root
  container: HTMLDivElement
  block: Block
}

function blocksEqual(a: Block, b: Block): boolean {
  return a.startLine === b.startLine && a.endLine === b.endLine
}

export default ({
  callbacks,
  editor
}: {
  editor: monaco.editor.IStandaloneCodeEditor
  callbacks: RunBlockBarCallbacks
}) => {
  const model = editor.getModel()
  if (!model) return () => {}

  let zones: ZoneRecord[] = []

  const renderAll = () => {
    const newBlocks = computeSqlBlocks(model)

    const oldZones = zones

    const existingZonesMap = new Map<string, ZoneRecord>()
    oldZones.forEach((z) => {
      const key = `${z.block.startLine}-${z.block.endLine}`
      existingZonesMap.set(key, z)
    })

    const newZones: ZoneRecord[] = []
    const zonesToDispose: ZoneRecord[] = []

    newBlocks.forEach((block) => {
      const key = `${block.startLine}-${block.endLine}`
      const existing = existingZonesMap.get(key)

      if (existing && blocksEqual(existing.block, block)) {
        newZones.push(existing)
        existingZonesMap.delete(key)
      } else {
        const zr = createBlockZone({
          editor,
          block,
          callbacks
        })
        if (zr) newZones.push(zr)
      }
    })

    existingZonesMap.forEach((z) => zonesToDispose.push(z))
    zonesToDispose.forEach((z) => disposeZone(editor, z))

    zones = newZones
  }

  renderAll()

  const contentListener = model.onDidChangeContent(() => {
    renderAll()
  })

  return () => {
    contentListener.dispose()
    zones.forEach((z) => disposeZone(editor, z))
    zones = []
  }
}
