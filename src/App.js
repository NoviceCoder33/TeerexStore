import './App.css';
import React,{useState} from 'react';
import {Routes, Route } from "react-router-dom";
import Products from "./components/Products.js";
import Cart from "./components/Cart.js";

 export const config={
  Endpoint:" https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json ",
 };

function App() {
  const [cartItems, setCartItems]=useState([]);

  const handleAddtoCart=(Product)=>{
  const productExists= cartItems.find((item)=>item.id === Product.id);
  // console.log(productExists);
  if(Product.quantity!==0){
    if(productExists){
      alert("Product already exists in the cart,Please check shopping cart!")
    }else{
      setCartItems([...cartItems,{...Product, cartQuantity:1}]);
    }
  }else{
    alert("Sorry,Product is out of stock at the moment!")
  }
  };

const handleAdd=(Product)=>{
  const productExists= cartItems.find((item)=>item.id === Product.id);
  if(productExists && productExists.cartQuantity <= Product.quantity){
    setCartItems(
      cartItems.map((item)=>item.id === Product.id?{
        ...productExists, cartQuantity: productExists.cartQuantity+1 }:item)
    );
  }
}  
const handleReduce = (Product) => {
  const ProductExists = cartItems.find((item) => item.id === Product.id);
  if (ProductExists.cartQuantity === 1) {
    setCartItems(cartItems.filter((item) => item.id !== Product.id));
  } else {
    setCartItems(
      cartItems.map((item) =>
        item.id === Product.id
          ? { ...ProductExists, cartQuantity: ProductExists.cartQuantity - 1 }
          : item
      )
    );
  }
};

const handleDelete = (Product) => {
  setCartItems(cartItems.filter((item) => item.id !== Product.id));
};

  return (
    <>
    <div className='App'>
     <Routes>
         <Route exact path="/" element={<Products
          cartItems={cartItems}
          handleAddtoCart={handleAddtoCart}
         />}/>
         <Route exact path="/Cart" element={<Cart
         cartItems={cartItems}
         handleAdd={handleAdd}
         handleReduce={handleReduce}
         handleDelete={handleDelete}
         />}/> 
     </Routes>
   </div>
   </>
  );
}
export default App;
