import ReactDOM from 'react-dom/client'
import * as monaco from 'monaco-editor'
import SelectionPopover from '../components/selection-popover'

export function createSelectionPopoverWidget({
  editor,
  onCopy,
  onRun
}: {
  editor: monaco.editor.IStandaloneCodeEditor
  onCopy: (text: string) => void
  onRun: (text: string) => Promise<void>
}) {
  const container = document.createElement('div')
  container.style.zIndex = '20'
  const root = ReactDOM.createRoot(container)

  let popoverVisible = false
  let isSelectingWithMouse = false

  const widget: monaco.editor.IContentWidget = {
    getId: () => 'custom.selection.popover',
    getDomNode: () => container,
    getPosition: () => {
      const selection = editor.getSelection()
      if (selection && !selection.isEmpty() && popoverVisible) {
        return {
          position: {
            lineNumber: selection.endLineNumber,
            column: selection.endColumn
          },
          preference: [monaco.editor.ContentWidgetPositionPreference.BELOW]
        }
      }
      return null
    }
  }
  editor.addContentWidget(widget)

  const mouseDownListener = editor.onMouseDown(() => {
    isSelectingWithMouse = true
  })

  const mouseUpListener = editor.onMouseUp(() => {
    isSelectingWithMouse = false
    const selection = editor.getSelection()
    popoverVisible = !!selection && !selection.isEmpty()
    if (popoverVisible) {
      updatePopover()
      editor.layoutContentWidget(widget)
    } else {
      root.render(<></>)
      editor.layoutContentWidget(widget)
    }
  })

  const selectionListener = editor.onDidChangeCursorSelection(() => {
    const selection = editor.getSelection()
    if (!isSelectingWithMouse) {
      if (!popoverVisible && selection && !selection.isEmpty()) {
        popoverVisible = true
        updatePopover()
        editor.layoutContentWidget(widget)
      } else if (popoverVisible && selection && !selection.isEmpty()) {
        updatePopover()
        editor.layoutContentWidget(widget)
      } else if (popoverVisible && (!selection || selection.isEmpty())) {
        popoverVisible = false
        root.render(<></>)
        editor.layoutContentWidget(widget)
      }
    }
  })

  function handleClosePopover() {
    popoverVisible = false
    root.render(<></>)
    editor.layoutContentWidget(widget)
  }

  function updatePopover() {
    const selection = editor.getSelection()
    if (selection && !selection.isEmpty()) {
      const model = editor.getModel()
      const text = model?.getValueInRange(selection) ?? ''
      root.render(
        <SelectionPopover
          text={text}
          editor={editor}
          onCopy={onCopy}
          onRun={onRun}
          onClose={handleClosePopover}
        />
      )
    } else {
      root.render(<></>)
    }
  }

  return () => {
    editor.removeContentWidget(widget)
    mouseDownListener.dispose()
    mouseUpListener.dispose()
    selectionListener.dispose()
    root.unmount()
  }
}
