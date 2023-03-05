 
//let submitBtnEle=document.getElementById("submitBtn")
//submitBtnEle.addEventListener('click',async ()=>{


    let profileCall=async()=>{   
        let result=await fetch('/profileData')
        console.log("result from line 8 in rofile.js",result)
        let receivedData=await result.json()
        let profile=document.getElementById("profile")
        let name=document.getElementById("name")
        let email=document.getElementById("email")
        let number = document.getElementById("number")
        profile.innerHTML=`<img src="${receivedData.image}"/>`
    name.innerText=`${receivedData.name}`
    email.innerText=`${receivedData.email}`
    number.innerHTML=`${receivedData.number}`
    }

    window.addEventListener("load", profileCall);
    
    
    
    let librarybtn = document.querySelector('#library')
    librarybtn.addEventListener('click',library)
    
    
    function library(){
        location.replace('/library')
    } 

//     let signupbtn = document.querySelector('.signup')
// signupbtn.addEventListener('click',signup)


// function signup(){
//     location.replace('/signup')
// } 
       let logoutbtn = document.querySelector('.logout')
       logoutbtn.addEventListener('click',logout)
       
function logout(){
location.replace('/logout')
}