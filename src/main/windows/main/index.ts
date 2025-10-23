import { BrowserWindow } from 'electron'
import { defaultWinOptions, id, loadPage } from '../../utils'
import windowsStore from '../../store/windows'
import { Connection } from '../../../types'
import createStartWindow from '../start'
import CoreService from '../../services/core'

export default function createMainWindow(
  connection: Connection,
  closeOpenStart = true
) {
  const win = new BrowserWindow({
    ...defaultWinOptions,
    width: 800,
    height: 600,
    minWidth: 700,
    minHeight: 500,
    titleBarOverlay: {
      color: '#141414',
      symbolColor: '#8b8b8b',
      height: 44
    }
  })

  const winId = id()

  windowsStore.register(winId, win)

  loadPage(win, 'main/' + connection.id)

  win.on('closed', async () => {
    if (closeOpenStart) {
      createStartWindow()
      await CoreService.disconnect(winId, connection)
    }
  })
}
