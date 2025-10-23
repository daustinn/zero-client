import { shell } from 'electron'
import { ipcMainHandler } from '../utils'
import { ZeroClientService } from '../services/zero-client'
import CoreService from '../services/core'
import MySQL from '../services/core/mysql'
import { autoUpdater } from 'electron-updater'

export default function handlers() {
  // Utils
  ipcMainHandler('shell:openexternal', async (_, ...props) => {
    return await shell.openExternal(...props)
  })

  // Zero: Connections
  ipcMainHandler('zero:connections', () => {
    return ZeroClientService.getConnections()
  })
  ipcMainHandler('zero:connections:store', (_, ...props) => {
    return ZeroClientService.createConnection(...props)
  })
  ipcMainHandler('zero:connections:update', (_, ...props) => {
    return ZeroClientService.updateConnection(...props)
  })
  ipcMainHandler('zero:connections:one', (_, ...props) => {
    return ZeroClientService.getConnection(...props)
  })
  ipcMainHandler('zero:connections:delete', (_, ...props) => {
    return ZeroClientService.deleteConnection(...props)
  })

  // Zero: Environments
  ipcMainHandler('zero:environments', () => {
    return ZeroClientService.getEnvironments()
  })
  ipcMainHandler('zero:environments:store', (_, ...props) => {
    return ZeroClientService.createEnvironment(...props)
  })
  ipcMainHandler('zero:environments:update', (_, ...props) => {
    return ZeroClientService.updateEnvironment(...props)
  })
  ipcMainHandler('zero:environments:delete', (_, ...props) => {
    return ZeroClientService.deleteEnvironment(...props)
  })

  // Zero: Queries
  ipcMainHandler('zero:queries', (_, ...props) => {
    return ZeroClientService.getQueries(...props)
  })
  ipcMainHandler('zero:queries:last', (_, ...props) => {
    return ZeroClientService.getLastQuery(...props)
  })
  ipcMainHandler('zero:queries:store', (_, ...props) => {
    return ZeroClientService.createQuery(...props)
  })
  ipcMainHandler('zero:queries:update', (_, ...props) => {
    return ZeroClientService.updateQuery(...props)
  })
  ipcMainHandler('zero:queries:delete', (_, ...props) => {
    return ZeroClientService.deleteQuery(...props)
  })
  ipcMainHandler('zero:queries:change', (_, ...props) => {
    return ZeroClientService.changeQuery(...props)
  })

  // Zero Updater
  ipcMainHandler('zero:updater:download', () => {
    autoUpdater.downloadUpdate()
  })

  ipcMainHandler('zero:updater:install:restart', () => {
    autoUpdater.quitAndInstall()
  })

  // Core
  ipcMainHandler('core:test', async (_, ...props) => {
    return await CoreService.testConnection(...props)
  })
  ipcMainHandler('core:entities', async (_, ...props) => {
    return await CoreService.getEntities(...props)
  })
  ipcMainHandler('core:command', async (_, ...props) => {
    return await MySQL.command(...props)
  })

  //   ipcMainHandler('databases', async (_, ...props) => {
  //     return await DatabaseService.getDatabases(...props)
  //   })
  //   ipcMainHandler('disconnect', async (_, ...props) => {
  //     return await DatabaseService.disconnect(...props)
  //   })
}
