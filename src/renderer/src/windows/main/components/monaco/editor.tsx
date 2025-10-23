import '@renderer/config/monaco'

import * as monaco from 'monaco-editor'
import { Editor as MonacoEditor, useMonaco } from '@monaco-editor/react'
import React from 'react'
import { LanguageIdEnum } from 'monaco-sql-languages'
import { EditorTheme } from '../../../../const/editor-theme'
import mountDynamicBlockZones from './registers/mount-dynamic-block-zones'
import highlightActiveBlock from './registers/highlight-active-block'
import { cn } from '../../../../utils/cn'
import { createSelectionPopoverWidget } from './registers/create-selection-popover-widget'
import useDebounce from './use-debounce'
import completions from './registers/completions'
import { Entity } from '@renderer/types'

type OnRun = (text: string) => Promise<void>
type OnCopy = (text: string) => void

type Disposable = () => void

export default function Editor({
  defaultValue,
  onChange,
  onCopy,
  onRun,
  className,
  entities
}: {
  defaultValue: string
  onChange: (text: string) => void
  onRun: OnRun
  onCopy: OnCopy
  className?: string
  entities: Entity[] | null
}) {
  //Monaco instance
  const monaco = useMonaco()

  // States
  const [editor, setEditor] =
    React.useState<monaco.editor.IStandaloneCodeEditor | null>(null)

  // Refs
  const onRunRef = React.useRef<OnRun>(onRun)
  const onCopyRef = React.useRef<OnCopy>(onCopy)
  const onChangeRef = React.useRef(onChange)

  React.useEffect(() => {
    onRunRef.current = onRun
  }, [onRun])

  React.useEffect(() => {
    onCopyRef.current = onCopy
  }, [onCopy])

  React.useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  // Disposables refs
  const zonesDisposeRef = React.useRef<Disposable>(() => {})
  const highlightDisposeRef = React.useRef<Disposable>(() => {})
  const createSelectionPopoverWidgetDisposeRef = React.useRef<Disposable>(
    () => {}
  )
  const completionDisposableRef = React.useRef<monaco.IDisposable | null>(null)

  // Debounce onChange
  const { debouncedCallback: debouncedOnChange, cancel: cancelDebounce } =
    useDebounce((value: string) => {
      onChangeRef.current(value)
    }, 500)

  // Event listeners to OnChange and OnBlur
  React.useEffect(() => {
    if (!editor) return

    const changeDisposable = editor.onDidChangeModelContent(() => {
      const value = editor.getValue()
      debouncedOnChange(value)
    })

    return () => {
      changeDisposable.dispose()
      cancelDebounce()
    }
  }, [editor, debouncedOnChange, cancelDebounce])

  React.useEffect(() => {
    if (!editor || !monaco) return

    zonesDisposeRef.current()
    highlightDisposeRef.current()

    // Mount dynamic block zones
    zonesDisposeRef.current = mountDynamicBlockZones({
      editor,
      callbacks: { onRun: onRunRef.current, onCopy: onCopyRef.current }
    })

    // Highlight active block
    highlightDisposeRef.current = highlightActiveBlock(editor, monaco)

    // Popover widget
    createSelectionPopoverWidgetDisposeRef.current =
      createSelectionPopoverWidget({
        editor,
        onCopy: onCopyRef.current,
        onRun: onRunRef.current
      })

    return () => {
      zonesDisposeRef.current()
      highlightDisposeRef.current()
      createSelectionPopoverWidgetDisposeRef.current()
    }
  }, [editor, monaco])

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    setEditor(editor)
  }

  // Monaco
  React.useEffect(() => {
    if (!monaco) return
    monaco.editor.defineTheme('default', EditorTheme)
    monaco.editor.setTheme('default')
  }, [monaco])

  // Completions
  React.useEffect(() => {
    if (!monaco) return

    completionDisposableRef.current?.dispose()

    completionDisposableRef.current = completions(monaco, entities)

    return () => {
      completionDisposableRef.current?.dispose()
      completionDisposableRef.current = null
    }
  }, [monaco, entities])

  React.useEffect(() => {
    window.api.queriesChangeSubscribe((query) => {
      console.log(query)
      editor?.setValue(query.content || '')
      editor?.setScrollTop(0)
      editor?.setPosition({ lineNumber: 1, column: 1 })
      editor?.focus()
    })
  }, [editor])

  return (
    <>
      <div
        style={{
          contain: 'layout style paint',
          willChange: 'transform'
        }}
        className={cn('overflow-hidden flex flex-col grow', className)}
      >
        <MonacoEditor
          onMount={handleEditorDidMount}
          theme="default"
          defaultValue={defaultValue}
          language={LanguageIdEnum.MYSQL}
          className="grow group-data-show/editor:!h-[calc(100%-var(--resizable-height))]"
          loading={
            <div className="h-full grid grow place-content-center"></div>
          }
          options={{
            theme: 'default',
            fontFamily: '_Zero_cascadia',
            fontLigatures: true,
            fontSize: 14,
            suggestLineHeight: 20,
            suggestFontSize: 14,
            minimap: {
              autohide: 'mouseover'
            }
          }}
        />
      </div>
    </>
  )
}
