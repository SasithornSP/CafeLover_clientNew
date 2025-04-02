import { ChevronLeft } from "lucide-react";
import { useState } from 'react'
import { useNavigate } from 'react-router';
import CartCard from "../component/CartCard";
import useProductStore from "../stores/useProductStores";
// import OrderQueue from "../component/OrderQueue";

function ReceiptPage() {
  const carts = useProductStore((state)=>state.carts)
  const getTotalPrice = useProductStore((state)=>state.getTotalPrice)
    const DineIn=[{id:1,text:'Dine in'},{id:2,text:'Take away'}]
    const [isDineIn, setIsDineIn] = useState(1);
    const hdlClickDineIn = (id) => setIsDineIn(id);
    const navigate = useNavigate();

    return (
      <div className="pt-16 pb-16  px-12 space-y-4 ">
        {/* Detail */}
        <div className="flex items-center gap-4 mb-8">
          <div onClick={() => navigate("/payment")} className="cursor-pointer">
            <ChevronLeft />
          </div>
          <h1 className="flex-1 text-2xl mr-8 font-bold text-center ">Receipt</h1>
        </div>
  
        {/* คิว */}
        <h1 className="flex text-4xl font-bold justify-center items-center p-1">Order Queue</h1>
        {/* ที่อยู่ร้าน */}
          <div className="flex flex-col bg-gray-200 justify-center items-center rounded-2xl p-1.5">
        <h1 className="text-2xl font-semibold p-2">Cafe Lover</h1>
        <p className="p-2">เลขที่ 79 ถ.สุขุมวิท แขวงพระโขนง เขตคลองเตบ กรุงเทพฯ 10260 </p>

            {/* {DineIn.map((item)=>(
                  <button onClick={()=>hdlClickDineIn(item.id)} className={`py-1 px-3 rounded-lg cursor-pointer duration-150 ${isDineIn === item.id
                  ?"bg-primary-bg text-white w-full hover:shadow-md p-1.5"
                  : "bg-gray-200 text-black w-full hover:shadow-md p-1.5"}`} key={item.id}>{item.text}</button>))} */}
          {/* date */}
          <div className="flex justify-between p-2">

          </div>
          </div>
  
          <div className="flex justify-between p-2 border-t">
          <span>Item</span>
          <span>Qty</span>
          </div>
          <div className='p-2 bg-gray-100'>

        {/* Card */}  
        {carts.map((item,i)=>           
        <div key={item.id} className=' bg-white p-2 mb-2 rounded-md shadow-md'>
    {/* row1 */}
        <div className='flex justify-between mb-2 '> 
       
    {/* listitem */}
    <div className='flex '>
        <p className='text-xl font-bold '>{item.name}</p>
        <p className='text-sm'>ความหวาน {item.sweetnessLevel} </p>
        <p className='text-sm font-bold '>฿{item.price}</p>
    </div>

    {/* Qty */}
    <div className='flex flex-col justify-between '>
    <div className='flex justify-end'>{item.count}</div>
    </div>
        </div>
        </div>
        )}
        </div>


          {/* payment */}
          <div className='flex justify-between px-2  mt-4 mb-4 pb-2 border-b'>
            <span>Total</span>
            <span>฿ {getTotalPrice()}</span>
          </div>
          {/* Thank you */}
          <div className='flex flex-col items-center'>
              <button 
              onClick={() => navigate("/user/menu")}
              className='mt-4 w-8/12   h-10 rounded-xl p-2 bg-green-600 text-white hover:shadow-md hover:scale-105'>❤️ Thank You ❤️</button>
          </div>
  
      </div>
      
    );
  }
  

export default ReceiptPage