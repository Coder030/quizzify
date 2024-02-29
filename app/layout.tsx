import type { Metadata } from 'next'
import Sidebar from './Sidebar'
import './sb.css'
import ClassProvider from './provider'
import Page from './header'

export const metadata: Metadata = {
  title: 'Quizzify Genius',
  description: 'Made by Kartik',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ClassProvider>
          <Sidebar />
          <div className="content">{children}</div>
        </ClassProvider>
      </body>
    </html>
  )
}
