import React from 'react'
import * as monaco from 'monaco-editor'
import Button from '@renderer/ui/commons/button'
import Spinner from '@renderer/ui/commons/spinner'

export default function SelectionPopover({
  text,
  onCopy,
  onRun,
  onClose,
  editor
}: {
  text: string
  onCopy: (text: string) => void
  onRun: (text: string) => Promise<void>
  onClose: () => void
  editor: monaco.editor.IStandaloneCodeEditor
}) {
  const [isRunning, setIsRunning] = React.useState(false)

  const handleRun = React.useCallback(async () => {
    setIsRunning(true)
    await onRun(text)
    onClose()
    setIsRunning(false)
  }, [onRun, text, onClose])

  const handleCopy = () => {
    onCopy(text)
    onClose()
  }

  React.useEffect(() => {
    if (!editor) return
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRun()
    })
  }, [editor, handleRun])

  return (
    <div className="bg-background shadow-[0_3px_10px_rgba(0,0,0,.3)] flex border dark:border-stone-300/10 rounded-lg p-0.5">
      <Button
        disabled={isRunning}
        variant="transparent"
        className="text-nowrap !px-2"
        onClick={handleRun}
      >
        {isRunning && <Spinner size={14} />}
        <p className="dark:text-stone-200">Run selected</p>
        <span className="text-xs opacity-50">Ctrl+Enter</span>
      </Button>
      <Button
        variant="transparent"
        className="text-nowrap !px-2"
        onClick={handleCopy}
      >
        <p className="dark:text-stone-200">Copy </p>
        <span className="text-xs opacity-50">Ctrl+C</span>
      </Button>
    </div>
  )
}
