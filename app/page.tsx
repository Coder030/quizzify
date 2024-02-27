'use client'

import Image from 'next/image'
import { useEffect, useState, useContext } from 'react'
import './style.css'
import Link from 'next/link'
import { ClassContext } from './context'

export default function Home() {
  const [currentName, setCurrentName] = useState('')
  const [currentId, setCurrentId] = useState('')
  // const [data, setData] = useState([{"name":"Loading...", "code":"", "class":"", "description":"", "madeById": "", "id":""}])
  const [data, setData] = useState([])
  const [flag, setFlag] = useState(false)
  const [loading, setLoading] = useState(true)
  const { currentClass, setCurrentClass } = useContext(ClassContext)

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
      const data2 = await response.json()
      const data3 = await response2.json()
      setCurrentId(data3['message']['id'])
      setCurrentName(data3['message']['username'])
      if (data2['message'] === 'nvt') {
        setFlag(true)
      }

      setData(data2)
    }
    setLoading(true)
    fetchData()
    setLoading(false)
  }, [data])
  useEffect(() => {
    console.log(currentClass)
  }, [currentClass])
  return (
    <div className="di1v">
      <p style={{ fontSize: '20px', fontWeight: '500', textAlign: 'center' }}>
        Your classes
      </p>
      <p style={{ fontSize: '30px', fontWeight: '500', textAlign: 'center' }}>
        Username: {currentName}
      </p>
      <br />
      <p style={{ color: 'grey' }}>Classes</p>
      {!loading &&
        !flag &&
        data.map((item) => {
          if (item.madeById === currentId) {
            return (
              <>
                <div className="classes" key={item.name}>
                  <p className="name">{item.name}</p>
                  <p className="code">Class code: {item.code}</p>
                  <div className="tisclass">
                    <p className="class">Sections - {item.class}</p>
                  </div>
                  <button
                    className="delete"
                    onClick={async () => {
                      const response = await fetch(
                        `http://localhost:2000/api/${item.id}`,
                        {
                          method: 'DELETE',
                          credentials: 'include',
                          headers: { 'Content-Type': 'application/json' },
                        }
                      )
                    }}
                  >
                    Delete this class?
                  </button>
                </div>
              </>
            )
          }
        })}
      {loading && <p className="loadonme">Loading...</p>}
      {flag && <p>Login...</p>}
      <Link href="/makeClass">
        <button className="mk">Make Class</button>
      </Link>
    </div>
  )
}
