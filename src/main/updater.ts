import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import path from 'path'
import windowsStore from './store/windows'
import { is } from '@electron-toolkit/utils'

export function setupUpdaterForRenderer() {
  autoUpdater.logger = log
  autoUpdater.autoDownload = false

  if (is.dev) {
    autoUpdater.forceDevUpdateConfig = true
    autoUpdater.updateConfigPath = path.join(__dirname, '../dev-app-update.yml')
    log.info('Updater en modo desarrollo. Usando dev-app-update.yml')
  }

  autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...')
  })

  autoUpdater.on('update-available', (info) => {
    log.info('Update available:', info)
    windowsStore.sendToAll('zero:update:available', info)
  })

  autoUpdater.on('update-not-available', (info) => {
    log.info('Update not available:', info)
  })

  autoUpdater.on('error', (err) => {
    log.error('Error in auto-updater:', err)
  })

  autoUpdater.on('download-progress', (progressObj) => {
    log.info(
      `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}%`
    )
  })

  autoUpdater.on('update-downloaded', (info) => {
    log.info('Update downloaded:', info)
    windowsStore.sendToAll('zero:update:downloaded', info)
  })
}
