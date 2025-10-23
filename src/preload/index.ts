import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { Api, EventPayloadMapping, IpcReturnTypeMapping } from './index.d'
import type { Id } from '../types/index'

let id: Id

// Get window id
ipcRenderer.once('winId', (_, winId) => {
  id = winId
})

const api = {
  id: () => id,
  openExternal: (...props) => ipcInvoke('shell:openexternal', ...props),
  alert: (...props) => ipcInvoke('alert', union(...props, { parentId: id })),

  // Windows
  windowsConnection: (...props) =>
    ipcInvoke('windows:connection', id, ...props),
  windowsMain: (...props) => ipcInvoke('windows:main', ...props),
  windowsQueries: (...props) => ipcInvoke('windows:queries', id, ...props),
  windowsStart: () => ipcInvoke('windows:start'),
  windowsEnvironment: (...props) =>
    ipcInvoke('windows:environment', id, ...props),
  windowsClose: (...props) => ipcInvoke('windows:close', ...props),
  windowsFocusSubscribe: (call) =>
    // @ts-ignore
    ipcOn('focus:' + id, (...data) => call(...data)),

  // Zero: Environments
  environments: () => ipcInvoke('zero:environments'),
  environmentsCreate: (...props) =>
    ipcInvoke('zero:environments:store', ...props),
  environmentsUpdate: (...props) =>
    ipcInvoke('zero:environments:update', ...props),
  environmentsDelete: (...props) =>
    ipcInvoke('zero:environments:delete', ...props),
  environmentsSubscribe: (call) =>
    ipcOn('zero:environments:subscribe', (...data) => call(...data)),

  // Zero: Connections
  connections: () => ipcInvoke('zero:connections'),
  connectionsOne: (...props) => ipcInvoke('zero:connections:one', ...props),
  connectionsCreate: (...props) =>
    ipcInvoke('zero:connections:store', ...props),
  connectionsUpdate: (...props) =>
    ipcInvoke('zero:connections:update', ...props),
  connectionsDelete: (...props) =>
    ipcInvoke('zero:connections:delete', ...props),
  connectionsSubscribe: (call) =>
    ipcOn('zero:connections:subscribe', (...data) => call(...data)),

  // Zero: Queries
  queries: (...props) => ipcInvoke('zero:queries', ...props),
  queriesOne: (...props) => ipcInvoke('zero:queries:one', ...props),
  queriesCreate: (...props) => ipcInvoke('zero:queries:store', ...props),
  queriesUpdate: (...props) => ipcInvoke('zero:queries:update', ...props),
  queriesDelete: (...props) => ipcInvoke('zero:queries:delete', ...props),
  queriesLast: (...props) => ipcInvoke('zero:queries:last', ...props),
  queriesSubscribe: (call) =>
    ipcOn('zero:queries:subscribe', (...data) => call(...data)),
  queriesChange: (...props) => ipcInvoke('zero:queries:change', ...props),
  queriesChangeCurrent: (...props) =>
    ipcInvoke('zero:queries:change', id, ...props),
  queriesChangeSubscribe: (call) =>
    ipcOn('zero:queries:change:subscribe', (...data) => call(...data)),

  // Zero updater
  updaterAvailable: (call) =>
    // @ts-ignore
    ipcOn('zero:updater:available', (...data) => call(...data)),
  updaterDownloaded: (call) =>
    // @ts-ignore
    ipcOn('zero:updater:downloaded', (...data) => call(...data)),
  updaterDownload: (...props) => ipcInvoke('zero:updater:download', ...props),
  updaterInstallRestart: (...props) =>
    ipcInvoke('zero:updater:install:restart', ...props),

  // Core
  coreTest: (...props) => ipcInvoke('core:test', ...props),
  coreEntities: (...props) => ipcInvoke('core:entities', id, ...props),
  coreCommand: (...props) => ipcInvoke('core:command', id, ...props)
} satisfies Api

// -------------------------------------------------------------
// Expose protected methods that allow the renderer process to use
// -------------------------------------------------------------

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key,
  ...args: EventPayloadMapping[Key]
): IpcReturnTypeMapping[Key] {
  return ipcRenderer.invoke(
    key,
    ...args
  ) as unknown as IpcReturnTypeMapping[Key]
}

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cb = (_: IpcRendererEvent, data: any) => callback(data)

  ipcRenderer.on(key, cb)
  return () => ipcRenderer.off(key, cb)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const union = (props: any, aditional: any) => {
  return { ...props, ...aditional }
}
