import axios from "axios";

export const listProducts =async()=>{
    return await axios.get('http://localhost:8900/products/')
}

export const searchProduct =async(arg)=>{
    return await axios.post(`http://localhost:8900/products/search`,arg)
}