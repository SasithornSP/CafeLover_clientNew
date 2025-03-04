import React, { useEffect, useState } from 'react'
import useUserStore from '../stores/userStores';
import useProductStore from "../stores/useProductStores";

function SearchCard() {
  const getProduct =useProductStore((state)=>state.getProduct);
  const products = useProductStore((state)=>state.products);
  const actionSearchProduct = useProductStore((state)=>state.actionSearchProduct)

  // const getCategory = useUserStore((state)=>state.getCategory)
  // const category = useUserStore((state)=>state.category)

  // console.log(category);
  // useEffect(()=>{
  //   getCategory()
  // },[])
  const [text,setText] = useState('')
  console.log(text);

  useEffect(()=>{
    const delay = setTimeout(()=>{
      actionSearchProduct({ query:text})
      if(!text){
        getProduct()
      }
    },800)
    return ()=>clearTimeout(delay)
  },[text])
  return (
    <div>
      <input type="text"  placeholder="Search"
      onChange={(e)=>setText(e.target.value)} />
    </div>
  )
}

export default SearchCard