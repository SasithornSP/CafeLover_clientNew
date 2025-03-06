import { ChevronLeft, Link, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Sweetness } from "../component/Sweetness";
import useUserStore from "../stores/userStores";
import useProductStore from "../stores/useProductStores";
// import Login from "../component/auth/Login";

function DetailPage() {
  const data = JSON.parse(localStorage.getItem("detailMenu"));
  const [dataMenu, setDataMenu] = useState(data);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const [isSweetness, setIsSweetness] = useState("100%");
  const [detailProduct, setDetailProduct] = useState({});
  const [count, setCount] = useState(1);

  const actionAddtoCart = useProductStore((state) => state.actionAddtoCart);
  const cart = useProductStore((state) => state.carts);
  const setCarts = useProductStore((state) => state.setCarts);

  const hdlClickSweetness = (item) => {
    setIsSweetness(item.text);
  };

  const hdlClickCount = (num) => {
    setCount((prevCount) => Math.max(prevCount + num, 1));
  };

  const hdlClickAddToCart = () => {
    navigate("/OrderCart");
    if (cart.length > 0) {
      const sameItemIndex = cart.findIndex(
        (item) =>
          item.productId === dataMenu.id && item.sweetnessLevel === isSweetness
      );

      if (sameItemIndex !== -1) {
        cart[sameItemIndex].count++;
        setCarts([...cart]);
        return;
      }
    }

    const item = {
      sweetnessLevel: isSweetness,
      ...detailProduct,
      count,
      ...dataMenu,
      productId: dataMenu.id,
      id: Date.now(),
    };

    actionAddtoCart(item);
  };

  return (
    <div className="pt-16 px-12 space-y-4">
      {/* Detail */}
      <div className="flex items-center gap-4 mb-8">
        <div onClick={() => navigate("/menu")} className="cursor-pointer">
          <ChevronLeft />
        </div>
        <h1 className="flex-1 text-2xl text-center">Detail</h1>
      </div>
      {/* img */}
      <div className="w-full h-70 rounded-xl overflow-hidden">
        <img
          className="w-full h-full object-cover hover:scale-110 duration-200"
          src={dataMenu.image}
          alt={dataMenu.name}
        />
      </div>
      {/* nameCoffee ,description  */}
      <div>
        <h1 className="font-bold text-2xl border-b">{dataMenu.name}</h1>
        <p className="text-sm text-gray-500">{dataMenu.description}</p>
      </div>
      {/* Sweetness */}
      <div>
        <h2>Sweetness Level</h2>
        <p className="text-sm text-gray-500">Please Select 1 option</p>
        <div className="gap-2 flex">
          {Sweetness.map((item) => (
            <button
              onClick={() => hdlClickSweetness(item)}
              className={`py-1 px-3 rounded-lg cursor-pointer duration-150 ${
                isSweetness === item.text
                  ? "bg-primary-bg text-white hover:shadow-md hover:scale-105"
                  : "bg-gray-300 text-black hover:shadow-md hover:scale-105"
              }`}
              key={item.id}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
      {/* Additional Request */}
      <div>
        <h2 className="pb-2">Additional Request</h2>
        <textarea
          onChange={(e) =>
            setDetailProduct({ ...detailProduct, addition: e.target.value })
          }
          className="textarea"
          placeholder="E.g No veggies"
        ></textarea>
      </div>
      {/* Add to basket */}
      <div className="flex pb-6 gap-4">
        <div className="flex text-xl gap-2">
          {/* add */}
          <div
            className="bg-gray-200 w-8 h-8 rounded-full flex justify-center items-center"
            onClick={() => hdlClickCount(-1)}
          >
            <Minus size={16} />
          </div>
          <div className="font-bold text-2xl">{count}</div>
          <div
            className="bg-gray-200 w-8 h-8 rounded-full flex justify-center items-center"
            onClick={() => hdlClickCount(1)}
          >
            <Plus size={16} />
          </div>
        </div>
        {/* Add to basket button */}
        {user ? (
          <button
            className="flex justify-between w-full h-10 rounded-xl p-2 bg-primary-bg text-white hover:shadow-md hover:scale-105"
            onClick={hdlClickAddToCart}
          >
            <span>Add to basket</span>
            <span>฿ {(dataMenu.price * count).toLocaleString()}</span>
          </button>
        ) : (
          <button
            className="flex justify-between w-full h-10 rounded-xl p-2 bg-primary-bg text-white hover:shadow-md hover:scale-105"
            onClick={() => navigate("/Login")}
          >
            Log in to add items
          </button>
        )}
      </div>
    </div>
  );
}


// function DetailPage() {
//   const data = JSON.parse(localStorage.getItem("detailMenu"));
//   const [dataMenu, setDataMenu] = useState(data);
//   const user = useUserStore((state) => state.user);
//   const navigate = useNavigate();

//   // const [active, setActive] = useState(0);
//   // const hdlClickHotOrIce = (id) => setActive(id);
//   const [isSweetness, setIsSweetness] = useState("100%");
//   const [detailProduct, setDetailProduct] = useState({});

//   const hdlClickSweetness = (item) => {
//     setIsSweetness(item.text);
//   };

//   // Add toCart
//   const actionAddtoCart = useProductStore((state) => state.actionAddtoCart);
//   // updateCountQty
//   const actionUpdateQuantity = useProductStore(
//     (state) => state.actionUpdateQuantity
//   );

//   const cart = useProductStore((state) => state.carts);

//   // Set carts function
//   const { setCarts } = useProductStore();

//   console.log(cart);

//   //   console.log("Date menu:", dataMenu);
//   const [count, setCount] = useState(1);
//   const hdlClickCount = (num) => {
//     // actionUpdateQuantity(item.id,item.count-1)
//     if (count === 1 && num === -1) {
//       return;
//     } else {
//       setCount((prev) => prev + num);
//     }
//   };

//   const hdlClickAddToCart = () => {
//     // console.log(detailProduct);
//     // console.log(dataMenu);
//     // console.log(count);
//     // const item ={
//     //     ...detailProduct,
//     //     count,
//     //     ...dataMenu,
//     // }
//     navigate("/OrderCart");
//     if (cart.length > 0) {
//       const sameItemIndx = cart.findIndex(
//         (item) =>
//           item.productId === dataMenu.id && item.sweetnessLevel === isSweetness
//       );

//       if (sameItemIndx !== -1) {
//         console.log("Same sweetness index: ", sameItemIndx);
//         cart[sameItemIndx].count++;
//         setCarts([...cart]);
//         return;
//       }
//     }

//     console.log("sweet", isSweetness);
//     console.log("detail", detailProduct);
//     console.log("datamenu", dataMenu);
//     const item = {
//       sweetnessLevel: isSweetness,
//       ...detailProduct,
//       count,
//       ...dataMenu,
//       productId: dataMenu.id,
//     };
//     (item.id = Date.now()), actionAddtoCart(item);
//     // onClick={() => navigate(-1)}
//     // const cart =JSON.parse(localStorage.getItem("cart")) || [];
//     // const newCart =[...cart,{...dataMenu,count}];
//     // localStorage.setItem("cart",JSON.stringify(newCart));

//     // const cartlocal =JSON.parse(localStorage.getItem("cart"))
//     // console.log("cartlocal");
//   };

//   return (
//     <div className="pt-16 px-12 space-y-4 ">
//       {/* Detail */}
//       <div className="flex items-center gap-4 mb-8">
//         <div onClick={() => navigate("/menu")} className="cursor-pointer">
//           <ChevronLeft />
//         </div>
//         <h1 className="flex-1 text-2xl text-center ">Detail</h1>
//       </div>
//       {/* img */}
//       <div className="w-full h-70 rounded-xl overflow-hidden">
//         <img
//           className="w-full h-full object-cover hover:scale-110 duration-200"
//           src={dataMenu.image}
//           alt={dataMenu.name}
//         />
//       </div>
//       {/* nameCoffee ,description  */}
//       <div>
//         <h1 className="font-bold text-2xl border-b">{dataMenu.name}</h1>
//         <p className="text-sm text-gray-500">{dataMenu.description}</p>
//       </div>
//       {/* hot/ice */}
//       {/* <div>
//             <h2>HOT or ICE</h2>
//             <p className='text-sm text-gray-500'>Plases Select 1 option</p>
//         <div className="gap-2 flex">
//           {HotOrIceForm.map((item)=>(
//             <button onClick={()=>hdlClickHotOrIce(item.id)} className={`py-1 px-3 rounded-lg cursor-pointer duration-150 ${active === item.id
//             ?"bg-primary-bg text-white hover:shadow-md hover:scale-105"
//             : "bg-gray-300 text-black hover:shadow-md hover:scale-105"}`} key={item.id}>{item.text}</button>))}
//         </div>
//         </div> */}

//       {/* Sweetness */}
//       <div>
//         <h2>Sweetness Level</h2>
//         <p className="text-sm text-gray-500">Plases Select 1 option</p>
//         <div className="gap-2 flex">
//           {Sweetness.map((item) => (
//             <button
//               onClick={() => hdlClickSweetness(item)}
//               className={`py-1 px-3 rounded-lg cursor-pointer duration-150 ${
//                 isSweetness === item.text
//                   ? "bg-primary-bg text-white hover:shadow-md hover:scale-105"
//                   : "bg-gray-300 text-black hover:shadow-md hover:scale-105"
//               }`}
//               key={item.id}
//             >
//               {item.text}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Addditionmore */}
//       <div>
//         <h2 className="pb-2">Additional Request</h2>
//         <textarea
//           onChange={(e) =>
//             setDetailProduct({ ...detailProduct, addition: e.target.value })
//           }
//           className="textarea"
//           placeholder="E.g No veggies"
//         ></textarea>
//       </div>
 
//       {/* add to ... */}
//       <div className="flex  pb-6 gap-4">
//         <div className="flex text-xl gap-2">
//           {/* add */}
//           <div
//             className=" bg-gray-200 w-8 h-8  rounded-full flex justify-center  items-center "
//             onClick={() => hdlClickCount(-1)}
//           >
//             <Minus size={16} />
//           </div>
//           <div className="font-bold text-2xl">{count}</div>
//           <div
//             className=" bg-gray-200 w-8 h-8  rounded-full flex justify-center  items-center "
//             onClick={() => hdlClickCount(1)}
//           >
//             <Plus size={16} />
//           </div>
//         </div>
//         {/* add to basket*/}
//         {user ? (
         
//             <button
//               className="flex justify-between w-full h-10 rounded-xl p-2 bg-primary-bg text-white hover:shadow-md hover:scale-105"
//               onClick={() => hdlClickAddToCart()}
//             >
//               <span>Add basket</span>
//               <span>฿ {(dataMenu.price * count).toLocaleString()}</span>
//             </button>
         
//         ) : (
          
//             <button
//               className="flex justify-between w-full h-10 rounded-xl p-2 bg-primary-bg text-white hover:shadow-md hover:scale-105"
//               onClick={() => navigate(<Login/>)}
//             ></button>
         
//         )}
//       </div>
//     </div>
//   );
// }

export default DetailPage;
