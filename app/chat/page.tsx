'use client'

import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import { ClassContext } from '../context'
import { GrSend } from 'react-icons/gr'
import { io } from 'socket.io-client'

function Page() {
  const { className, setClassName, chatName, setChatName } =
    useContext(ClassContext)
  const [socket, setSocket] = useState(null)
  const [classId, setClassId] = useState('')
  const [text, setText] = useState('')
  const [mname, setMname] = useState('')
  const [data2, setData2] = useState([])
  const [data10, setData10] = useState([])
  const [initialMess, setInitialMess] = useState([])
  const [currentId, setCurrentId] = useState('')
  const [currentName, setCurrentName] = useState('')

  const convert = async (id) => {
    const rep = await fetch('http://localhost:2000/api/convert', {
      method: 'POST',
      body: JSON.stringify({ id: id }),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    const name = await rep.json()
    return name
  }
  // const messages = document.getElementsByClassName('messagesContainer')
  // socket.on('cm', (msg) => {
  //   // const item = document.createElement("li");
  //   // item.textContent = msg;
  //   // messages.appendChild(item);
  //   // window.scrollTo(0, document.body.scrollHeight);
  //   console.log(msg)
  // })

  useEffect(() => {
    const socket = io('http://localhost:2000/chat')
    setSocket(socket)
  }, [])
  // useEffect(() => {
  //   //disconnect socket when the component unmounts
  //   if (!socket) return
  //   return () => {
  //     console.log('disconnecting socket')
  //     socket.disconnect()
  //   }
  // }, [])
  // useEffect(() => {
  //   socket.on('mm', (text, cn, ci, ci2) => {
  //     console.log(text, cn, ci, ci2)
  //   })
  // }, [socket])
  const handleClick = async (e) => {
    e.preventDefault()
    if (chatName) {
      console.log(text)
      setText('')
      // await fetch('http://localhost:2000/api/create_mess', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     text: text,
      //     made: currentName,
      //     mbi: currentId,
      //     ci: classId,
      //   }),
      //   credentials: 'include',
      //   headers: { 'Content-Type': 'application/json' },
      // })
      socket.emit('cm', text, currentName, currentId, classId)
      console.log(socket.emit('cm', text, currentName, currentId, classId))
    }
  }

  // useEffect(() => {
  //   socket.on('cm', (msg) => {
  //     console.log(msg)

  //     const messages = document.getElementById('mess')
  //     const item = document.createElement('p')
  //     item.textContent = msg
  //     messages.appendChild(item)
  //     window.scrollTo(0, document.body.scrollHeight)
  //   })
  // }, [socket])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:2000/api/full/', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      const response2 = await fetch('http://localhost:2000/api/me/', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      const data3 = await response2.json()
      const response3 = await fetch('http://localhost:2000/api/class_member', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      const data4 = await response3.json()
      setData10(data4)
      setCurrentId(data3['message']['id'])
      setCurrentName(data3['message']['username'])
      setData2(data)
    }
    fetchData()
  }, [data2, currentId, data10])

  useEffect(() => {
    async function fetchy() {
      const pinp = document.getElementById('imp')
      const response10 = await fetch('http://localhost:2000/api/people', {
        method: 'POST',
        body: JSON.stringify({ id: chatName }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response10.ok) {
        // Handle the error, for example:
        console.error('Error during POST request:', response10.statusText)
      } else {
        const dataTemp = await response10.json()
        setMname(dataTemp['name'])
        setClassId(dataTemp['id'])
      }
    }
    if (chatName) {
      fetchy()
    }
  })
  useEffect(() => {
    const f = async () => {
      const rep = await fetch('http://localhost:2000/api/full_message', {
        method: 'POST',
        body: JSON.stringify({ id: chatName }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await rep.json()
      setInitialMess(data)

      // setInitialMess(data)
      // console.log(initialMess)
    }
    if (!(mname === '')) {
      f()
    }
  }, [mname, chatName])

  return (
    <>
      <h1 className="headha">Chat</h1>
      <select
        id="imp"
        className="inp"
        onChange={(e) => {
          setChatName(e.target.value)
        }}
      >
        <option value=""> </option>
        {data2.map((item) => {
          if (item.madeById === currentId) {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            )
          }
        })}
        {data10.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          )
        })}
      </select>
      {!chatName && <p className="ns">No class selected...</p>}
      {chatName && <p className="ns2">{mname}</p>}
      <div className="messagesContainer">
        {initialMess.map((item) => (
          <div
            key={item.id}
            className={item.madeById === currentId ? 'me' : 'other'}
          >
            <p className="ps1">{item.text}</p>
            <p className="ps2">
              by {item.madeById === currentId ? 'You' : item.made}
            </p>
          </div>
        ))}
      </div>
      <form className="stickyFooter" onSubmit={handleClick}>
        <input
          autoComplete="off"
          className="mainbruh"
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
        />
        <button type="submit" className="bootySend">
          <GrSend />
        </button>
      </form>
    </>
  )
}

export default Page
