import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import useAuthStore from '../../src/stores/userStores'
import { actionCheckoutStatus } from '../api/paymentApi'
import { createAlert, createConfirmAlert } from '../utils/createAlert'

function CheckoutComplete() {
  const navigate = useNavigate()
  const token = useAuthStore (state => state.token)
  // console.log('token:', token)
  const { session } = useParams()
// console.log('Session ID: ', session);

  useEffect ( ()=> {
    checkSession()
  },[])


  const checkSession = async()=>{
    if(!session) return
  
  try {
    const res = await actionCheckoutStatus (token , session)
    createAlert("success",res.data.message || "Payment Successfully")
    navigate("/user/receipt")
  } catch (error) {
    createConfirmAlert("error" ,"failed to verify payment")
    console.error("Payment verify error:" , error)
  }
  }
  return (
    <div>loading ... </div>
  )
}

export default CheckoutComplete