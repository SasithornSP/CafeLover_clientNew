import React from 'react'
// import useUserStore from '../stores/userStores'
import useProductStore from "../stores/useProductStores";
function CartCard() {
const carts = useProductStore((state)=>state.carts)
const actionRemoveProduct = useProductStore((state)=>state.actionRemoveProduct)
const getTotalPrice = useProductStore((state)=>state.getTotalPrice)


console.log(carts);
  return (
    <div>
        {/* <h1 className='text-2xl font-bold'>ตะกร้าสินค้า</h1> */}
        {/* border */}
        <div className='p-2 bg-gray-100'>

            {/* Card */}
            {carts.map((item,i)=>
           
            <div key={item.id} className=' bg-white p-2 mb-2 rounded-md shadow-md'>
                {/* row1 */}
            <div className='flex justify-between mb-2 '> 
                {/* image */}
                <div className='flex gap-4 items-center '>
            
                    <img src={item.image} className='w-16 h-16 bg-gray-600 rounded-md'/>
                   
                {/* listitem */}
                <div className='flex  bg-gray-100 '>
                    <div>
                    <p className='text-xl font-bold '>{item.name}</p>
                    <p className='text-sm'>ความหวาน {item.sweetnessLevel} </p>
                    <p className='text-sm font-bold '>฿{item.price}</p>
                    </div>
                </div>
                </div>

                {/* Qty */}
                <div className='flex flex-col justify-between '>
                <div className='flex justify-end'>{item.count}</div>
                <div className='flex gap-2'>
                    <button 
                    onClick={() => navigate("/detail/:name")}
                    className='bg-amber-600 rounded-xl px-2
                     text-white text-sm hover:shadow-md  hover:scale-105'>Edit</button>
                    <button 
                    onClick={()=>actionRemoveProduct(item.id)}
                    className='bg-red-600 rounded-xl px-2 
                     text-white text-sm hover:shadow-md hover:scale-105'>Delete</button>
                </div>
                </div>
            </div>
            </div>
            )}
        </div>
    
        {/* Total */}
        <div className='flex justify-between px-2  mt-4 mb-4 pb-2 border-b'>
            <span>Total</span>
            <span>฿ {getTotalPrice()}</span>
        </div>

    </div>
  )
}

export default CartCard