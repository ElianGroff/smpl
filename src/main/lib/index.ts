import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, RenameNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import fs from 'fs'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'

export const getRootDir = async () =>  {
    const notesPath = path.join(homedir(), appDirectoryName)

    if (!fs.existsSync(notesPath)) {
        fs.mkdirSync(notesPath)
    }

    return notesPath
}

export const getNotes: GetNotes = async () => {
    const rootDir = await getRootDir()

    await ensureDir(rootDir)

    const notesFileNames = await readdir(rootDir, {
        encoding: fileEncoding,
        withFileTypes: false
    })

    const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

    return Promise.all(notes.map(getNoteInfoFromFilename))
}


export const getNoteInfoFromFilename = async(filename: string):Promise<NoteInfo> => {
    const fileStats = await stat(`${await getRootDir()}/${filename}`)

    return {
        title: filename.replace(/\.md$/, ''),
        lastEditTime: fileStats.mtimeMs,
    }
}


export const readNote:ReadNote = async (filename) => {
    const rootDir = await getRootDir()

    return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}


export const renameNote:RenameNote = async (oldName, newName) => {
    const rootDir = await getRootDir()

    const oldPath = `${rootDir}/${oldName}.md`
    const newPath = `${rootDir}/${newName}.md`

    fs.renameSync(oldPath, newPath)
}


export const writeNote:WriteNote = async (filename, content) => {
    const rootDir = await getRootDir()

    console.info(`writing ${rootDir}.md`)
    return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}


export const createNote: CreateNote = async () => {
    const rootDir = await getRootDir()
  
    await ensureDir(rootDir)
  
    const { filePath, canceled } = await dialog.showSaveDialog({
      title: 'New note',
      defaultPath: `${rootDir}/Untitled.md`,
      buttonLabel: 'Create',
      properties: ['showOverwriteConfirmation'],
      showsTagField: false,
      filters: [{ name: 'Markdown', extensions: ['md'] }]
    })
  
    if (canceled || !filePath) {
      console.info('Note creation canceled')
      return false
    }
  
    const { name: filename, dir: parentDir } = path.parse(filePath)
  
    if (parentDir !== rootDir) {
      await dialog.showMessageBox({
        type: 'error',
        title: 'Creation failed',
        message: `All notes must be saved under ${rootDir}.
        Avoid using other directories!`
      })
  
      return false
    }
  
    console.info(`Creating note: ${filePath}`)
    await writeFile(filePath, '')
  
    return filename
  }
  
  export const deleteNote: DeleteNote = async (filename) => {
    const rootDir = getRootDir()
  
    const { response } = await dialog.showMessageBox({
      type: 'warning',
      title: 'Delete note',
      message: `Are you sure you want to delete ${filename}?`,
      buttons: ['Delete', 'Cancel'], // 0 is Delete, 1 is Cancel
      defaultId: 1,
      cancelId: 1
    })
  
    if (response === 1) {
      console.info('Note deletion canceled')
      return false
    }
  
    console.info(`Deleting note: ${filename}`)
    await remove(`${rootDir}/${filename}.md`)
    return true
  }