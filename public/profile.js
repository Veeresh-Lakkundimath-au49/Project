let {user}=require('../Controllers/authControllers');
let profile=document.getElementById("prof")
profile.innerHTML=`<img src="${user.image}" id="profPic"/>`
let btn = document.getElementById('library')
btn.addEventListener('click',()=>{
    console.log('one');
})