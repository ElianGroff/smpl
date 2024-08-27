import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('Preload must be run in a context that supports ES modules')
}

try {
  contextBridge.exposeInMainWorld('contex', {
    //TODO
  })
} catch (er) {
  console.error(er)
}
