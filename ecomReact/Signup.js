import React from 'react'
import { useState } from "react"
import { Link } from "react-router-dom";

export const SignUp = () => {
    let [name,setName]=useState("")
    let [email,setEmail]=useState("")
    let [password,setPass]=useState("")

    //   };

   let handleSubmit=async (e)=>{
         e.preventDefault()
      
        console.log({name,email,password});

       let result= await fetch('https://ecommerce-dkt3.onrender.com/signup',{
            method:'POST',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({"name":name,"email":email,"password":password})
        });
        
        console.log(await result.json());
        if(await result.json()){
            window.alert("Your account has been created successfully, navigate to LOGIN page to login")
        }
        else{
            window.alert("Oops...SignUP failed")
        }

    }
  return (
    <div className='signup'>
    <div><h1>Please Enter your details to SIGNUP</h1></div>

    <form  encType="application/x-www-form-urlencoded">
    <div>
        <div>
        <label for="name">Name</label>
        </div>
        <input type="text" id="name" value={name} onChange={e=>{setName(e.target.value)}} />
    </div>

    <div>
        <div>
        <label for="email">Email</label>
        </div>
        <input type="email" id="email" value={email} onChange={e=>{setEmail(e.target.value)}} />
    </div>

    <div>
        <div>
        <label for="password">Password</label>
        </div>
        <input type="password" id="password" value={password} onChange={e=>{setPass(e.target.value)}} />
    </div>
    <div>
    <button type="submit" onClick={handleSubmit}>SignUp</button>
    </div>
    </form>

    <h5>Already have an account</h5>
    <Link to="/login">
    <h6>Click here to login</h6>
    </Link>

    </div>
  )
}

