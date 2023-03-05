let profile=document.getElementById("book")



//let btnEle=document.getElementById("btn")



window.addEventListener("load", editBook());

async function editBook(){

  btnEle.addEventListener("click",()=>{
    console.log("clicked");
  })

  let bookData=await fetch('/myBooks');
let result=await bookData.json()

console.log(result);



}
