import React, { useEffect } from 'react'
import { Logout } from './Logout'
import { useState } from 'react'

export const MyGig = () => {

  const [info, setinfo] = useState([])

  useEffect(() => {

    async function gig() {

      const gigData = await fetch('http://localhost:8000/MyGig', {
        method: 'GET',
        headers: {
          "Accept": "application/json",

          // "mode": 'no-cors',
          // "withCredentials": true,    
          // "crossorigin": true,
          // "Access-Control-Allow-Origin": "http://localhost:8000"
        },
        // body:null


      });

      let finalData = await gigData.json()

      setinfo(finalData)
      console.log(info);
    }

    gig()

  }, [])








  return (

    <div >
      <div className='logout'>
        <Logout />

      </div>


      <h1>MY GIG</h1>


      <div>{info.map((item) => (

        <div className='card'>
          <h4>{item.gigInfo[0].gigName}</h4>
          <h3>{item.gigInfo[0].description}</h3>
          <h3>Rs.{item.gigInfo[0].price}</h3>


        </div>


      ))}</div>

    </div>
  )
}


