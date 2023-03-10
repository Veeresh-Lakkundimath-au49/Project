import React from 'react'

export const Logout = () => {

        const logoutHandler= async ()=>{
            let result=await fetch('http://localhost:8000/logout', {
              method: 'GET',
              headers: {
                "Accept": "application/json",
      
              },
            
      
      
            })
            let status=await result.json()
            if(status =='1'){
                window.alert("LOGGED OUT successfully!!")
            }
            else{
                window.alert("LOG OUT failed")
            }
        }

  return (
    <div><button onClick={logoutHandler}>LOGOUT</button></div>
  )
}

 