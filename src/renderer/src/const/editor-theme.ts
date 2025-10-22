import { postfixTokenClass, TokenClassConsts } from 'monaco-sql-languages'
import { editor } from 'monaco-sql-languages/esm/fillers/monaco-editor-core'

export const EditorTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: false,
  rules: [
    {
      token: postfixTokenClass(TokenClassConsts.STRING),
      foreground: 'e394dc'
    },
    {
      token: postfixTokenClass(TokenClassConsts.NUMBER),
      foreground: 'ebc88d'
    },
    {
      token: postfixTokenClass(TokenClassConsts.PREDEFINED),
      foreground: 'efb080'
    },
    {
      token: postfixTokenClass(TokenClassConsts.KEYWORD),
      foreground: '82d2ce'
    },
    {
      token: postfixTokenClass(TokenClassConsts.OPERATOR),
      foreground: '82d2ce'
    },
    {
      token: postfixTokenClass(TokenClassConsts.DELIMITER),
      foreground: 'd4d4d4'
    },
    {
      token: postfixTokenClass(TokenClassConsts.COMMENT_QUOTE),
      foreground: '636363',
      fontStyle: 'bold italic',
      background: 'e51400'
    },
    {
      token: postfixTokenClass(TokenClassConsts.COMMENT),
      foreground: '636363',
      fontStyle: 'bold italic',
      background: 'e51400'
    }
  ],
  colors: {
    'editor.foreground': '#cacaca',
    'editor.background': '#1a1a1a',
    'editor.selectionBackground': '#253a46',
    'editor.lineHighlightBackground': '#1c1c1c',
    'editorCursor.foreground': '#FFFFFF',
    'editorWhitespace.foreground': '#505050B3',
    'editorIndentGuide.background': '#404040B3',
    'editorIndentGuide.activeBackground': '#505050',
    'editorLineNumber.activeForeground': '#cacaca',
    'editorLineNumber.foreground': '#505050',
    'editorBracketMatch.background': '#14141400',
    'editorBracketMatch.border': '#FFFFFF55',
    'editorError.foreground': '#BF616A',
    'editorWarning.foreground': '#EBCB8B',
    'editorInfo.foreground': '#88C0D0'
  }
}
