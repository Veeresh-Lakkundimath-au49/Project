

const loginBtn=document.getElementById("login")
loginBtn.addEventListener('click',loginCall)
const signupBtn=document.getElementById("signup")
signupBtn.addEventListener('click',signupCall)
function loginCall(){
 
    // const result=await fetch('/signup',{
    //     method:'GET',
    //     headers:{'Accept':'html'}
    // })
    location.replace('/login')
    // const finalRes= result.
    console.log(result)     
    // console.log(finalRes);
}
function signupCall(){
    location.replace('/signup')
}
