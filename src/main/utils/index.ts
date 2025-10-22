/* eslint-disable @typescript-eslint/no-explicit-any */
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'
import { nanoid } from 'nanoid'
import { app, ipcMain, IpcMainInvokeEvent } from 'electron'
import { existsSync, mkdirSync } from 'fs'
import { EventPayloadMapping, Api } from '../../preload/index.d'

export const defaultWinOptions: Electron.BrowserWindowConstructorOptions = {
  show: false,
  autoHideMenuBar: true,
  backgroundColor: '#101010',
  title: 'Danda - simple SQL client',
  titleBarStyle: 'hidden',
  icon,
  center: true,
  webPreferences: {
    preload: join(__dirname, '../preload/index.js'),
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: false
  },
  titleBarOverlay: {
    color: '#141414',
    symbolColor: '#8b8b8b',
    height: 29
  }
}

export function loadPage(win: Electron.BrowserWindow, path: string) {
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'] + `#${path}`)
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'), { hash: path })
  }
}

export function id() {
  return nanoid()
}

export function getAppDataDir(): string {
  const userData = app.getPath('userData')
  const dbDir = join(userData, 'data')
  if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true })
  }
  return dbDir
}

export function ipcMainHandler<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: (
    event: IpcMainInvokeEvent,
    ...args: EventPayloadMapping[Key]
    // @ts-ignore
  ) => ReturnType<Api[Key]>
) {
  ipcMain.handle(String(key), (event, ...args: any[]) => {
    return handler(event, ...(args as EventPayloadMapping[Key]))
  })
}

export function ipcMainOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: (
    event: IpcMainInvokeEvent,
    ...args: EventPayloadMapping[Key]
  ) => void
) {
  ipcMain.on(key, (event, ...args: any[]) => {
    return handler(event, ...(args as EventPayloadMapping[Key]))
  })
}

const isOnly = (input: any[]): boolean => {
  for (let i = 0; i < input.length; i++) {
    const el = input[i]
    if (typeof el !== 'object' || Array.isArray(el)) {
      return false
    }
  }
  return true
}

export function normalizeToArrayOfArrays(fields: any[] = []): any[][] {
  if (!fields) return [[]]

  if (isOnly(fields)) {
    return [[...fields]]
  } else {
    const arr: any[][] = []
    for (let i = 0; i < fields.length; i++) {
      const element = fields[i]
      if (element === undefined || element === null) {
        arr.push([])
      } else {
        arr.push(element)
      }
    }
    return arr
  }
}

export function serializedFields(fields: any[] = []) {
  const fieldsArray = normalizeToArrayOfArrays(fields)

  const serializedFields: any[] = []
  for (let i = 0; i < fieldsArray.length; i++) {
    const fieldSet = fieldsArray[i]
    serializedFields.push(
      fieldSet.map((field: any) => {
        if (!field) return 'unknown'
        const plainField = JSON.parse(JSON.stringify(field))
        return plainField?.name || plainField?.orgName || 'unknown'
      })
    )
  }
  return serializedFields
}
