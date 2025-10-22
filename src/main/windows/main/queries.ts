import { BrowserWindow } from 'electron'
import { defaultWinOptions, id, loadPage } from '../../utils'
import windowsStore from '../../store/windows'
import { Id } from '../../../types'

export default function createQueriesWindow(
  parentId?: Id,
  currentQueryId?: string
) {
  const parent = parentId ? windowsStore.getWindow(parentId) : undefined

  const win = new BrowserWindow({
    ...defaultWinOptions,
    width: 500,
    height: 450,
    resizable: false,
    center: false,
    parent: parent || undefined,
    modal: !!parent,
    fullscreenable: false,
    minimizable: false,
    maximizable: false
  })

  const winId = id()

  const search = new URLSearchParams()
  if (currentQueryId) search.append('currentQueryId', currentQueryId)
  if (parentId) search.append('parentId', parentId)

  windowsStore.register(winId, win)

  loadPage(win, `main/queries?${search.toString()}`)

  return winId
}
