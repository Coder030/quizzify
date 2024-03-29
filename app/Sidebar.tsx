'use client'

import React, { useState, useEffect, useContext } from 'react'
import './sb.css'
import Image from 'next/image'
import logo from './logo.png'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'
import { IoIosSettings } from 'react-icons/io'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import { PiChalkboardTeacherBold } from 'react-icons/pi'
import { ClassContext } from './context'

function Sidebar() {
  const [data, setData] = useState([{ name: '', madeById: '', id: '' }])
  const { className, setClassName } = useContext(ClassContext)
  const [currentId, setCurrentId] = useState('')
  const [flag, setFlag] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://classroom-backend-u7q5.onrender.com/api/full/',
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      )
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

      const data2 = await response.json()
      if (data2['message'] === 'nvt') {
        setFlag(true)
      }
      setData(data2)
    }
    fetchData()
  }, [])
  useEffect(() => {
    setClassName(className)
  }, [className, setClassName])
  return (
    <div className="sb">
      <div className="heading">
        <Image className="img" src={logo} alt={''}></Image>
        <p className="headp">Quizzify Genius</p>
      </div>
      <select
        onChange={(e) => {
          setClassName(e.target.value)
        }}
        className="selectClass"
      >
        <option></option>
        {!flag &&
          data.map((item) => {
            if (currentId === item.madeById) {
              return (
                <option key={item.name} value={item.id}>
                  {item.name}
                </option>
              )
            }
          })}
        {flag && <p>Login first</p>}
      </select>
      <Link href="/" className="butts">
        {' '}
        <div style={{ marginRight: '5px', marginTop: '2px' }}>
          <IoIosSettings />{' '}
        </div>{' '}
        Profile
      </Link>
      <Link href="/chat" className="butts">
        {' '}
        <div style={{ marginRight: '5px', marginTop: '2px' }}>
          <IoChatbubbleEllipsesOutline />{' '}
        </div>{' '}
        Chat
      </Link>
      <Link href="/people" className="butts">
        {' '}
        <div style={{ marginRight: '5px', marginTop: '2px' }}>
          <CgProfile />{' '}
        </div>{' '}
        People
      </Link>
      <Link href="/join" className="butts">
        {' '}
        <div style={{ marginRight: '5px', marginTop: '2px' }}>
          <PiChalkboardTeacherBold />{' '}
        </div>{' '}
        Join Class
      </Link>
    </div>
  )
}

export default Sidebar
