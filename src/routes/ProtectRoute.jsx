import { useEffect, useState } from 'react'
import useUserStore from '../stores/userStores';
// import { actionProfile } from '../stores/userStores';
import { Navigate, useNavigate } from "react-router";


function ProtectRoute({el,allows}) {
    // console.log("Hello, Protect Route");
    const user = useUserStore((state)=>state.user)
    const token = useUserStore((state)=>state.token)
    const actionProfile = useUserStore((state) => state.actionProfile); // เรียกจาก store โดยตรง
    const [ok,setOk] = useState(null)
    console.log(user);
    console.log(token);

    // const navigate = useNavigate();
    useEffect(()=>{
        if (!token) {
            setOk(false); // ถ้าไม่มี token ให้ถือว่าไม่อนุญาต
            return;
        }
        checkPermission()
    },[token, allows])
    const checkPermission =async()=>{
        // console.log('Check permission');
        try {
            const resp =await  actionProfile(token)
            console.log('resp', resp)
            const role =resp.user.result.role
            // console.log("user role",role);
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
    };
    console.log("Ok state after checkPermission:", ok);
    if(ok === null){
        return <h1>Loading...</h1>
    }
    if(!ok){
        return  <Navigate to="/user/menu" />;// Redirect ไปหน้า Login ถ้าไม่ได้รับอนุญาต
    }
    return el;
}

export default ProtectRoute