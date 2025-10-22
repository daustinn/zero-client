import { BrowserWindow } from 'electron'

export class Broadcast {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static send(channel: string, data: any) {
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send(channel, data)
    })
  }
}
