import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import createStartWindow from './windows/start'
import Database from './database'
import handlers from './handlers'
import dialogs from './handlers/dialogs'
import windows from './handlers/windows'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Initialize database
  Database.initialize()

  // Create the Start window
  createStartWindow()

  // Handlers
  handlers()
  dialogs()
  windows()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createStartWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  Database.disconnect()
})
