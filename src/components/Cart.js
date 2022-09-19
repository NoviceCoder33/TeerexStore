import React from 'react';
import Header from './Header';
import "./Cart.css";

export default function Cart({cartItems,handleAdd, handleReduce,handleDelete}) {
  const getTotalAmount=(cartItems)=>{
  if(!cartItems.length) return 0;
  const total = cartItems
              .map((item)=>item.price * item.cartQuantity)
              .reduce((sum,n)=> sum+n);
         return total;     
  };
  const totalPrice= getTotalAmount(cartItems);

  return (
    <div className='cart'>
        <Header cartItems={cartItems} open/>
        <div className="cart-container">
        <h4 className='cart-heading'>Shopping Cart</h4>
          {cartItems.length?(
            <div className="cart-main">
            <div className="cart-left">
            {cartItems.map((product)=>(
              <div className="cart-item" key={product.id}>
                <div className="cart-image">
                  <img src={product.imageURL} alt={product.name} />
                </div>
                <div className="cart-details">
                  <p style={{fontWeight:"bold", fontSize:"large"}}>{product.name}</p>
                  <p style={{fontWeight:"500",fontSize:"medium"}}>₹{product.price}</p>
                </div>
                <button className='count-btn'
                onClick={(e)=>handleReduce(product)}>-</button>
                <div className='cart-num'>{product.cartQuantity}</div>
                <button className='count-btn'
                onClick={(e)=>handleAdd(product)}>+</button>
                <i class="fa-solid fa-trash"
                onClick={(e)=>handleDelete(product)}
                style={{fontSize:"300", color:"darkred"}}></i>
              </div>  
            ))}
            </div>
            <div className="cart-right">
              <h5 className='total-heading'>Total Amount: ₹{totalPrice}</h5>
              <button className='pay-btn'>Proceed to Pay</button>
            </div>
            </div>
  
          ):(
            <div className="no-product">
              No Products are added to Cart,Please add Products and try again! <i class="fa-solid fa-face-smile"></i>
            </div>
          )
          }
          
        </div>
        </div>
  )
}