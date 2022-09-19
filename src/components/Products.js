import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import "./Products.css";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import { config } from "../App"; 

export default function Products( {cartItems,handleAddtoCart}) {
 const [productList, setProductList]= useState([]);
 const [filterProducts,setFilterProducts]=useState([]);
 const [searchInput,setSearchInput]= useState("");
 const searchParam=["name","color","gender","type"];
 const [isOpen, setIsopen] = useState(false);

const performAPICall=async()=>{
  try {
    const response = await axios.get(`${config.Endpoint}`);
    setProductList(response.data);
  } catch (error) {
    alert(error.message) ;
  }
 };
  
 const handleSearch=(filterProducts,searchParam,searchInput)=>{
    const searched = searchInput.toLowerCase();
    if(searched.length){
    let filteredProducts = filterProducts.filter((product)=>
     searchParam.some((param)=>
     product[param].toLowerCase().includes(searched)
     )
    );
   setFilterProducts(filteredProducts);
}else{
    setFilterProducts(productList);
}
 }

 const ToggleList = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };


 useEffect(()=>{
  performAPICall()
 },[]);

 useEffect(()=>{
 setFilterProducts([...productList])
 },[productList]);

    return (
        <div className="product-container">
        <Header   cartItems={cartItems} />
        <div className="searchbar">
            <input type="text" placeholder="Search Products..." className="search-input"
            onChange={(e)=>setSearchInput(e.target.value)}/>
            <button className="search-btn"
            onClick={(e)=>handleSearch(filterProducts,searchParam,searchInput)}>
            <i class="fa fa-search" style={{fontSize:"20px",color:"white"}}></i>
            </button>
          
           <div className="filter-toggle">     
          <button className="filter-btn" 
           onClick={ToggleList}>
          <i class="fa fa-filter" style={{fontSize:"20px",color:"white"}}></i>
          </button>
          <Filter
           productList={productList}
           setFilterProducts={setFilterProducts}
           filterProducts={filterProducts}
           searchInput={searchInput}
           isOpen={isOpen}
           toggle
           ToggleBar={ToggleList}
           />
          </div>  
        </div>

        <div className="products-content">
            <div className="filter-container">
            <Filter
            productList={productList}
            setFilterProducts={setFilterProducts}
            filterProducts={filterProducts}
            searchInput={searchInput}
            />
            </div>
            <div className="product-card-container">
            <ProductCard
            filterProducts={filterProducts}
            handleAddtoCart={handleAddtoCart}
            />
           </div>
        </div>

        </div>
    )
}
