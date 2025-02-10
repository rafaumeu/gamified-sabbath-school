import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sabbath School Gamified',
  description: 'Uma plataforma gamificada para escola sabatina',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background">{children}</body>
    </html>
  )
} 