let input = document.getElementById('search');
let searchBtnEle=document.getElementById("searchBtn")
let bookNameEle=document.getElementById("bookName")
let bookDetails=document.getElementsByClassName("books-container")
let cartBtnEle=document.getElementById("cartBtn")


cartBtnEle.addEventListener('click',async(req,res)=>{

    let result=await fetch('/dispCartData')
    console.log(await result.json())
    location.replace('/cart')
        

})
// let input = document.getElementById('search');
// let filter = input.value.toUpperCase();
// let list = document.getElementById("bookName");
// let data = list.getElementsByTagName('div');
// let data = list.getElementsByTagName('img');




// searchBtnEle.addEventListener('click', ()=>{
    
// let inputData = input.value.toUpperCase();
// let list = document.getElementById("bookName");
// let bookName = list.getElementsByTagName('div');
// let dispData
// console.log(bookName[0].innerText);
// console.log(bookName[0]);
// console.log(inputData);
// for(let i=0;i<bookName.length;i++){
//     if(bookName[i].innerText.toUpperCase().indexOf(inputData)>-1){
//          dispData=bookName[i];
//         dispData.style.display="";
//     }
//     else{
//         bookName[i].style.display="none"
//     }
// }
// })


searchBtnEle.addEventListener('click', ()=>{
find()
})

async function find(){
    let result=await fetch(`https://www.googleapis.com/books/v1/volumes?q=${input.value}`)
    let finalData=await result.json();
    let imageData;
    let page;
    // console.log(finalData);
    // console.log(finalData.items);
    // console.log(finalData.items[0].volumeInfo.imageLinks.smallThumbnail)
    bookNameEle.innerHTML=""
    for(let i=0;i<5;i++){
     bookNameEle.innerHTML+=`<div class="books-container"><div id="image"><img src="${finalData.items[i].volumeInfo.imageLinks.smallThumbnail}" height="200px" width="200px"><div><button type="Submit" class="addtoCart">Add to cart</button></div><P class="book-name" id="title">${finalData.items[i].volumeInfo.title}</P></div><div><h5>Author(s):${finalData.items[i].volumeInfo.authors}</h5></div><div><h5>Rating:${finalData.items[i].volumeInfo.averageRating
    }</h5></div><div><h5>Pages:${finalData.items[i].volumeInfo.pageCount}</h5></div><div><h5>Description:<h6>${finalData.items[i].volumeInfo.description}</h6></h5></div></div>`
    //bookNameEle.innerHTML=`<div><P>New Book</P></div>`
    // console.log(finalData.items[i].volumeInfo.imageLinks.smallThumbnail);
    // console.log(finalData.items[i].volumeInfo.title);
    // page=finalData.items[i].volumeInfo.pageCount
    }
   // console.log(bookDetails,bookDetails.innerText);
    let cartbtnEle=document.getElementsByClassName("addtoCart")
    // let info=document.getElementsByClassName("addtoCart").parentElement.nodeName;

   // console.log(cartbtnEle,cartbtnEle[0],cartbtnEle[1]);
    for(let i=0;i<cartbtnEle.length;i++){
        cartbtnEle[i].addEventListener('click',async(event)=>{
            let cartData=event.target.parentElement.parentElement.parentElement;
            let data=cartData.innerText
            console.log("event.target",event.target);
            console.log("event.target.parentElement",event.target.parentElement);
            console.log("event.target.parentElement.parentElement",event.target.parentElement.parentElement);
            console.log("event.target.parentElement.parentElement.parentElement",event.target.parentElement.parentElement.parentElement);
            imageData=document.getElementsByClassName("books-container")[i].firstChild.firstChild.src;

            // console.log(cartData.textContent);

            console.log("Image element",imageData);
           // console.log(data);
            let arr=[];
            arr=data.split("\n")
            // console.log(arr);
            // console.log(arr[2],arr[6]);
           // console.log(document.getElementById("image"));
            //console.log(typeof data);



            let result=await fetch('/getCartData',{
                method:"POST",
                 headers:{'Content-Type': 'application/json'},


               // headers:{"Accept": "plain/text"},
                body:JSON.stringify({
                    "bookName":`${arr[2]}`,
                    "Price":`${arr[6].split(":")[1]}`,
                    "image":`${imageData}`
                })
            })
            console.log("Response from /getCartData",await result.json());
        })
        
    }
}
