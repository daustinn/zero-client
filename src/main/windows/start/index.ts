import { BrowserWindow } from 'electron'
import { defaultWinOptions, id, loadPage } from '../../utils'
import windowsStore from '../../store/windows'

export default function createStartWindow() {
  const win = new BrowserWindow({
    ...defaultWinOptions,
    width: 550,
    minWidth: 550,
    minHeight: 300,
    height: 400
  })

  const winId = id()

  windowsStore.register(winId, win)

  loadPage(win, '/')
}
