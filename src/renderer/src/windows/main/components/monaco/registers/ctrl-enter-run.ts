import * as monaco from 'monaco-editor'

export default (
  editor: monaco.editor.IStandaloneCodeEditor,
  onRun: (text: string) => void
) => {
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
    const model = editor.getModel()
    const selection = editor.getSelection()
    if (!model || !selection) return null

    const selectedText = model.getValueInRange(selection)
    if (selectedText.trim().length === 0) return null

    onRun?.(selectedText)
    return () => {}
  })
}
