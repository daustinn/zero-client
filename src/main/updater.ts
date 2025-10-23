import electronUpdater, { type AppUpdater } from 'electron-updater'
import { app, dialog, BrowserWindow } from 'electron'
import log from 'electron-log'
import { is } from '@electron-toolkit/utils'

function getAutoUpdater(): AppUpdater {
  const { autoUpdater } = electronUpdater
  return autoUpdater
}

const autoUpdater = getAutoUpdater()

export class UpdateManager {
  constructor() {
    log.transports.file.level = 'info'
    autoUpdater.logger = log
    autoUpdater.autoDownload = false
    autoUpdater.autoInstallOnAppQuit = true

    this.setupEventListeners()
  }

  private setupEventListeners(): void {
    autoUpdater.on('checking-for-update', () => {
      log.info('🔍 Verificando actualizaciones...')
    })

    autoUpdater.on('update-available', (info) => {
      log.info('✅ Actualización disponible:', info.version)

      // dialog.showMessageBox se muestra sobre la ventana activa automáticamente
      dialog
        .showMessageBox({
          type: 'info',
          title: 'Actualización disponible',
          message: `Nueva versión ${info.version} disponible`,
          detail: '¿Descargar ahora?',
          buttons: ['Descargar', 'Más tarde'],
          defaultId: 0,
          cancelId: 1
        })
        .then((result) => {
          if (result.response === 0) {
            autoUpdater.downloadUpdate()
          }
        })
    })

    autoUpdater.on('update-not-available', () => {
      log.info('ℹ️ No hay actualizaciones disponibles')
    })

    autoUpdater.on('download-progress', (progress) => {
      const percent = progress.percent.toFixed(2)
      log.info(`📥 Descargando: ${percent}%`)

      // Mostrar progreso en TODAS las ventanas abiertas
      BrowserWindow.getAllWindows().forEach((window) => {
        window.setProgressBar(progress.percent / 100)
      })
    })

    autoUpdater.on('update-downloaded', () => {
      log.info('✅ Actualización descargada')

      // Limpiar barra de progreso de todas las ventanas
      BrowserWindow.getAllWindows().forEach((window) => {
        window.setProgressBar(-1)
      })

      dialog
        .showMessageBox({
          type: 'info',
          title: 'Actualización lista',
          message: 'La actualización se instalará al reiniciar',
          detail: '¿Reiniciar ahora?',
          buttons: ['Reiniciar', 'Más tarde'],
          defaultId: 0,
          cancelId: 1
        })
        .then((result) => {
          if (result.response === 0) {
            // Esto cierra todas las ventanas y reinstala
            setImmediate(() => autoUpdater.quitAndInstall(false, true))
          }
        })
    })

    autoUpdater.on('error', (error) => {
      log.error('❌ Error en actualización:', error)
    })
  }

  checkForUpdates(): void {
    if (is.dev) {
      log.info('⚠️ Desarrollo: actualizaciones deshabilitadas')
      return
    }

    autoUpdater.checkForUpdates().catch((error) => {
      log.error('Error al verificar actualizaciones:', error)
    })
  }
}

export default new UpdateManager()
