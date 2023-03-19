import React from 'react'
import {useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Searched = () => {

    const { searchItem } = useParams();
    const [searchInfo, setInfo] = useState([])

    useEffect(() => {
        async function sendSearch(){
            console.log("searchItem",searchItem);

            let result=await fetch("https://ecommerce-dkt3.onrender.com/searchedItem",{

            method:'POST',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({"Item":searchItem})

            });

            console.log("result line 30",result);
            let data=await result.json();
            console.log("data,line 32",data);
            setInfo([...data])
            console.log("searchInfo",searchInfo);

        }
        sendSearch()
    }, [])
    

  return (
    <div className="center">
    <div >Searched Items</div>
    <div className="row">{searchInfo.map((e)=>(
        <div className="column">
            <img src={e.image} width="75%" height="75%" />
        <h6 className="info">{e.title}</h6>
        <h6 className="info">Rs {e.price}</h6>
        <h6 className="info">Description: {e.description}</h6>
        <Link to={`/cart/${e.id}`} >
            <button className="cart">Add to cart</button>
            </Link>
        </div>
    ))}</div>
    </div>
  )
}

export default Searched