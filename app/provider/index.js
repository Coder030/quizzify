'use client'

import { useState } from 'react'
import { ClassContext } from '../context'

export default function UserProvider({ children }) {
  const [className, setClassName] = useState({})

  return (
    <ClassContext.Provider value={{ className, setClassName }}>
      {children}
    </ClassContext.Provider>
  )
}
