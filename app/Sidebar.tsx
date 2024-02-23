"use client"

import React, { useState, useEffect } from 'react'
import "./sb.css"
import Image from 'next/image'
import logo from "./logo.png"
import Link from 'next/link'
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import { PiChalkboardTeacherBold } from "react-icons/pi";




function Sidebar() {
  const [data, setData] = useState([{"name": ""}])
  const [currentClass, setCurrentClass] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:2000/full/")
      const data2 = await response.json()
      setData(data2)
    }
    fetchData()
  })
  return (
    <div className="sb">
      <div className='heading'>
        <Image className="img" src={logo} alt={""}></Image>
        <p className='headp'>Quizzify Genius</p>
      </div> 
      <select value={currentClass} onChange={(e) => {
        setCurrentClass(e.target.value)
      }} className='selectClass'>
          {data.map((item) => {
            return(
              <option key={item.name} value={item.name}>{item.name}</option>
            )
          })}
      </select>
      <Link href="/" className='butts'> <div style={{marginRight: "5px", marginTop: "2px"}}>< IoIosSettings/> </div>  Profile</Link>
      <Link href="/quizzes" className='butts'> <div style={{marginRight: "5px", marginTop: "2px"}}>< CgNotes/> </div>  Quizzes</Link>
      <Link href="/people" className='butts'> <div style={{marginRight: "5px", marginTop: "2px"}}>< CgProfile/> </div>  People</Link>
      <Link href="/join" className='butts'> <div style={{marginRight: "5px", marginTop: "2px"}}><PiChalkboardTeacherBold /> </div>  Join Class</Link>

    </div>
  )
}

export default Sidebar
