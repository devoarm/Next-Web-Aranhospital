import { Inter as FontSans , Kanit, Prompt } from 'next/font/google'

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const kanit = Kanit({
  subsets: ['latin'],
  style: ['normal'],
  weight: '400',
  variable: "--font-sans",
})

export const prompt = Prompt({
  subsets: ['latin'],
  style: ['normal'],
  weight: '400',
})

