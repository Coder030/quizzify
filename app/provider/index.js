'use client'

import { useState } from 'react'
import { ClassContext } from '../context'

export default function ClassProvider({ children }) {
  const [className, setClassName] = useState('')
  const [chatName, setChatName] = useState('')

  return (
    <ClassContext.Provider
      value={{ className, setClassName, chatName, setChatName }}
    >
      {children}
    </ClassContext.Provider>
  )
}
