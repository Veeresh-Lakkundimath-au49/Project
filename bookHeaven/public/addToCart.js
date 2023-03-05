let priceInfo= document.getElementById("price")
let total=0;

let clickEle=document.getElementById("click");
clickEle.addEventListener("click",()=>{
    console.log('clicked');
})


window.addEventListener("load", dispCartData);
  



async function dispCartData(){
    let cartData;
let data=await fetch('/dispCartData')
cartData=await data.json();

let cartEle=document.getElementById("cart");

if(cartData.cartInfo.length==0){
    cartEle.innerHTML=`<div>Oops!..Your Cart is empty.Please add your favourite Books to see them</div>`
}
else{


console.log(cartData.cartInfo);



for(let i=0;i<cartData.cartInfo.length;i++){
    cartEle.innerHTML+=`
    <div >
    <div class="image">
    <img src=${cartData.cartInfo[i].bookImage}
    </div>
    <div>
    <h5>
        ${cartData.cartInfo[i].BookName}
    </h5>
    </div>
    <div>
    <h5>
        ${cartData.cartInfo[i].Price}
    </h5>
    </div>
    <div>
    <button type="Submit" class="remove">Remove</button>
    </div>
    </div>
    
    `
    total+= Number(cartData.cartInfo[i].Price)
    priceInfo.innerText= total
    
}
}

let removeBtn=document.getElementsByClassName("remove");

// console.log(removeBtn);
let removeBtnData;
for(let i=0;i<removeBtn.length;i++){
    removeBtn[i].addEventListener('click',async (event)=>{
         removeBtnData=event.target.parentElement.parentElement;
         let imageData=document.getElementsByClassName("image")[i].firstChild.nextElementSibling.src
    
         event.target.parentElement.parentElement.remove()
        console.log(removeBtnData);
         let removeBtnDataArray=[];
         removeBtnDataArray=removeBtnData.innerText.split('\n')
         let finalData=removeBtnDataArray.filter((item)=>(item.length>4)).join('').split("    ")
            finalData.push(`${imageData}`)
         console.log(removeBtnData.innerText);
        console.log(removeBtnDataArray);
        console.log(finalData);
        total=total-finalData[4]
        location.reload();
            

         //removeBtnDataArray=removeBtnData.split("\n");
        // console.log(removeBtnDataArray);


         let result=await fetch('/removeCartData',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},

            body:JSON.stringify({
                "BookName":`${finalData[2]}`,
                "Price":`${finalData[4]}`,
                "image":`${finalData[6]}`
            })
         })
        
        console.log(await result.text());
    })
}

}




//dispCartData()



