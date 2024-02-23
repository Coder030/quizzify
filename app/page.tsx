"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import "./style.css"
import Link from "next/link";

export default function Home() {
  const [currentName, setCurrentName] = useState("Kartik Garg")
  const [data, setData] = useState([{"name":"Loading...", "code":"", "class":"", "description":""}])
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:2000/full/")
      const data2 = await response.json()
      setData(data2)
    }
    fetchData()
  })
  return (
  <div className="di1v">
    <p style={{fontSize: "20px", fontWeight: "500", textAlign: "center"}}>Profile</p>
    <p style={{fontSize: "30px", fontWeight: "500", textAlign: "center"}}>Name: {currentName}</p>
    <p style={{color: "grey"}}>Classes</p>
    {data.map((item) => {
      return(
        <>
          <div className="line"/>
          <div className="classes" key={item.name}>
            <p className="name">{item.name}</p>
            <p className="code">Class code: {item.code}</p>
            <div className="tisclass">
              <p className="class">Class {item.class}</p>
            </div>
            <p className="des">Description of class:</p>
            {item.description}
          </div>
        </>
      )
    })}
    <Link href="/makeClass"><button className="mk">Make Class</button></Link>
  </div>
  );

}
