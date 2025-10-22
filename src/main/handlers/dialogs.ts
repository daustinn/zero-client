import { dialog, MessageBoxOptions } from 'electron'
import { ipcMainHandler } from '../utils'
import windowsStore from '../store/windows'

export default () => {
  ipcMainHandler(
    'alert',
    async (
      _,
      {
        type = 'warning',
        parentId,
        title = 'Warning',
        message = 'Are you sure you want to continue?',
        buttons = [],
        detail
      }
    ) => {
      const parent = parentId ? windowsStore.getWindow(parentId) : undefined

      const options: MessageBoxOptions = {
        type,
        buttons,
        defaultId: 1,
        cancelId: 0,
        title,
        message,
        detail,
        normalizeAccessKeys: true
      }

      const result = parent
        ? await dialog.showMessageBox(parent, options)
        : await dialog.showMessageBox(options)

      const response: Record<string | number, boolean> = {}

      buttons.forEach((_, i) => {
        response[i] = i === result.response
      })

      return buttons.map((_, i) => i === result.response)
    }
  )
}
