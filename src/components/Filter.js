import React,{useEffect, useState} from 'react';
import"./Filter.css";


export default function Filter({
    productList,
    setFilterProducts,
    filterProducts,
    searchInput,
    isOpen,
    toggle,
    ToggleBar
 }) {

const colorList=[...new Set(productList.map((product)=>product.color))];
const typeList=[...new Set(productList.map((product)=>product.type))];
const genderList=[...new Set(productList.map((product)=>product.gender))];
const priceList=["Rs0-Rs250","Rs251-Rs450","Rs451-Rs600"];

const filterAttributes=[
    {label:"color",value:colorList},
    {label:"type",value:typeList},
    {label:"gender",value:genderList},
    {label:"price",value:priceList},
];

const [checked,setChecked]= useState([]);

const [filterList, setFilterlist] = useState({
    color: [],
    gender: [],
    type: [],
    price: [],
  });

const priceRange=(productPrice,listPrice)=>{
 const range=listPrice.map((item)=>{
    return(
        item
        .replace(/Rs/g,"")
        .split("-")
        .map((num)=>{
         return Number(num);
        })
    );
 })
 return range.map((num)=>productPrice>=num[0] && productPrice<=num[1]);
};

const updateFilteredProductsList=(filterList)=>{
 let {color,gender,type,price} = filterList;
 let finalFilterProducts=[];

 if(searchInput.length){
 if(
    color.length===0 &&
    gender.length===0 &&
    type.length===0 &&
    price.length===0
    ){
        finalFilterProducts=[...productList];
    }else{
        finalFilterProducts= filterProducts.filter((product)=>{
        return(
            (color.length===0 ||color.includes(product.color) )&&
            (gender.length===0 || gender.includes(product.gender) )&&
            (type.length===0 || type.includes(product.type) )&&
            (price.length===0 || priceRange(product.price,price).includes(true) )
            );
        });
    }
    setFilterProducts(finalFilterProducts);
 }else{  
 if(color.length===0 &&
    gender.length===0 &&
    type.length===0 &&
    price.length===0){
        finalFilterProducts=[...productList];
    }else{
        finalFilterProducts= productList.filter((product)=>{
        return(
            (color.length===0 ||color.includes(product.color) )&&
            (gender.length===0 || gender.includes(product.gender) )&&
            (type.length===0 || type.includes(product.type) )&&
            (price.length===0 || priceRange(product.price,price).includes(true) )
            );
        });
    }
    setFilterProducts(finalFilterProducts);

 }
};  

//to update if same value checked and unchecked 
const checkSelectedFilter=(filterValue, label)=>{
    // console.log("filter",filterList, label);
    const existingFilter = filterList[label].indexOf(filterValue);
 
 if(existingFilter=== -1){
    setFilterlist((prevList)=>({...prevList,[label]:[...prevList[label], filterValue]}));
 }else{
    setFilterlist((prevList)=>({...prevList,[label]:[...prevList[label].filter((item)=>(item!==filterValue))]}));
 }
};

const handleCheckbox=(filterValue, label)=>{
 const newIndex=checked.indexOf(filterValue);
 const newChecked=[...checked];
 if(newIndex === -1){
    newChecked.push(filterValue);
 }else{
    newChecked.splice(newIndex,1);
 }
 setChecked(newChecked);

 checkSelectedFilter(filterValue, label);
};
 
useEffect(()=>{
 updateFilteredProductsList(filterList);
}, [filterList]);

if(toggle){
return(
 <div className={`toggle ${isOpen=== true?"active":""}`}>
  <i class="fa fa-times" aria-hidden="true"
  style={{display:"flex",flexDirection:"row-reverse",color:"#FF9F1C"}}
  onClick={ToggleBar}>
  </i>

    {filterAttributes.map((filterItems, index)=>(
        <div key={index}>
         <h6 className='filter-title'>
            {filterItems.label.toUpperCase()}
         </h6>
         <div className='filter-options'>
          {filterItems.value.map((item,index)=>
                <label key={index} >
                 <input type="checkbox" 
                 checked={checked.indexOf(item)=== -1?false: true} 
                 onChange={(e)=>handleCheckbox(item,filterItems.label)}/>
                 {item}
                </label>
           )}
           </div>
        </div>
        ))}
  </div>
);
}

  return (
    <div className='filter'>
        {filterAttributes.map((filterItems, index)=>(
        <div key={index}>
         <h6 className='filter-title'>
            {filterItems.label.toUpperCase()}
        </h6>
        <div className='filter-options'>
          {filterItems.value.map((item,index)=>
                <label key={index}>
                 <input type="checkbox" 
                 checked={checked.indexOf(item)=== -1?false: true}
                 onChange={(e)=>handleCheckbox(item,filterItems.label)}/>
                 {item}
                </label>
          
           )}
           </div>
        </div>
        ))}

    </div>
  )
}
