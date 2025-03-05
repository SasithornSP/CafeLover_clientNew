
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import authApi from "../api/authApi";
import { listCategory} from "../api/categoryApi";
import { listProducts, searchProduct } from "../api/productApi";


const useProductStore = create(persist((set,get)=>({
    category:[],
    products:[],
    carts:[],
    

    getCategory: async()=>{
        try {
            const rs =await listCategory()
                set({category:rs.data})
            
        } catch (error) {
            console.log(error);
        }
    },
    getProduct: async ()=>{
        try {
            const rs = await listProducts()
            set({products:rs.data})
        } catch (error) {
            console.log(error);
        }
    },
    actionSearchProduct: async (arg)=>{

        console.log(arg);
        try {
            const rs = await searchProduct(arg)
            set({products:rs.data})
        } catch (error) {
            console.log(error);
        }
    },
    setCarts : (newCarts) => set({carts: newCarts}),
    actionAddtoCart: (item)=>{
             set((state)=>({carts:[...state.carts,item],count:1}))
            console.log(item);
           
    },
    actionUpdateQuantity: async (productId,newQuantity)=>{
        //   const updateCart =[...carts,{...products,count:1}]
           set((state)=>({
            carts: state.carts.map((item)=>item.id === productId
                    ?{...item,count: Math.max(1,newQuantity)}
                    :item
    )
           }))
       
    },
    
    actionRemoveProduct: (id)=>{
            set((state)=>({
            carts:state.carts.filter((item)=>
                item.id !== id
            )
        }))
    },
    getTotalPrice:()=>{
        return get().carts.reduce((total,item)=>{
            return total + item.price * item.count
        },0)
    },
    // getOrder:()=>{
    //     try {
    //     const rs = await createUserOrder()
    //         set({category:rs.data})
    //     } catch (error) {
    //         console.log(error);
    //     }
   
    // },

}),
{
    name: 'stateProduct',
    storage: createJSONStorage(() => localStorage),
    partialize:(state)=>({carts:state.carts}),
}
))

export default useProductStore;