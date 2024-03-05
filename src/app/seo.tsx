import { Metadata } from 'next'
import { siteMetadata } from '@/config/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  [key: string]: any
}

export function genPageMetadata({ title, description, image, ...rest }: PageSEOProps): Metadata {
  return {
    title,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      type: 'website',
      url: './',
      siteName: siteMetadata.title,
      locale: 'en_US',
    },
    ...rest,
  }
}
