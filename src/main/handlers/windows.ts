import windowsStore from '../store/windows'
import { ipcMainHandler } from '../utils'
import createMainWindow from '../windows/main'
import createQueriesWindow from '../windows/main/queries'
import createStartWindow from '../windows/start'
import createConnectionWindow from '../windows/start/connection'
import createEnvironmentWindow from '../windows/start/environment'

export default () => {
  ipcMainHandler('windows:connection', (_, ...props) => {
    return createConnectionWindow(...props)
  })

  ipcMainHandler('windows:environment', (_, ...props) => {
    return createEnvironmentWindow(...props)
  })

  ipcMainHandler('windows:main', async (_, ...props) => {
    return createMainWindow(...props)
  })

  ipcMainHandler('windows:queries', async (_, ...props) => {
    return createQueriesWindow(...props)
  })

  ipcMainHandler('windows:start', async () => {
    return createStartWindow()
  })

  ipcMainHandler('windows:close', async (_, ...props) => {
    return windowsStore.closeWindowsById(...props)
  })
}
