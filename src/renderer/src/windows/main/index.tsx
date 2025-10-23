import MainProvider from './provider'
import Nav from './components/nav'
import Monaco from './components/monaco'
import UpdaterToast from './updater-toast'

export default function MainWindow() {
  return (
    <MainProvider>
      <Nav />
      <Monaco />
      <UpdaterToast />
    </MainProvider>
  )
}
