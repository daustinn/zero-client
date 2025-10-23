import Button from '@renderer/ui/commons/button'
import Spinner from '@renderer/ui/commons/spinner'
import { IconGift } from '@tabler/icons-react'
import { UpdateInfo } from 'electron-updater'
import React from 'react'

export default function UpdaterToast() {
  const [show, setShow] = React.useState(false)
  const [info, setInfo] = React.useState<UpdateInfo | null>(null)
  const [installing, setInstalling] = React.useState(false)

  React.useEffect(() => {
    const unsubs = window.api.updaterAvailable((updateInfo) => {
      setInfo(updateInfo)
      setShow(true)
    })
    return unsubs
  }, [])

  const handleInstallNow = async () => {
    try {
      setInstalling(true)
      await window.api.updaterDownload()
      window.api.updaterInstallRestart()
    } catch (error) {
      window.api.alert({
        type: 'error',
        title: 'Update Error',
        message: 'An error occurred while installing the update.',
        detail: error instanceof Error ? error.message : String(error)
      })
    } finally {
      setInstalling(false)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 p-4 pointer-events-none">
      <div
        data-show={show}
        className="pointer-events-auto data-[show=true]:translate-y-0 translate-y-[200%] transition-transform h-14 w-[380px] shadow-[0_5px_20px_rgba(1,1,1,.7)] flex items-center border dark:border-neutral-400/20 bg-background gap-2 p-2 rounded-xl"
      >
        <div className="opacity-50 px-2">
          <IconGift size={23} />
        </div>
        <div className="grow">
          <p>New update available</p>
          <p className="text-xs opacity-50">
            {info?.releaseName || info?.version}
          </p>
        </div>
        <div className="flex gap-0.5">
          <Button
            disabled={installing}
            onClick={() => setShow(false)}
            variant="transparent"
          >
            Later
          </Button>
          <Button
            disabled={installing}
            onClick={handleInstallNow}
            variant="primary"
            className="text-nowrap w-24"
          >
            {installing && <Spinner size={14} />}
            {installing ? '' : 'Install Now'}
          </Button>
        </div>
      </div>
    </div>
  )
}
