import { BrowserWindow } from 'electron'
import { defaultWinOptions, id, loadPage } from '../../utils'
import windowsStore from '../../store/windows'
import { Id, WindowConnectionProps } from '../../../types'

export default function createConnectionWindow(
  parentId: Id,
  props?: WindowConnectionProps
) {
  const { environmentId, provider, connetion } = props || {}

  const parent = parentId ? windowsStore.getWindow(parentId) : undefined

  const win = new BrowserWindow({
    ...defaultWinOptions,
    width: 440,
    height: 370,
    modal: !!parent,
    resizable: false,
    center: false,
    minimizable: false,
    maximizable: false,
    parent: parent || undefined
  })

  const winId = id()

  const search = new URLSearchParams()

  if (environmentId) search.append('environmentId', environmentId)

  if (provider) search.append('provider', provider)

  if (connetion) search.append('default', JSON.stringify(connetion))

  search.append('parentId', parentId || '')

  windowsStore.register(winId, win)

  loadPage(win, `/connection?${search.toString()}`)
}
