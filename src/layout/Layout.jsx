import React from "react";
import { Outlet } from "react-router";
// import MainNav from "../component/MainNav";


function Layout() {
  return (
    <div >
      {/* <h1 className="text-2xl font-bold">User Dashboard</h1> */}
      {/* <MainNav /> */}
      {/* <Menu/> */}
      <Outlet />
    </div>
  );
}

export default Layout;