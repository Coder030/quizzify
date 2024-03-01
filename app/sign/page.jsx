'use client'

import { redirect } from 'next/navigation'
import './style.css'
import { useState } from 'react'
import Link from 'next/link'

function Page() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [flag, setFlag] = useState(false)
  const [message, setMessage] = useState('')
  const [load, setLoad] = useState(false)
  const [inc, setInc] = useState(false)
  function handleChange(event) {
    setUsername(event.target.value)
  }
  function handleChange2(event) {
    setPassword(event.target.value)
  }

  async function makeCookie() {
    try {
      if (username !== '' && password !== '') {
        setInc(false)
        setLoad(true)
        const response = await fetch('http://localhost:2000/make_cookie', {
          method: 'POST',
          body: JSON.stringify({
            name: username,
            password: password,
          }),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const json = await response.json()
        setLoad(false)
        if (json.message === 'same') {
          setFlag(true)
        } else {
          setMessage('Success! New user created!')
          setFlag(false)
        }
      } else {
        setInc(true)
      }
    } catch (error) {
      console.error('Error making cookie:', error)
    }
  }

  return (
    <>
      <h1 className="headitis">
        This is the sign up page. This page is for you if you have not already
        registered
      </h1>
      <div className="div1">
        <label htmlFor="username" className="lab">
          <p className="pyeah">Username: </p>
        </label>
        <input
          value={username}
          autoComplete="off"
          type="text"
          name="username"
          className="inp"
          onChange={handleChange}
          required
        />
        <label htmlFor="pass" className="lab">
          <p className="pyeah2">Password: </p>
        </label>
        <input
          value={password}
          autoComplete="off"
          type="password"
          name="pass"
          className="inp2"
          onChange={handleChange2}
          required
        />
        <button onClick={makeCookie} className="button">
          Submit
        </button>

        {load && !inc && <p className="load">Loading...</p>}
        {!load && !inc && flag && (
          <p className="ae">
            This username already exists. Please choose another one?
          </p>
        )}
        {!load && !inc && !flag && <p className="s">{message}</p>}
        {inc && <p className="inc">** Incomplete request **</p>}
        <p
          style={{
            textAlign: 'center',
            position: 'relative',
            marginTop: '80px',
            bottom: '30px',
            color: 'black',
            fontFamily: 'Inter',
            fontWeight: '400',
          }}
        >
          Already registered?
        </p>
        <a className="a" href="/log">
          Click here to log in
        </a>
      </div>
    </>
  )
}

export default Page
