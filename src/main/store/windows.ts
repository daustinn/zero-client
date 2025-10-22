/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserWindow, globalShortcut } from 'electron'
import { MAX_ZOOM, MIN_ZOOM } from '../const'

class WindowsStore {
  private windows: Map<string, BrowserWindow | null> = new Map()

  register(id: string, win: BrowserWindow): void {
    this.windows.set(id, win)
    this.registerZoomListener(win)
    this.registerFocusListeners(id, win)

    win.on('closed', () => {
      this.windows.set(id, null)
    })

    win.on('ready-to-show', () => {
      win.show()
    })

    win.webContents.on('did-finish-load', () => {
      win.webContents.send('winId', id)
    })
  }

  registerZoomListener(win: BrowserWindow): void {
    win.on('focus', () => {
      globalShortcut.register('CmdOrCtrl+Plus', () => {
        if (win.isFocused()) {
          const n = win.webContents.zoomFactor + 0.1
          if (n > MAX_ZOOM) return
          win.webContents.zoomFactor = n
        }
      })

      globalShortcut.register('CmdOrCtrl+=', () => {
        if (win.isFocused()) {
          const n = win.webContents.zoomFactor + 0.1
          if (n > MAX_ZOOM) return
          win.webContents.zoomFactor = n
        }
      })

      globalShortcut.register('CmdOrCtrl+-', () => {
        if (win.isFocused()) {
          const n = win.webContents.zoomFactor - 0.1
          if (n < MIN_ZOOM) return
          win.webContents.zoomFactor = n
        }
      })
    })
    win.on('blur', () => {
      globalShortcut.unregisterAll()
    })
  }

  getWindow(id: string): BrowserWindow | null {
    return this.windows.get(id) || null
  }

  isWindowOpen(id: string): boolean {
    const window = this.windows.get(id)
    return window !== null && window !== undefined && !window.isDestroyed()
  }

  closeWindow(id: string): void {
    const window = this.windows.get(id)
    if (window && !window.isDestroyed()) {
      window.close()
    }
  }

  getAllActiveWindows(): BrowserWindow[] {
    return Array.from(this.windows.values()).filter(
      (window): window is BrowserWindow =>
        window !== null && !window.isDestroyed()
    )
  }

  cleanup(): void {
    for (const [id, window] of this.windows.entries()) {
      if (window === null || window.isDestroyed()) {
        this.windows.delete(id)
      }
    }
  }

  registerFocusListeners(id: string, win: BrowserWindow): void {
    const focusId = `focus:${id}`
    win.on('focus', () => {
      win.webContents.send(focusId, true)
    })

    win.on('blur', () => {
      win.webContents.send(focusId, false)
    })
  }

  sendToWindow(id: string, channel: string, ...args: any[]): void {
    const window = this.windows.get(id)
    if (window && !window.isDestroyed()) {
      window.webContents.send(channel, ...args)
    }
  }

  sendToAll(channel: string, ...args: any[]): void {
    for (const window of this.getAllActiveWindows()) {
      window.webContents.send(channel, ...args)
    }
  }

  closeWindowsById(id: string): void {
    const window = this.windows.get(id)
    if (window && !window.isDestroyed()) {
      window.close()
    }
  }
}

const windowsStore = new WindowsStore()
export default windowsStore
