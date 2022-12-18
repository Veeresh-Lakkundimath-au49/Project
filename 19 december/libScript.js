let input = document.getElementById('search');
let searchBtnEle=document.getElementById("searchBtn")
// let input = document.getElementById('search');
// let filter = input.value.toUpperCase();
// let list = document.getElementById("bookName");
// let data = list.getElementsByTagName('div');
// let data = list.getElementsByTagName('img');
searchBtnEle.addEventListener('click', ()=>{
    
let inputData = input.value.toUpperCase();
let list = document.getElementById("bookName");
let bookName = list.getElementsByTagName('div');
let dispData
console.log(bookName[0].innerText);
console.log(bookName[0]);
console.log(inputData);
for(let i=0;i<bookName.length;i++){
    if(bookName[i].innerText.toUpperCase().indexOf(inputData)>-1){
         dispData=bookName[i];
        dispData.style.display="";
    }
    else{
        bookName[i].style.display="none"
    }
}
})

