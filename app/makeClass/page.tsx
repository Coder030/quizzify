"use client"

import React, { useState } from 'react'
import "./style.css"
import { redirect } from 'next/navigation';

function Page() {
  const [name, setName] = useState("");
  const [sec, setSec] = useState("");
  const [des, setDes] = useState("");
  const generateRandom = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 6) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  const handleClick = async () => {
    const code = generateRandom()
    console.log(name, code, sec, des);
    const ob1 = {
      item: {
        "name":name,
        "code": code,
        "class":sec,
        "description": des
      }
    }
    console.log(ob1);
    
    const response = await fetch("http://localhost:2000/class", {
      method: "POST",
      body: JSON.stringify(ob1),
      headers: {'Content-Type': 'application/json'},
    })
    redirect("/")
  }
  return (
    <div className='div'>
      <p className='headingbro'>Make Class</p>
      <p className='cnL'>Class name: </p>
      <input value={name} onChange={(e) => {
        setName(e.target.value)
      }} className='cnI' type="text" />
      <p className='csL'>Class section: </p>
      <input value={sec} onChange={(e) => {
        setSec(e.target.value)
      }}  className='csI' type="text" />
      <p className='dL'>Description: </p>
      <textarea value={des} onChange={(e) => {
        setDes(e.target.value)
      }}  className='dI' />
      <button onClick={handleClick} className='booten'>Make class</button>
    </div>
  )
}

export default Page
