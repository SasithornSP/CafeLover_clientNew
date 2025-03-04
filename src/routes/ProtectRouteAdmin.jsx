import { useEffect, useState } from 'react'
import { userStores } from '../stores/userStores'
import { actionCurrentUserAdmin } from '../api/authApi'


function ProtectRouteAdmin({el,allows}) {
    console.log("Hello, Protect Route");
    const user = userStores((state)=>state.user)
    const token = userStores((state)=>state.token)
    const [ok,setOk] = useState(null)
    console.log(user);
    console.log(token);

    useEffect(()=>{
        checkPermission()
    },[])
    const checkPermission =async()=>{
        // console.log('Check permission');
        try {
            const resp =await actionCurrentUserAdmin(token)
            const role =resp.data.result.role
            console.log(role);
            // if(allows.includes(role)){
            //     setOk(true)
            // }else{
            //     setOk(false)
            // }
            setOk(allows.includes(role))

        } catch (error) {
            console.log(error);
            setOk(false)
        }
    };console.log(ok);
    if(ok === null){
        return <h1>Loading...</h1>
    }
    if(!ok){
        return <h1>Unauthorized!!!</h1>
    }
    return el;
}

export default ProtectRouteAdmin