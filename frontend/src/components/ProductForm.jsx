import React, { useState, useEffect } from 'react'
import { productServices } from '../services/ProductService';
function ProductForm ()  {
    const[data,setData]=useState({
        name:"",
        price:0,
        quantity:0,
        category:""
    });

    async function handleClick(e){
        e.preventDefault();
        try {
    const response = await productServices.addProduct(data);
    
    console.log("Product added successfully:", response);
  } catch (error) {
    console.error("Failed to add product:", error);
  }
    }
  return (
    <div>
        <form onSubmit={handleClick}>

            <label>Name</label>
            <input type="text" value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}/> <br/>
            
            <label>Price</label>
            <input type="number" value={data.price} onChange={(e)=>setData({...data,price:e.target.value})}/> <br/>
            
            <label>Quantity</label>
            <input type="number"value={data.quantity} onChange={(e)=>setData({...data,quantity:e.target.value})}/> <br/>
            
            <label>Category</label>
            <input type="text" value={data.category} onChange={(e)=>setData({...data,category:e.target.value})}/> <br/>
            

            <button type ="submit">Submit</button>



        </form>
    </div>
  )
}

export default ProductForm