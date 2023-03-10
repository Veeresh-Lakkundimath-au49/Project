import React, { useEffect } from 'react'
import { Logout } from './Logout'
import { useState } from 'react'


export const Gig = () => {

  const [info, setinfo] = useState([])

  useEffect(() => {
    async function gig() {
      const gigData = await fetch('http://localhost:8000/gig', {
        method: 'GET',
        headers: {
          "Accept": "application/json",
        },
      });
      if (gigData.status === 401) {
        window.alert("Please login");
        window.location.href = '/login'; // Redirect to login page
        return;
      }

  
      let finalData = await gigData.json();
  
      setinfo(finalData);
    }
  
    gig();
  }, []);








  return (

    <div >
      <div className='logout'>
        <Logout />

      </div>


      <h1>All Services</h1>


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


