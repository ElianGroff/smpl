import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}

export const isValidFileName = (filename: string) => {
  const regexPattern = /^(?!\.)(?!com[0-9]$)(?!con$)(?!lpt[0-9]$)(?!nul$)(?!prn$)[^\|\*\?\\:<>/$"]*[^\.\|\*\?\\:<>/$"]+$/
  return regexPattern.test(filename)
}

export const countWords = (text: string) => {
  return text.trim().split(/\s+/).length
}
