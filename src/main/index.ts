import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import createStartWindow from './windows/start'
import Database from './database'
import handlers from './handlers'
import dialogs from './handlers/dialogs'
import windows from './handlers/windows'
import updater from './updater'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.daustinn.zeroclient')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Initialize database
  Database.initialize()

  // Create the Start window
  createStartWindow()

  // Verify updates after 5 seconds
  setTimeout(() => {
    updater.checkForUpdates()
  }, 5000)

  // Verify updates every hour
  setInterval(
    () => {
      updater.checkForUpdates()
    },
    60 * 60 * 1000
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
