 
//let submitBtnEle=document.getElementById("submitBtn")
//submitBtnEle.addEventListener('click',async ()=>{
  let profileCall=async()=>{   
    let result=await fetch('/profileData')
    let receivedData=await result.json()
    let profile=document.getElementById("prof")
    let name=document.getElementById("name")
    let email=document.getElementById("email")
    profile.innerHTML=`<div><img src="${receivedData.image}" id="profPic"/></div>`
name.innerText=`${receivedData.name}`
email.innerText=`${receivedData.email}`
}
profileCall()



// let {user}=require('../Controllers/authControllers');
//     
//     console.log("data printed from profileScipt.js",user)
//     
   