import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sabbath School Gamified',
  description: 'Uma plataforma gamificada para escola sabatina',
  authors: [{ name: 'Rafael Zendron' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="me" href="https://github.com/rafaumeu" />
        <link rel="me" href="https://portfoliodev-blush-pi.vercel.app" />
        <meta name="author" content="Rafael Zendron" />
      </head>
      <body className="min-h-screen bg-background">{children}</body>
    </html>
  )
}
