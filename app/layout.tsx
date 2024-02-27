import type { Metadata } from 'next'
import Sidebar from './Sidebar'
import './sb.css'
import UserProvider from './provider'

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
        <UserProvider>
          <Sidebar />
          <div className="content">{children}</div>
        </UserProvider>
      </body>
    </html>
  )
}
