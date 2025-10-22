import { LanguageIdEnum } from 'monaco-sql-languages'
import * as monaco from 'monaco-editor'
import snippets from '../const/snippets'
import keywords from '../const/keywords'
import functions from '../const/functions'
import { Entity } from '@renderer/types'

export default (
  monaco: typeof import('monaco-editor') | null,
  entities: Entity[] | null
) => {
  if (!monaco)
    return {
      dispose: () => {}
    }
  const disposable = monaco.languages.registerCompletionItemProvider(
    LanguageIdEnum.MYSQL,
    {
      provideCompletionItems: (
        model,
        position
      ): monaco.languages.ProviderResult<monaco.languages.CompletionList> => {
        const word = model.getWordUntilPosition(position)
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        }

        // Get context to determine priority
        const context = model
          .getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column
          })
          .toLowerCase()
          .trim()

        const isAfterFromOrJoin = context.match(
          /\b(?:from|join)\s+[a-zA-Z_][\w]*(?:\s+as\s+[a-zA-Z_][\w]*)?\s*$/i
        )
        const isInSelectClause =
          context.includes('select') && !context.includes('from')
        const isInWhereClause = context.match(
          /\b(where|order\s+by|group\s+by|having)\b/
        )

        const suggestions: monaco.languages.CompletionItem[] = [
          ...snippets.map((keyword, i) => ({
            label: keyword.label,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: keyword.body.join('\n'),
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: keyword.label,
            detail: 'Snippet',
            sortText:
              isAfterFromOrJoin || isInSelectClause || isInWhereClause
                ? '9' + i.toString().padStart(4, '0') // Lower priority in SQL contexts
                : '0' + i.toString().padStart(4, '0'), // Higher priority in general
            range
          })),
          ...keywords.map((keyword, i) => ({
            label: keyword.label,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: keyword.insertText,
            documentation: keyword.documentation,
            detail: 'Keyword',
            sortText:
              isAfterFromOrJoin || isInSelectClause || isInWhereClause
                ? '8' + i.toString().padStart(4, '0') // Lower priority in SQL contexts
                : '2' + i.toString().padStart(4, '0'), // Higher priority in general
            range
          })),
          ...functions.map((func, i) => ({
            label: func.label,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: func.insertText,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: func.documentation,
            sortText:
              isAfterFromOrJoin || isInSelectClause || isInWhereClause
                ? '7' + i.toString().padStart(4, '0') // Lower priority in SQL contexts
                : '3' + i.toString().padStart(4, '0'), // Higher priority in general
            detail: 'Function',
            range
          }))
        ]

        return {
          suggestions
        }
      }
    }
  )

  const customDisposable = monaco.languages.registerCompletionItemProvider(
    LanguageIdEnum.MYSQL,
    {
      triggerCharacters: ['.'],
      provideCompletionItems: (model, position) => {
        if (!entities) return { suggestions: [] }

        const textUntilPosition = model.getValue()

        const aliasRegex =
          /\b(?:from|join)\s+([a-zA-Z_][\w]*)\s+(?:as\s+)?([a-zA-Z_][\w]*)/gi
        const aliasMap: Record<string, string> = {}
        const tableMap: Record<string, Entity> = {}

        let match
        while ((match = aliasRegex.exec(textUntilPosition))) {
          const [, table, alias] = match
          const entity = entities.find((e) => e.name === table)
          if (entity) {
            tableMap[table] = entity
            if (table !== alias) {
              aliasMap[alias] = table
            }
          }
        }

        const textUntilCursor = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        })

        const word = model.getWordUntilPosition(position)
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        }

        let suggestions: monaco.languages.CompletionItem[] = []

        const aliasDotMatch = textUntilCursor.match(
          /([a-zA-Z_][a-zA-Z0-9_]*)\s*\.\s*$/
        )
        if (aliasDotMatch) {
          const alias = aliasDotMatch[1].trim()
          const tableName = aliasMap[alias]

          if (tableName && tableMap[tableName]) {
            suggestions = tableMap[tableName].columns.map((column, i) => ({
              label: column.name,
              kind: monaco.languages.CompletionItemKind.Field,
              detail: `${column.type} of ${tableName} (via ${alias})`,
              insertText: column.name,
              range,
              documentation: `Type: ${column.type}\nNullable: ${
                column.nullable
              }\nKey: ${
                column.key || 'None'
              }\nTable: ${tableName} (alias: ${alias})`,
              sortText: '0' + i.toString().padStart(4, '0') // Highest priority for alias columns
            }))
          }
        } else if (textUntilCursor.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\.\s*$/)) {
          const tableName = textUntilCursor
            .match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\.\s*$/)?.[1]
            ?.trim()

          if (tableName && tableMap[tableName]) {
            suggestions = tableMap[tableName].columns.map((column, i) => ({
              label: column.name,
              kind: monaco.languages.CompletionItemKind.Field,
              detail: `${column.type} of ${tableName}`,
              insertText: column.name,
              range,
              documentation: `Type: ${column.type}\nNullable: ${
                column.nullable
              }\nKey: ${column.key || 'None'}\nTable: ${tableName}`,
              sortText: '0' + i.toString().padStart(4, '0') // Highest priority for table columns
            }))
          }
        } else {
          const context = textUntilCursor.toLowerCase().trim()

          // Check if we're after FROM or JOIN and need table suggestions
          const afterFromOrJoin = context.match(
            /\b(?:from|join)\s+[a-zA-Z_][\w]*(?:\s+as\s+[a-zA-Z_][\w]*)?\s*$/i
          )
          const afterFromOrJoinWithSpace = context.match(
            /\b(?:from|join)\s+[a-zA-Z_][\w]*(?:\s+as\s+[a-zA-Z_][\w]*)?\s+$/i
          )

          if (afterFromOrJoin || afterFromOrJoinWithSpace) {
            // Show table suggestions after FROM or JOIN with highest priority
            entities.forEach((entity, i) => {
              suggestions.push({
                label: entity.name,
                kind: monaco.languages.CompletionItemKind.Class,
                detail: 'Table',
                insertText: entity.name,
                range,
                documentation: `Table: ${entity.name}`,
                sortText: '0' + i.toString().padStart(4, '0') // Highest priority
              })
            })
          } else if (context.includes('select') && !context.includes('from')) {
            // Show column suggestions in SELECT clause before FROM with high priority
            entities.forEach((entity) => {
              entity.columns.forEach((column, i) => {
                suggestions.push({
                  label: column.name,
                  kind: monaco.languages.CompletionItemKind.Field,
                  detail: `${column.type} - from ${entity.name}`,
                  insertText: column.name,
                  range,
                  documentation: `Type: ${column.type}\nNullable: ${
                    column.nullable
                  }\nKey: ${column.key || 'None'}\nTable: ${entity.name}`,
                  sortText: '1' + i.toString().padStart(4, '0') // High priority
                })
              })
            })
          } else if (
            context.match(/\b(where|order\s+by|group\s+by|having)\b/)
          ) {
            // Show column suggestions in WHERE, ORDER BY, GROUP BY, HAVING clauses with high priority
            entities.forEach((entity) => {
              entity.columns.forEach((column, i) => {
                suggestions.push({
                  label: column.name,
                  kind: monaco.languages.CompletionItemKind.Field,
                  detail: `${column.type} - from ${entity.name}`,
                  insertText: column.name,
                  range,
                  documentation: `Type: ${column.type}\nNullable: ${
                    column.nullable
                  }\nKey: ${column.key || 'None'}\nTable: ${entity.name}`,
                  sortText: '1' + i.toString().padStart(4, '0') // High priority
                })
              })
            })
          } else {
            // Default: show both tables and columns with medium priority
            entities.forEach((entity, i) => {
              suggestions.push({
                label: entity.name,
                kind: monaco.languages.CompletionItemKind.Class,
                detail: 'Table',
                insertText: entity.name,
                range,
                documentation: `Table: ${entity.name}`,
                sortText: '4' + i.toString().padStart(4, '0') // Medium priority
              })
              entity.columns.forEach((column, j) => {
                suggestions.push({
                  label: `${entity.name}.${column.name}`,
                  kind: monaco.languages.CompletionItemKind.Field,
                  detail: `${column.type} - ${entity.name}`,
                  insertText: `${entity.name}.${column.name}`,
                  range,
                  documentation: `Type: ${column.type}\nNullable: ${
                    column.nullable
                  }\nKey: ${column.key || 'None'}`,
                  sortText: '5' + j.toString().padStart(4, '0') // Medium priority
                })
              })
            })
          }
        }

        return { suggestions }
      }
    }
  )

  return {
    dispose: () => {
      disposable.dispose()
      customDisposable.dispose()
    }
  }
}
