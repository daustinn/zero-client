import MainProvider from './provider'
import Nav from './components/nav'
import Monaco from './components/monaco'

export default function MainWindow() {
  return (
    <MainProvider>
      <Nav />
      <Monaco />
    </MainProvider>
  )
}
