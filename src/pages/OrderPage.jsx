import { ChevronLeft } from "lucide-react";
import { useState } from 'react'
import { useNavigate } from 'react-router';
import CartCard from "../component/CartCard";
import useProductStore from "../stores/useProductStores";
import axios from "axios";
import  createUserOrder  from "../api/userOrderApi";
import useUserStore from "../stores/userStores";


function OrderPage() {
  // const actionRemoveProduct = useProductStore((state)=>state.actionRemoveProduct)
  const DineIn=[{id:1,text:'Dine in'},{id:2,text:'Take away'}]
  const [isDineIn, setIsDineIn] = useState(1);
  const hdlClickDineIn = (id) => setIsDineIn(id);
  const carts = useProductStore((state)=>state.carts)
  const token =useUserStore((state)=>state.token)
  const setCarts = useProductStore((state)=>state.setCarts)
  const navigate = useNavigate();

  const hdlSaveCart = async()=>{
  console.log(createUserOrder);
 try {
  const rs = await createUserOrder(token,carts)
  console.log(rs);
  console.log(carts);
  navigate(`/checkout/${rs.data.order.id}`)
  setCarts([])

 } catch (error) {
  console.log(error);
 }
}
// await createUserCart(token,{carts})
// try((res)=>{

//   console.log(res);
// })
// catch((err)=>{
//   console.log(err);
// })

  return (
    <div className="pt-16 pb-16  px-12 space-y-4 border-1">
      {/* Detail */}
      <div className="flex items-center gap-4 mb-8">
        <div onClick={() => navigate("/menu")} className="cursor-pointer">
          <ChevronLeft />
        </div>
        <h1 className="flex-1 text-2xl font-bold text-center ">Order</h1>
      </div>

      {/* กินไหนดี */}
        <div className="flex bg-gray-200 justify-center items-center rounded-2xl p-1.5">
            {DineIn.map((item)=>(
                <button onClick={()=>hdlClickDineIn(item.id)} className={`py-1 px-3 rounded-lg cursor-pointer duration-150 ${isDineIn === item.id
                ?"bg-primary-bg text-white w-full hover:shadow-md p-1.5"
                : "bg-gray-200 text-black w-full hover:shadow-md p-1.5"}`} key={item.id}>{item.text}</button>))}
        </div>

        <div className="flex justify-between p-2">
        <span>Item</span>
        <span>Qty</span>
        </div>

        {/* Product cart */}
        <div >
            <CartCard/>
        </div>
        
        {/* Payment Summary */}
        <div className='flex flex-col '>
            {/* payment */}
            <div>
                {/* Pay by QR */}
            </div>
  
            <div className="flex gap-4">
              <button 
              onClick={() => navigate("/menu")}
              // onClick={()=>actionRemoveProduct(item.id)}
              className='mt-4 w-80 h-10 rounded-xl p-2 bg-red-600 text-white hover:shadow-md '>Cancel</button>

            <button
            onClick={hdlSaveCart}
            className='mt-4 w-full h-10 rounded-xl p-2 bg-green-600 text-white hover:shadow-md '>Order</button>
            </div>
        </div>

    </div>
    
  );
}

export default OrderPage;
