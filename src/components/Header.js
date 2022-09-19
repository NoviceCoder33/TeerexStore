import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

export default function Header({cartItems,open}) {
  return (
    <div className='header'>
        <Link style={{textDecoration:"none"}} to="/">
         <h3 className='shoplogo'>TeeRex Store</h3>
        </Link>
        
    <div className='header-right'>
        <Link style={{textDecoration:"none",color:"white"}} to="/">
         <h3 className='header-product'>Products</h3>
        </Link>

        <Link to="/Cart">
           {open?(
             <h3 className='header-product' style={{textDecoration:"none",color:"white"}}>
             Shopping Cart
             </h3>
            ):( 
                <span class="fa-stack fa-1x has-badge" 
                 data-count={cartItems.length}
                 >
                    <i class="fa-solid fa-cart-shopping"
                    style={{fontSize:"30px",color:"white"}}>      
                    </i>
                </span>
                
            )} 
        </Link>

        </div>

    </div>
  )
}
