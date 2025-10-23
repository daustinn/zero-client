import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import createStartWindow from './windows/start'
import Database from './database'
import handlers from './handlers'
import dialogs from './handlers/dialogs'
import windows from './handlers/windows'
import { setupUpdaterForRenderer } from './updater'
import { autoUpdater } from 'electron-updater'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.daustinn.zeroclient')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Initialize database
  Database.initialize()

  // Create the Start window
  createStartWindow()

  // Create updater
  setupUpdaterForRenderer()

  // Check before to 5 seconds
  setTimeout(() => autoUpdater.checkForUpdates(), 5000)

  // Check every 5 minutes
  setInterval(
    () => {
      autoUpdater.checkForUpdates()
    },
    5 * 60 * 1000 // 5 minutes
  )

  // Handlers
  handlers()
  dialogs()
  windows()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createStartWindow()
  })
})

app.on('window-all-closed', () => {
  Database.disconnect()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  Database.disconnect()
})
