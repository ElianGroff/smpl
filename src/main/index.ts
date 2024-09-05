import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import fs from 'fs'
import path, { join } from 'path'

import { appDirectoryName, fileEncoding, welcomeNoteContent, welcomeNoteFilename } from '@shared/constants'
import { CreateNote, DeleteNote, GetNotes, ReadNote, RenameNote, WriteNote } from '@shared/types'
import { homedir } from 'os'
import { createNote, deleteNote, getNotes, readNote, renameNote, writeNote } from './lib'

function ensureNoteDir() {
  const notesPath = path.join(homedir(), appDirectoryName)

  if (!fs.existsSync(notesPath)) {
      fs.mkdirSync(notesPath)

      const welcomeNotePath = path.join(notesPath, welcomeNoteFilename)
      fs.writeFileSync(welcomeNotePath, welcomeNoteContent, { encoding: fileEncoding })
  }
}


function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    minHeight: 150,
    minWidth: 260,
    show: false,
    autoHideMenuBar: true,
    icon: path.resolve(__dirname, '../../resources/icon.png'),
    center:true,
    title:'smpl.',
    frame: false,
    visualEffectState: 'active',
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  ipcMain.on('toggleAlwaysOnTop', (_) => {
    mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop())
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ensureNoteDir()

  // IPC test
  ipcMain.handle('getNotes', (_, ...args: Parameters<GetNotes>) => getNotes(...args))
  ipcMain.handle('readNote', (_, ...args: Parameters<ReadNote>) => readNote(...args))
  ipcMain.handle('writeNote', (_, ...args: Parameters<WriteNote>) => writeNote(...args))
  ipcMain.handle('createNote', (_, ...args: Parameters<CreateNote>) => createNote(...args))
  ipcMain.handle('deleteNote', (_, ...args: Parameters<DeleteNote>) => deleteNote(...args))
  ipcMain.handle('renameNote', (_, ...args: Parameters<RenameNote>) => renameNote(...args))  

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
