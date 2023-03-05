let loginbtn = document.querySelector('.login')
loginbtn.addEventListener('click',login)


function login(){
    location.replace('/login')
} 


let signupbtn = document.querySelector('.signup')
signupbtn.addEventListener('click',signup)



function signup(){
    location.replace('/signup')
} 