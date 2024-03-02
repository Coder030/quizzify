'use client'

import React, { useContext, useEffect, useState } from 'react'
import { ClassContext } from '../context'
import './style.css'
import { CgShapeHalfCircle } from 'react-icons/cg'
import { MdDelete } from 'react-icons/md'

function Page() {
  const { className, setClassName } = useContext(ClassContext)
  const [creator, setCreator] = useState('')
  const [datatwo, setDatatwo] = useState('')
  const [data, setData] = useState({
    name: '',
    members: [''],
    message: '',
    username: '',
    madeById: '',
  })
  const [loading, setLoading] = useState(false)
  const [emp, setEmp] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:2000/api/people', {
        method: 'POST',
        body: JSON.stringify({ id: className }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      const dataTemp = await response.json()
      setData(dataTemp)
    }
    if (className !== '') {
      setLoading(true)
      fetchData()
      setLoading(false)
    }
    if (data['message'] === 'empty') {
    }
  }, [data, className])

  useEffect(() => {
    setData(data)
  }, [data, datatwo])
  useEffect(() => {
    async function fetchData() {
      console.log()
      const response100 = await fetch('http://localhost:2000/api/get_creator', {
        method: 'POST',
        body: JSON.stringify({ id: data['madeById'] }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      const data100 = await response100.json()
      setCreator(data100['username'])
    }
    if (!data) {
      console.log('hello')
      fetchData()
    }
  }, [data])

  return (
    <div>
      {className === '' && (
        <p className="none-selected">
          You have not selected any class from the sidebar...
        </p>
      )}
      {!loading &&
        data['message'] === 'empty' &&
        !(className === '') &&
        data && (
          <>
            <p className="ns">No student has joined your classes</p>
          </>
        )}
      {loading && <p>Loading...</p>}
      {!loading &&
        !(data['message'] === 'empty') &&
        !emp &&
        !(className === '') &&
        data && (
          <>
            <p className="inf">Class: {data['name']}</p>
            <p className="headingOf">Students</p>
            {data['members'].map((item) => {
              if (!loading && item) {
                return (
                  <>
                    <div id="stu" className="students">
                      <button className="initial">
                        {item && item['username'].slice(0, 2)}
                      </button>
                      <p className="nameTis">{item['username']}</p>
                      <button
                        className="delbooten"
                        onClick={async () => {
                          const stu = document.getElementById('stu')
                          stu.style.display = 'none'
                          await fetch(
                            `http://localhost:2000/api/${item['username']}`,
                            {
                              method: 'POST',
                              body: JSON.stringify({ id: className }),
                              credentials: 'include',
                              headers: { 'Content-Type': 'application/json' },
                            }
                          )
                          setDatatwo(`hello ${item['username']}`)
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </>
                )
              }
            })}
          </>
        )}
    </div>
  )
}

export default Page
