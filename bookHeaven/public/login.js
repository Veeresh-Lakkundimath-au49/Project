const spanElement = document.querySelector('.singup-link');
const passEle=document.getElementById("pass")

spanElement.addEventListener('click', ()=> {
    location.replace('/signup');
});

passEle.addEventListener("click",async()=>{

   let result= await fetch('/password')

})