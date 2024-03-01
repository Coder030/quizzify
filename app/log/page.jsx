'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IoEyeOutline } from 'react-icons/io5'
import './style.css'

function Page() {
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [message, setMessage] = useState('')
  const [flag, setFlag] = useState(true)
  const [load, setLoad] = useState(false)
  const [inc, setInc] = useState(false)
  function handleChange(event) {
    setUsername(event.target.value)
  }
  function handleChange2(event) {
    setPass(event.target.value)
  }

  async function fetchCookie() {
    try {
      if (username !== '' && pass !== '') {
        setInc(false)
        setLoad(true)
        const response = await fetch('http://localhost:2000/get_cookie', {
          method: 'POST',
          body: JSON.stringify({
            name: username,
            password: pass,
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
      } else {
        setInc(true)
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
      <div className="div3">
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
        />
        <label htmlFor="pass" className="lab">
          <p className="pyeah2">Password: </p>
        </label>
        <div className="inp-container">
          <input
            value={pass}
            autoComplete="off"
            type="password"
            name="pass"
            className="inp2"
            onChange={handleChange2}
          />
          <button className="see">
            <IoEyeOutline />
          </button>
        </div>
        <button onClick={fetchCookie} className="button">
          Submit
        </button>
      </div>
      {!load && !inc && <p className={`fornf${flag ? '' : 'nf'}`}>{message}</p>}
      {inc && <p className="inc">** Incomplete request **</p>}
      <p
        style={{
          textAlign: 'center',
          position: 'relative',
          bottom: '30px',
          color: 'black',
          fontFamily: 'Inter',
          fontWeight: '400',
          marginTop: '50px',
        }}
      >
        New here?
      </p>
      <a className="a" href="/sign">
        <p style={{ textAlign: 'center' }}>Click here to sign up</p>
      </a>
      {load && !inc && <p className="load">Loading...</p>}
    </>
  )
}

export default Page
