'use client'

import Sidebar from './Sidebar'
import './sb.css'
import ClassProvider from './provider'
import { usePathname } from 'next/navigation'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const path = usePathname()
  const hideBar = path === '/log' || path === '/sign'
  return (
    <html lang="en">
      <body>
        <ClassProvider>
          {!hideBar && <Sidebar />}
          <div className="content" id="root">
            {children}
          </div>
        </ClassProvider>
      </body>
    </html>
  )
}
