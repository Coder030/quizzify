'use client'

import React, { useEffect, useState } from 'react'
import './style.css'
import Modal from 'react-modal'

function Page() {
  const [currentName, setCurrentName] = useState('Loading...')
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')
  const [dataIt, setDataIt] = useState({ name: '' })
  const [loading, setLoading] = useState(false)
  const [dataWhole, setDataWhole] = useState([
    { name: 'Loading...', description: '', class: '' },
  ])
  const [currentId, setCurrentId] = useState('')
  const [flagOne, setFlagOne] = useState(false)
  const [flagtwo, setflagtwo] = useState(true)
  useEffect(() => {
    Modal.setAppElement(document.body)
    async function fetchData() {
      const response2 = await fetch('http://localhost:2000/api/me/', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response2.json()
      const response = await fetch('http://localhost:2000/api/class_member', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      const data2 = await response.json()

      setDataWhole(data2)
      setCurrentId(data['message']['id'])
      setCurrentName(data['message']['username'])
    }
    fetchData()
  }, [open])
  return (
    <div className="div2">
      <p
        style={{
          fontSize: '20px',
          fontFamily: 'Inter',
          fontWeight: '500',
          textAlign: 'center',
        }}
      >
        Joined Classes
      </p>
      <p
        style={{
          fontSize: '30px',
          fontFamily: 'Inter',
          fontWeight: '500',
          textAlign: 'center',
        }}
      >
        Username: {currentName}
      </p>
      <p style={{ fontFamily: 'Inter', color: 'grey' }}>Joined classes</p>
      {dataWhole.length !== 0 &&
        dataWhole.map((item) => {
          return (
            <>
              <div className="classes" key={item.name}>
                <p className="name">{item.name}</p>
                <p className="realdes">{item.description}</p>
                <div className="tisclass">
                  <p className="class">Sections {item.class}</p>
                </div>
              </div>
            </>
          )
        })}
      {dataWhole.length === 0 && <p>You do not have any classes...</p>}
      <button
        onClick={() => {
          setOpen(!open)
          setFlagOne(false)
          setflagtwo(true)
        }}
        className="jk"
      >
        Join New Class
      </button>
      <Modal isOpen={open}>
        <div className="tismodal">
          <div className="head-contas">
            <h1 className="modalhead">Join class</h1>
            <button className="closebutt" onClick={() => setOpen(false)}>
              X
            </button>
          </div>
          <p className="cc">Class code</p>
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
            }}
            className="inputCode"
            type="text"
          />
          <div className="butt-holder">
            <button
              className="ijc"
              onClick={async () => {
                setLoading(true)
                setFlagOne(false)
                setflagtwo(true)
                const response = await fetch('http://localhost:2000/api/join', {
                  method: 'POST',
                  body: JSON.stringify({
                    code: code,
                  }),
                  credentials: 'include',
                  headers: { 'Content-Type': 'application/json' },
                })
                const data = await response.json()

                setDataIt(data)
                if (data['message'] === 'cnf') {
                  setFlagOne(true)
                  setLoading(false)
                } else {
                  setflagtwo(false)
                  setLoading(false)
                  setTimeout(() => {
                    setOpen(!open)
                  }, 2000)
                }
              }}
            >
              Join class
            </button>
            {flagOne && <p className="nf">Class not found</p>}
            {!flagOne && !flagtwo && <p className="f">Class found!</p>}
            {loading && <p>Loading...</p>}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Page
