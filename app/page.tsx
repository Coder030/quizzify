'use client'

import Image from 'next/image'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import './style.css'
import Link from 'next/link'
import { ClassContext } from './context'

export default function Home() {
  const router = useRouter()
  const [currentName, setCurrentName] = useState('')
  const [currentId, setCurrentId] = useState('')
  // const [data, setData] = useState([{"name":"Loading...", "code":"", "class":"", "description":"", "madeById": "", "id":""}])
  const [data, setData] = useState([])
  const [flag, setFlag] = useState(false)
  const [loading, setLoading] = useState(true)
  const { className, setClassName } = useContext(ClassContext)
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
        router.push('/log')
        setFlag(true)
      }

      setData(data2)
    }
    setLoading(true)
    fetchData()
    setLoading(false)
  }, [data])

  return (
    <div className="di1v">
      <div className="headingering">
        <p style={{ fontSize: '20px', fontWeight: '500', textAlign: 'center' }}>
          Your classes
        </p>
        {!flag && (
          <button className="int">
            {currentName.slice(0, 2).toUpperCase()}
          </button>
        )}
        <p style={{ fontSize: '30px', fontWeight: '500', textAlign: 'center' }}>
          Username: {currentName}
        </p>
      </div>
      <br />
      <p style={{ color: 'grey' }}>Classes</p>
      <div className="cont">
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
      </div>
      {loading && <p className="loadonme">Loading...</p>}
      {flag && <p>Login...</p>}
      <Link href="/makeClass">
        <button className="mk">Make Class</button>
      </Link>
    </div>
  )
}
