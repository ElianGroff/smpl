import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNote, RenameNote, WriteNote } from '@shared/types'
import { countWords } from '@shared/utils'
import fs from 'fs'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'



export const getNotes: GetNotes = async () => {
  const rootDir = path.join(homedir(), appDirectoryName)

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
      encoding: fileEncoding,
      withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  return Promise.all(notes.map(getNoteInfoFromFilename))
}


export const getNoteInfoFromFilename = async(filename: string):Promise<NoteInfo> => {
  const rootDir = path.join(homedir(), appDirectoryName)

  const fileStats = await stat(`${rootDir}/${filename}`)
  const content = await readFile(`${rootDir}/${filename}`, { encoding: fileEncoding })

  return {
      title: filename.replace(/\.md$/, ''),
      lastEditTime: fileStats.mtimeMs,
      wordCount: countWords(content)
  }
}


export const readNote:ReadNote = async (filename) => {
  const rootDir = path.join(homedir(), appDirectoryName)

  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}


export const renameNote:RenameNote = async (oldName, newName) => {
  const rootDir = path.join(homedir(), appDirectoryName)

  const oldPath = `${rootDir}/${oldName}.md`
  const newPath = `${rootDir}/${newName}.md`

  fs.rename(oldPath, newPath, (error) => {
    if (error) {
      console.error("Failed to rename note:", error)
      return false
    }

    console.info(`Renamed ${oldPath} to ${newPath}`)
    return true
  })
}


export const writeNote:WriteNote = async (filename, content) => {
  const rootDir = path.join(homedir(), appDirectoryName)
  const filePath = `${rootDir}/${filename}.md`

  console.info(`Writing ${filePath}`)
  return writeFile(filePath, content, { encoding: fileEncoding })
}


export const createNote: CreateNote = async (filename) => {
  const rootDir = path.join(homedir(), appDirectoryName)
  const filePath = `${rootDir}/${filename}.md`
    
  try {
    await writeFile(filePath, '')

    console.info(`Created ${filePath}`)

    return true
  } catch (error) {
    
    console.error("Failed to create note:", error)
    return false
  }
}
  
export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = path.join(homedir(), appDirectoryName)
  const filePath = `${rootDir}/${filename}.md`

  try {
    await remove(filePath)

    console.info(`Deleted ${filePath}`)

    return true
  } catch (error) {
    
    console.error("Failed to delete note:", filePath, error)
    return false
  }
}

  