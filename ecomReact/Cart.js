import React from 'react'
import { useEffect,useState } from 'react';
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";

const Cart = () => {
    const { id } = useParams();
    let [cartInfo, setCart] = useState({})
    let [dispCart, setfinalCart] = useState([])
    let [total,setTotal]=useState([])

    useEffect(() => {

            async function cart(){
                let result= await fetch(`https://dummyjson.com/products/${id}`)
                let data=await result.json()
                setCart(data)
                console.log("Cart component,id received successfully!", id);

            let cartData= await fetch("https://ecommerce-dkt3.onrender.com/detail",{

            method:'POST',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({"id":data.id,"title":data.title,"price":data.price,"description":data.description,"thumbnail":data.thumbnail})
        });

        let finalCart=await cartData.json()
        console.log("finalCart line 49",finalCart);

        setfinalCart(finalCart)
        console.log(dispCart)


        let finalPrice=await fetch("https://ecommerce-dkt3.onrender.com/price")
        let dispPrice=await finalPrice.json();
        setTotal(dispPrice)           
        }
        cart();

    }, [])

    
    

  


  return (
    <div className="center">
        <div className="row">{dispCart.map((item)=>(
            <div className="column">
            <img src={item.thumbnail} width="75%" height="75%"/>
            <h5 className="info">{item.title}</h5>
            <h5 className="info">Rs {item.price}</h5>
            </div>
        ))}</div>

        <div>           
            <div>
                <h4>Total: Rs {total}</h4>
            </div>
            <Link to="/checkout">
            <h4>Checkout</h4> 
            </Link>
        </div>

    </div>
  )
}

export default Cart