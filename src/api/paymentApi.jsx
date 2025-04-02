import axios from "axios";

export const actionCheckout =async(token,id)=>{
    return await axios.post('http://localhost:8900/payment/checkout',{id},{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export const actionCheckoutStatus =async(token,session)=>{
    return await axios.post('http://localhost:8900/payment/checkout-status/'+session,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}