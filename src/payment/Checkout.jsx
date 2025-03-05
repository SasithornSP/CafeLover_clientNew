import React, { useCallback, useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { actionCheckout } from "../api/paymentApi";
import { useParams } from "react-router";
import useUserStore from "../stores/userStores";
const stripePromise = loadStripe("pk_test_51QzCc807JCuZBtxvMLfzLudGKDsuyFAJCZ4rD8iKNhhf9dYWA7kTznAjNq47Tj0T2PlvKQLEyn3PEGivPJ8azJrt00MmGbILSg");

function Checkout() {
const {id} = useParams()  
const token = useUserStore (state => state.token)

const fetchClientSecret  = useCallback(async ()=> {
  const res = await actionCheckout(token ,id)
  return res.data.clientSecret

})

const options = { fetchClientSecret }
  return (
    <div id="checkout">
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={options}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  </div>
  )
}

export default Checkout