'use client'

import { useRef } from 'react'
import './style.css'

const Input = () => {
  const handleInputChange = (event) => {
    const value = event.target.value

    if (value === '') {
      console.log('end')

      // You have reached the end of the input
    }
  }

  return <textarea className="page" onChange={handleInputChange} />
}

export default Input
