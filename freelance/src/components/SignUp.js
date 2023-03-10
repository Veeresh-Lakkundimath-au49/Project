import React from 'react'
import { useState } from "react"
//import { useNavigate } from "react-router-dom"

export const SignUp = () => {
    let [name,setName]=useState("")
    let [email,setEmail]=useState("")
    let [password,setPass]=useState("")
    let [image,setImage]=useState("")
    let [user,setUser]=useState("")

   let handleSubmit=async (e)=>{
         e.preventDefault()
        console.log({name,email,password,image});



       let result= await fetch('http://localhost:8000/signup',{
            method:'POST',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
                
                // "mode": 'no-cors',
                // "withCredentials": true,    
                // "crossorigin": true,
                // "Access-Control-Allow-Origin": "http://localhost:8000"
            },
            body:JSON.stringify({"name":name,"email":email,"password":password,"image":image,"usertype":user})
        });

        // .then((res)=>{
        //     res.json()}).then((response)=>{
        //             console.log(response);
        //     });
        

        if(await result.json()){
            window.alert("Your account has been created successfully, navigate to LOGIN page to login")
        }
        else{
            window.alert("Oops...SignUP failed")
        }

        // const navigate=useNavigate();

        // navigate('/login',{ replace: true })

//         const navigate = useNavigate();

// navigate('/about', { replace: true });



        // setName("");
        // setEmail("");
        // setPass("");
        // setImage("");
    }
  return (
    <div>
    <div><h1>Please Enter your details to SIGNUP</h1></div>

    <form  encType="multipart/form-data">
    <div>
        <label for="name">Name</label>
        <input type="text" id="name" value={name} onChange={e=>{setName(e.target.value)}} />
    </div>

    <div>
        <label for="email">Email</label>
        <input type="email" id="email" value={email} onChange={e=>{setEmail(e.target.value)}} />
    </div>

    <div>
        <label for="password">Password</label>
        <input type="password" id="password" value={password} onChange={e=>{setPass(e.target.value)}} />
    </div>

    <div>
        <label for="image">Image</label>
        <input type="file" id="image" value={image} onChange={e=>{setImage(e.target.value)}} />
    </div>
    
    <div>
        <input type="radio" name="user" value="true" onChange={e=>{setUser(e.target.value)}}/>I am a Seller
        <input type="radio" name="user" value="false" onChange={e=>{setUser(e.target.value)}}/>I am a Buyer
    </div>
    <div>
    <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
    </form>



    </div>
  )
}

