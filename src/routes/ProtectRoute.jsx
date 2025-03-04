import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { actionCurrentUser } from '../apis/authApi'


function ProtectRoute({el,allows}) {
    console.log("Hello, Protect Route");
    const user = useAuthStore((state)=>state.user)
    const token = useAuthStore((state)=>state.token)
    const [ok,setOk] = useState(null)
    console.log(user);
    console.log(token);

    useEffect(()=>{
        checkPermission()
    },[])
    const checkPermission =async()=>{
        // console.log('Check permission');
        try {
            const resp =await actionCurrentUser(token)
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

export default ProtectRoute