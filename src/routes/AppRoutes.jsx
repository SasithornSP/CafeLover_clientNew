import React from 'react';
import { Route, Routes} from 'react-router';
import HomePage from '../pages/HomePage';
import Menu from '../pages/Menu';
import DetailPage from '../pages/DetailPage';
import OrderPage from '../pages/OrderPage';
import PaymentPage from '../pages/PaymentPage';
import EditProfile from '../pages/EditProfile';
import ReceiptPage from '../pages/ReceiptPage';

// import ProtectRoute from './ProtectRoute';

const AppRoutes = () => {
  return (
  
  <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/menu" element={<Menu/>} />
    <Route path="/detail/:name" element={<DetailPage/>} />
    <Route path="/OrderCart" element={<OrderPage/>} />
    <Route path="/payment" element={<PaymentPage/>} />
    <Route path="/receipt" element={<ReceiptPage/>} />

    {/* Private [USER] */}
    {/* <Route path='user' element={<ProtectRoute el={<DetailPage/>} allows={["USER","ADMIN"]} />}>
    <Route index element={<HomeUser/>} /></Route> */}
    <Route path='/editProfile' element={<EditProfile/>}/>

    {/* Private [ADMIN] */}
    {/* <Route path='admin' element={<ProtectRoute el={<LayoutAdmin/>} allows={["ADMIN"]} />}> */}
    {/* <Route index element={<Dashboard/>} /> */}
    {/* <Route path='manage' element={<Manage/>} /></Route> */}
    
  </Routes>
  
  );
};

export default AppRoutes;