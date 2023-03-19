import React from 'react'
import {useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Productdetail = () => {

    const { id } = useParams();
    let [itemInfo, setItem] = useState({})

    useEffect(() => {
        
        async function Id(){
            let result= await fetch(`https://dummyjson.com/products/${id}`)
            let data=await result.json()
            setItem(data)
            console.log("id received successfully!", id);
        }
        Id();
      
    }, [])
    


   
  return (
    
    <div className="Productdetail">
        
         <div key={itemInfo.id} className="prodDet">
         <h5 className="info">Product detail</h5>
           <div className="prodImage">
            <img src={itemInfo.thumbnail} width="75%" height="70%" />    
            </div>        
            <div className='productItem'>
            <h5 className="info">{itemInfo.title}</h5>
            <h6 className="info">Rs {itemInfo.price}</h6>
            <h6 className="info">Description</h6>
            <h6 className="info">{itemInfo.description}</h6>
            <Link to={`/cart/${itemInfo.id}`} >
            <button className="cart">Add to cart</button>
            </Link>
            </div>
            
            
        </div>
    
    </div>
  )
}

export default Productdetail