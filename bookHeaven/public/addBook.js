let addBtnEle=document.getElementById("button");
let bodyEle=document.getElementById("body");

addBtnEle.addEventListener('click',formCall)

function formCall(){

    bodyEle.innerHTML=`
    
    <div>

    <form method="post" action="addBook" enctype="multipart/form-data">
            
    <div class="input">

        <label for="name" >Name of the Book</label>
        <input type="text" id="name" name="name" required = "required">
        
    </div>

    <div class="input">

        <label for="genre" >Genre</label>
        <input type="text" id="name" name="genre" required = "required">
        
    </div>


    <div class="input">

        <label for="Authortext" >Author</label>
        <input type="text" id="Authortext" name="author" >
       
    </div>


    <div class="input">


        <label for="price" >Price of the Book</label>
        <input type="number" id="price" name="price" >
       
    </div>

    <div class="input">

        <label for="text" >Description</label>
       
        <textarea type="text" id="text" name="description" rows="4" cols="50"></textarea>
    </div>

    <div class="input">

        <label for="image" >Upload image of your Book</label>
        <input type="file" class="custom-file-input" name="image" id="image">
    </div>

    <div>


    </div>

    <button type="submit">
        Submit
    </button>


</form>

    </div>

    `

   

}

addBtnEle.addEventListener('click',formCall)

