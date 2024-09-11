import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

//^STINKMARK: this should not be a render and main process shared utils. utils should be local

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}

export const isValidFileName = (filename: string) => {
  const regexPattern =
    /^(?!\.)(?!com[0-9]$)(?!con$)(?!lpt[0-9]$)(?!nul$)(?!prn$)[^\|\*\?\\:<>/$"]*[^\.\|\*\?\\:<>/$"]+$/
  return regexPattern.test(filename)
}

export const countWords = (text: string) => {
  return text.trim().split(/\s+/).length
}
