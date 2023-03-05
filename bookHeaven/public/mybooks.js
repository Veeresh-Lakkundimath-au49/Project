let books=document.getElementById("books")
let btnEle=document.getElementById("btn")

async function booksCall(){
    let result=await fetch('/myBooks');
    let data=await result.json()
   // let data=await result.json();
    console.log(data[0].bookInfo.length);
    console.log(data[0].bookInfo);
    console.log(data[0].bookInfo[0]);
    console.log(data[0].bookInfo[0].name);
    books.innerHTML=`<div><h1>Hello</h1></div>`
for(let i=0;i<data[0].bookInfo.length;i++){
    books.innerHTML+=`
    
    <div>
    <img src=${data[0].bookInfo[i].image} width="250" 
    height="250"/>
    <h4>${data[0].bookInfo[i].name}</h4>
    <h4>${data[0].bookInfo[i].author}</h4>
    <h4>${data[0].bookInfo[i].genre}</h4>
    <h4>${data[0].bookInfo[i].description}</h4>
    <h4>Rs ${data[0].bookInfo[i].price}</h4>
    
    <div >
    <button type="Submit" class="edit">Edit</button>
    </div>

    <div>
    <button type="Submit" class="del">Delete</button>
    </div>
    
    </div>
    `
}

//console.log(data,"line 37");
let editBtn=document.getElementsByClassName("edit")
let delBtn=document.getElementsByClassName("del")
let editBtnData;
//console.log(editBtn[0].parentElement.parentElement.innerText);

for(let i=0;i<editBtn.length;i++){
    editBtn[i].addEventListener('click', async (event)=>{
        editBtnData=editBtn[i].parentElement.parentElement.innerText

        console.log(data[0].bookInfo[i].name);
        console.log(data[0].bookInfo[i].author);
        console.log(data[0].bookInfo[i].price);

        

        console.log(typeof editBtnData);
        
        editBtn[i].parentElement.parentElement.innerHTML+=`
        <div>
        
        <form enctype="multipart/form-data">
                <h2>Edit your Book</h2>
                <div class="input">

                    <input type="text" id="bookName" name="name" required = "required" value="${data[0].bookInfo[i].name}">
                    <span>Book Name</span>
                </div>

                <div class="input">

                    <input type="text" id="author" name="author" required = "required" value="${data[0].bookInfo[i].author}">
                    <span>Author</span>
                
                </div>

            <div class="input">

                <label for="text" >Description</label>
                <textarea type="text" id="description" name="description" rows="20" cols="50" >${data[0].bookInfo[i].description}</textarea>
           
            </div>

            
            <div class="input">

                <label for="price" >Price of the Book</label>
                <input type="text" id="price" name="price" value="${data[0].bookInfo[i].price}">
            
            </div>

                

                <div class="input">

                    <input type="file" id="file" name="image">
                </div>

                <div>
                <button id="subBtn">Submit</button>
                </div>

            </form>


        </div>
        
        `

        console.log(data[0].bookInfo[i].description);

        let subBtnEle=document.getElementById("subBtn");

        subBtnEle.addEventListener("click",async(event)=>{

           // event.preventDefault();

            let bookName=document.getElementById("bookName").value;
            let author=document.getElementById("author").value;
  
           let file=document.getElementById("file").value;
 
            console.log(data[0].bookInfo[i].name);
            //let condition=data[0].bookInfo[i].name
           // console.log(condition);
            console.log(bookName,author);

             await fetch('/editBookInfo',{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    "bookName":bookName,
                    "author":author,
                    // "price":price,
                    // "description":description,
                    "condition":condition
                })
            })

           





        })

       // editBtnData=event.target.parentElement.parentElement;
        //editBtn[0].parentElement.parentElement.innerText
    })
}


//console.log(delBtn.event.target.value);




    //let data=await result.json();
    //console.log(data[0])

    console.log("booksCall function");
    btnEle.addEventListener("click",()=>{
        console.log("Button Clicked");
    })
}



window.addEventListener("load", booksCall());