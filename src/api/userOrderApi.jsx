import axios from "axios";

 const createUserOrder =async(token ,carts)=>{
    return axios.post('http://localhost:8900/users/order',carts,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}
export default createUserOrder