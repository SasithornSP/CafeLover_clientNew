import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Menu from '../pages/Menu';
import DetailPage from '../pages/DetailPage';
import OrderPage from '../pages/OrderPage';
import PaymentPage from '../pages/PaymentPage';
import EditProfile from '../pages/EditProfile';
import ReceiptPage from '../pages/ReceiptPage';
import Checkout from '../payment/checkout';
import CheckoutComplete from '../payment/CheckoutComplete';
import Layout from '../layout/Layout';
// import Dashboard from '../pages/admin/Dashboard';
// import Manage from '../pages/admin/Manage';
// import LayoutAdmin from '../layouts/LayoutAdmin';
// import NotFound from '../pages/NotFound';
import ProtectRoute from './ProtectRoute';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout/>} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/detail/:name" element={<DetailPage />} />
        <Route path="orderCart" element={<OrderPage />} />

      {/* Private Routes for Users */}
      <Route path="user" element={<ProtectRoute el={<Layout/>} allows={["USER", "ADMIN"]} />}>
        <Route index element={<Menu/>} />
        <Route path="editProfile" element={<EditProfile />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="receipt" element={<ReceiptPage />} />
        <Route path="checkout/:id" element={<Checkout />} />
        <Route path="complete/:session" element={<CheckoutComplete />} />
      </Route>

      {/* Private Routes for Admin */}
      {/* <Route path="admin" element={<ProtectRoute el={<LayoutAdmin />} allows={["ADMIN"]} />}>
        <Route index element={<Dashboard />} />
        <Route path="manage" element={<Manage />} />
      </Route> */}

      {/* Not Found */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}


// const AppRoutes = () => {
//   return (
  
//   <Routes>
//     <Route path="/" element={<HomePage/>} />
//     <Route path="/menu" element={<Menu/>} />
//     <Route path="/detail/:name" element={<DetailPage/>} />
//     <Route path="/OrderCart" element={<OrderPage/>} />
//     <Route path="/payment" element={<PaymentPage/>} />
//     <Route path="/receipt" element={<ReceiptPage/>} />
//     <Route path="/checkout/:id" element={<Checkout/>} />
//     <Route path="/complele/:session" element={<CheckoutComplete/>} />

//     Private [USER]
//     <Route path='user' element={<ProtectRoute el={<DetailPage/>} allows={["USER","ADMIN"]} />}>
//     <Route index element={<HomeUser/>} /></Route>
//     <Route path='/editProfile' element={<EditProfile/>}/>

//     Private [ADMIN]
//     <Route path='admin' element={<ProtectRoute el={<LayoutAdmin/>} allows={["ADMIN"]} />}>
//     <Route index element={<Dashboard/>} />
//     <Route path='manage' element={<Manage/>} /></Route>
    
//   </Routes>
  
//   );
// };

export default AppRoutes;