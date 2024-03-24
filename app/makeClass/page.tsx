'use client'

import React, { useEffect, useState } from 'react'
import './style.css'
import { useRouter } from 'next/navigation'

function Page() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [currentId, setCurrentId] = useState('')
  const [sec, setSec] = useState('')
  const [des, setDes] = useState('')
  const [left, setLeft] = useState(13)
  const [flag, setFlag] = useState(false)
  const generateRandom = () => {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < 10) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }
  const handleClick = async () => {
    const code = generateRandom()
    const ob1 = {
      item: {
        name: name,
        code: code,
        class: sec,
        description: des,
        id: currentId,
      },
    }

    const response = await fetch(
      'https://classroom-backend-u7q5.onrender.com/api/make_class',
      {
        method: 'POST',
        body: JSON.stringify(ob1),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    router.push('/')
  }
  useEffect(() => {
    async function fetchData() {
      const response2 = await fetch(
        'https://classroom-backend-u7q5.onrender.com/api/me/',
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const data3 = await response2.json()
      setCurrentId(data3['message']['id'])
    }
    fetchData()
  })
  return (
    <div className="div">
      <p className="headingbro">Make Class</p>
      <p className="cnL">Class name: </p>
      <input
        placeholder="Format: Ordinal Number ( 6th ) + Subject"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
        className="cnI"
        type="text"
      />
      <p className="csL">Class section: </p>
      <div className="input-container">
        <input
          placeholder="Format: Section(s).  Eg. - A,B,C,D"
          value={sec}
          onChange={(e) => {
            setFlag(false)
            const inputValue = e.target.value
            const remainingCharacters = 13 - inputValue.length

            if (remainingCharacters >= 0) {
              setSec(inputValue)
              setLeft(remainingCharacters)
            } else {
              setFlag(true)
              setSec(inputValue.substring(0, 13))
            }
          }}
          onKeyDown={(e) => {
            const remainingCharacters = 13 - sec.length

            // Prevent regular key presses when the limit is reached
            if (remainingCharacters === 0 && e.key !== 'Backspace') {
              e.preventDefault()
            }
          }}
          className="csI"
          type="text"
        />
        <p className="cl">{left} characters left</p>
      </div>
      {flag && <p>Word limit has finished!</p>}
      <p className="dL">Description: </p>
      <textarea
        placeholder="Optional. You can give the teacher name"
        value={des}
        onChange={(e) => {
          setDes(e.target.value)
        }}
        className="dI"
      />
      <button onClick={handleClick} className="booten">
        Make class
      </button>
    </div>
  )
}

export default Page
