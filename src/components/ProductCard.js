import React from 'react';
import "./ProductCard.css";

export default function ProductCard({filterProducts,handleAddtoCart}) {
  return (
    <>
      {filterProducts.length?(
        filterProducts.map((Product)=>(
         <div class="card" id='card-container' key={Product.id}>
          <div class="card bg-white text-dark" id='card-head'>
            <h5 class="card-title">{Product.name}</h5>
            <img 
            src={Product.imageURL} alt={Product.name} />
           </div>

           <div class="card-body">
           <p class="card-text">Rs.{Product.price}</p>
           <button className="btn" id='card-btn' 
           onClick={()=>handleAddtoCart(Product)}>Add to Cart
           </button>
          </div>
        </div>))):(
          <h3 style={{color:'lightgray' ,fontWeight:"400",justifyContent:"center"}}>
           Opps! No Products Found <i class="fa-solid fa-face-frown-slight"></i>
          </h3>
        )}

      </>
  )
}
