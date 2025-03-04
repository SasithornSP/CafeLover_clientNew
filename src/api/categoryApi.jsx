import axios from "axios";


export const listCategory =async()=>{
    return await axios.get('http://localhost:8900/category')
}

