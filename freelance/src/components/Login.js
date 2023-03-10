import React from 'react'
import {useState} from "react"

export const Login = () => {
  
    
    let [email,setEmail]=useState("")
    let [password,setPass]=useState("")
    

   let handleSubmit=async (e)=>{
         e.preventDefault()
        console.log({email,password});



       let result= await fetch('http://localhost:8000/login',{
            method:'POST',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"

             
            },
            body:JSON.stringify({"email":email,"password":password})
        });

     
        

        let status=await result.json();
        console.log(status);

        if(status=="1"){
            window.alert("You have LOGGED IN successfully, navigate to GIG page to explore")
        }
        else{
            window.alert("LOGIN failed")
        }

    }
  return (
    <div>
    <div><h1>Please fill your credentials to LOGIN</h1></div>

    <form  >

    <div>
        <label for="email">Email</label>
        <input type="email" id="email" value={email} onChange={e=>{setEmail(e.target.value)}} />
    </div>

    <div>
        <label for="password">Password</label>
        <input type="password" id="password" value={password} onChange={e=>{setPass(e.target.value)}} />
    </div>



    <div>
    <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
    </form>
    </div>
  )


}

 