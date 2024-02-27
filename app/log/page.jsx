'use client'

import { useState } from 'react'
import Link from 'next/link'
import './style.css'

function Page() {
  const [name2, setName] = useState('')
  const [message, setMessage] = useState('')
  const [flag, setFlag] = useState(true)
  const [load, setLoad] = useState(false)
  function handleChange(event) {
    setName(event.target.value)
  }

  async function fetchCookie() {
    try {
      setLoad(true)
      const response = await fetch('http://localhost:2000/get_cookie', {
        method: 'POST',
        body: JSON.stringify({
          name: name2,
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const json = await response.json()
      setLoad(false)
      if (json.data === 'nf') {
        setMessage(
          'Sorry. The user is not found. Please check if there is a typo error. Else, you are a new user, please sign in to continue'
        )
        setFlag(false)
      } else {
        setMessage('Success! The user has been found')
        process.env.logged
        setFlag(true)
      }
    } catch (error) {
      console.error('Error fetching cookie:', error)
      setMessage('Error fetching cookie')
    }
  }

  return (
    <>
      <h1 className="headitis">
        This is the log in page. This page is for you if you have already
        registered
      </h1>
      <div className="div1">
        <label htmlFor="username" className="lab">
          <p className="pyeah">Username: </p>
        </label>
        <input
          value={name2}
          autoComplete="off"
          type="text"
          name="username"
          className="inp"
          onChange={handleChange}
        />
        <button onClick={fetchCookie} className="button">
          Submit
        </button>
        <p
          style={{
            textAlign: 'center',
            position: 'relative',
            bottom: '30px',
            color: 'black',
            fontFamily: 'Inter',
            fontWeight: '200',
          }}
        >
          New here?
        </p>
        <a className="a" href="/sign">
          Click here to sign up
        </a>
        {load && <p className="load">Loading...</p>}
        {!load && <p className={`fornf${flag ? '' : 'nf'}`}>{message}</p>}
      </div>
    </>
  )
}

export default Page
