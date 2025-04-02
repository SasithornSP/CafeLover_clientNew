import { Plus, PlusSquare } from 'lucide-react'
import React from 'react'
// import useUserStore from '../stores/userStores'

function CardMenu({item,hdlClickSelect}) {
  
  return (
    <div onClick={()=>hdlClickSelect(item)} className='w-full cursor-pointer flex flex-col gap-4  border-gray-400 p-2 rounded-2xl hover:shadow-2xl'>
       <div className='aspect-square rounded-xl overflow-hidden'>
        <img className='w-full h-full object-cover  hover:scale-110 duration-300' src={item.image} alt={item.name}/>
       </div>   

       <div>
        <h1 className='font-bold text-2xl'>{item.name}</h1>
        <p className='text-sm text-gray-500'>{item.description}</p>
       </div>

    <div className='flex justify-between items-center '>
       <span className='font-bold text-2xl'>฿{item.price}</span>
       <div className='bg-primary-bg w-10 h-10 flex justify-center items-center rounded-xl text-white'><Plus/></div>
    </div>

    </div>
  )
}

export default CardMenu