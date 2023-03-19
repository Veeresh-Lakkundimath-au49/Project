import React from 'react'
import {useState} from "react"
import { Link } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";

export const Login = () => {
      
    let [email,setEmail]=useState("")
    let [password,setPass]=useState("")
    let [cond,setCond]=useState(false)


    async  function handleGoogleData(email){

        //e.preventDefault()
        console.log(email);



       let result= await fetch('https://ecommerce-dkt3.onrender.com/googlelogin',{
            method:'POST',
             credentials:'include',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                                },
            body:JSON.stringify({"email":email})
        });
         
        let status=await result.json();
        console.log(status);
        console.log(status.email);

        if(status=="1"){
            setCond(true)
            window.alert("You have LOGGED IN successfully, Click OK to explore")
            
        }
        else{
            setCond(false)
            window.alert("LOGIN failed")
        }


    }
    
    

   let handleSubmit=async (e)=>{
         e.preventDefault()
        console.log({email,password});



       let result= await fetch('https://ecommerce-dkt3.onrender.com/login',{
            method:'POST',
             credentials:'include',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify({"email":email,"password":password})
        });
        
        let status=await result.json();
        console.log(status);
        console.log(status.email);

        if(status=="1"){
            setCond(true)
            window.alert("You have LOGGED IN successfully, Click OK to explore")
            
        }
        else{
            setCond(false)
            window.alert("LOGIN failed")
        }
    

      
    }

  return (

    <div className='signup'>
    <div>
      {cond ? (
        <Link to="/home">
        <h6 className='info'>Click here to Explore</h6>
        </Link>
      ) : (
        <div></div>
      )}
    </div>

    <div><h1>Please fill your credentials to LOGIN</h1></div>

    <form  encType="application/x-www-form-urlencoded">

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
    <button type="submit" onClick={handleSubmit}>Login</button>
    </div>
    </form>
    <h6 className='info'>Do not have an account?</h6>
    <Link to="/">
    <h6 className='info'>Click here to SignUp</h6>
    </Link>
    
    <div>
      <LoginSocialGoogle
        client_id={"971574100664-bkplrofb0msrulko2pqecvrk77sl2kg0.apps.googleusercontent.com"}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ provider, data }) => {
          console.log(provider, data);
          console.log("data",data,"data.email",data.email);
          handleGoogleData(data.email)
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>
    </div>

    </div>
  )


}

 