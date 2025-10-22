import { BrowserWindow } from 'electron'
import { defaultWinOptions, id, loadPage } from '../../utils'
import windowsStore from '../../store/windows'
import { Environment, Id } from '../../../types'

export default function createEnvironmentWindow(
  parentId: Id,
  environment?: Environment
) {
  const parent = parentId ? windowsStore.getWindow(parentId) : undefined

  const win = new BrowserWindow({
    ...defaultWinOptions,
    width: 500,
    height: 150,
    modal: !!parent,
    center: false,
    resizable: false,
    minimizable: false,
    maximizable: false,
    parent: parent || undefined
  })

  const winId = id()

  const search = new URLSearchParams()

  if (environment) search.append('default', JSON.stringify(environment))

  search.append('parentId', parentId || '')

  windowsStore.register(winId, win)

  loadPage(win, `environment?${search.toString()}`)
}
