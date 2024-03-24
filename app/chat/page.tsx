'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import './style.css'
import { ClassContext } from '../context'
import { GrSend } from 'react-icons/gr'
import { io } from 'socket.io-client'
import { animateScroll as scroll } from 'react-scroll'

function Page() {
  const scrollToBottom = () => {
    // Scroll to the bottom of the element.
    document.body.scrollTop = document.body.scrollHeight
  }
  const { className, setClassName, chatName, setChatName } =
    useContext(ClassContext)
  const [socket, setSocket] = useState(null)
  const [classId, setClassId] = useState('')
  const [online, setOnline] = useState([])
  const [text, setText] = useState('')
  const [mname, setMname] = useState('')
  const [data2, setData2] = useState([])
  const [data10, setData10] = useState([])
  const [initialMess, setInitialMess] = useState([])
  const [currentId, setCurrentId] = useState('')
  const [currentName, setCurrentName] = useState('')
  const socketRef = useRef(null)

  const convert = async (id) => {
    const rep = await fetch(
      'https://classroom-backend-u7q5.onrender.com/api/convert',
      {
        method: 'POST',
        body: JSON.stringify({ id: id }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    const name = await rep.json()
    return name
  }

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('https://classroom-backend-u7q5.onrender.com/chat')
      const socket = socketRef.current
      setSocket(socket)
    }
  }, [])
  const handleClick = async (e) => {
    e.preventDefault()
    if (chatName && text) {
      setText('')
      socket.emit('cm', text, currentName, currentId, classId)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://classroom-backend-u7q5.onrender.com/api/full/',
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const data = await response.json()
      const response2 = await fetch(
        'https://classroom-backend-u7q5.onrender.com/api/me/',
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const data3 = await response2.json()
      const response3 = await fetch(
        'https://classroom-backend-u7q5.onrender.com/api/class_member',
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const data4 = await response3.json()
      setData10(data4)
      setCurrentId(data3['message']['id'])
      setCurrentName(data3['message']['username'])
      setData2(data)
    }
    fetchData()
  }, [])
  useEffect(() => {
    if (socket && currentName && mname) {
      socket.emit('set-name', currentName, mname)
      socket.on('find_online', (data) => {
        setOnline(data)
      })
    }
  }, [online, mname, socket, currentName])

  useEffect(() => {
    async function fetchy() {
      const pinp = document.getElementById('imp')
      const response10 = await fetch(
        'https://classroom-backend-u7q5.onrender.com/api/people',
        {
          method: 'POST',
          body: JSON.stringify({ id: chatName }),
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      )

      if (!response10.ok) {
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
  }, [chatName])
  useEffect(() => {
    const f = async () => {
      const rep = await fetch(
        'https://classroom-backend-u7q5.onrender.com/api/full_message',
        {
          method: 'POST',
          body: JSON.stringify({ id: chatName }),
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const data = await rep.json()
      setInitialMess(data)
    }
    if (!(mname === '')) {
      f()
    }
  }, [mname, chatName])
  useEffect(() => {
    if (socket && currentId) {
      const messages = document.getElementById('yay')
      socket.on('mm', (text, cn, ci, ci2) => {
        const item1 = document.createElement('p')
        item1.textContent = text
        item1.className = 'ps1'
        const item2 = document.createElement('p')
        item2.textContent = `by ${ci === currentId ? 'You' : cn}`
        item2.className = 'ps2'
        const main = document.createElement('div')
        main.classList.add(ci === currentId ? 'me' : 'other')
        messages.appendChild(main)
        main.appendChild(item1)
        main.appendChild(item2)
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth', // Optionally, you can add smooth scrolling behavior
        })
      })
    }
  }, [socket, currentId])

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
      <div className="messagesContainer" id="yay">
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
        <div className="inputContainer">
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
        </div>
      </form>
      <br />
      <br />
      <br />
      <br />
      {chatName && (
        <div className="container2">
          <p className="on">Online</p>
          {online.map((item) => {
            return (
              <div key={item} className="ons">
                <button className="initial2">{item['name'].slice(0, 1)}</button>
                <p style={{ margin: 0 }}>{item['name']}</p>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Page
