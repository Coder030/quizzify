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
import { RiArrowDropDownLine } from 'react-icons/ri'
import { usePathname } from 'next/navigation'

function Sidebar() {
  const currentPath = usePathname()
  const [data, setData] = useState([{ name: '', madeById: '', id: '' }])
  const [data10, setData10] = useState([])
  const { className, setClassName } = useContext(ClassContext)
  const [currentId, setCurrentId] = useState('')
  const [flag, setFlag] = useState(false)
  const [val, setVal] = useState('')
  const isActive = (path) => {
    return path === currentPath
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:2000/api/full/', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      const response2 = await fetch('http://localhost:2000/api/me/', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      const response3 = await fetch('http://localhost:2000/api/class_member', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      const data4 = await response3.json()
      setData10(data4)
      const data3 = await response2.json()

      setCurrentId(data3['message']['id'])

      const data2 = await response.json()
      if (data2['message'] === 'nvt') {
        setFlag(true)
      }
      setData(data2)

      // Set className here initially if data is available
      if (data2.length > 0 && currentId) {
        data2.map((item) => {
          if (currentId === item.madeById) {
            setClassName(item.id)
            return
          }
        })
      }
    }
    fetchData()
  }, [])

  const handleClassChange = (e) => {
    setClassName(e.target.value)
  }

  return (
    <div className="sb">
      <div className="heading">
        <Image className="img" src={logo} alt={''}></Image>
        <p className="headp">Quizzify Genius</p>
      </div>
      <button className="das">
        <RiArrowDropDownLine />
      </button>
      <select
        onChange={handleClassChange}
        className="selectClass"
        value={className}
      >
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
        {data10.map((item) => {
          return (
            <option key={item.name} value={item.id}>
              {item.name}
            </option>
          )
        })}
        {flag && <option disabled>Login first</option>}
      </select>
      <IoIosSettings className="i1" />

      <Link href="/" className={isActive('/') ? 'active1' : 'butts1'}>
        <div className="tf">Profile</div>
      </Link>
      <IoChatbubbleEllipsesOutline className="i2" />

      <Link href="/chat" className={isActive('/chat') ? 'active1' : 'butts1'}>
        <div className="tf">Chat</div>
      </Link>
      <CgProfile className="i3" />

      <Link
        href="/people"
        className={isActive('/people') ? 'active1' : 'butts1'}
      >
        <div className="tf">People</div>
      </Link>
      <PiChalkboardTeacherBold className="i4" />

      <Link href="/join" className={isActive('/join') ? 'active1' : 'butts1'}>
        <div className="tf">Join Class</div>
      </Link>
    </div>
  )
}

export default Sidebar
