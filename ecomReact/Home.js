import React from 'react'
import {useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.min.js';

const Home = () => {

  let [products, setProd] = useState([])
  let [search,setSearch]=useState('')
  //useEffect
  useEffect(() => {

    async function Prod(){

      let result=await fetch('https://dummyjson.com/products')
      console.log("line 16,result",result)
      let data=await result.json()
       console.log("data line 18",data)
       setProd([...data.products])
       console.log("result",result)
       console.log("data",data)
       console.log("setProd",products)
  
    }

    Prod();

  }, []);

  async function logout(e){
    let logRes= await fetch("https://ecommerce-dkt3.onrender.com/logout")
    let result=await logRes.json()
    if(result=="1"){
      window.alert("Logout successful!")

    }
    else if(result == "0"){
      window.alert("Logout failed..")
    }
  }
       
  return (
    <div className="center">
      <div>
        <a href="#" onClick={(e)=>logout(e)} ><h6>Logout</h6></a>
      </div>

        <h5>Welcome to E-commerce.com</h5>
        <div className='search'>
        <input  placeholder="Search products" onChange={(e)=>setSearch(e.target.value)}/>
        <Link to={`/search/${search}`} >
        <button>Search</button>
        </Link >
        </div>
        <div className="row">
          {products.map((item)=>(
          <div key={item.id} className="column">
           <img src={item.thumbnail} width="75%" height="75%"></img>
           <Link to={`/product/${item.id}`}>
          <h5 className="info">{item.title}</h5>
          </Link>
          <h5 className="info">Rs {item.price}</h5>
          </div>
        ))}
        </div>
        
    </div>
  )
}

export default Home;