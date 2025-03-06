import { MenuIcon, User, LogOut, X, HistoryIcon } from "lucide-react";
import { CartIcon, PointIcon, SearchIcon } from "../icon";
import { useEffect, useState } from "react";
import CardMenu from "../component/CardMenu";
// import { CoffeeMenu } from "../component/CoffeeMenu";
// import { TeaMenu } from "../component/TeaMenu";
import { useNavigate } from "react-router";
import useUserStore from "../stores/userStores";
import useProductStore from "../stores/useProductStores";
import SearchCard from "../component/SearchCard";
// import userProfile from "./userProfile";

function Menu() {
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);
  const getCategory = useProductStore((state) => state.getCategory);
  const getProduct = useProductStore((state) => state.getProduct);
  const products = useProductStore((state) => state.products);
  const getTotalPrice = useProductStore((state) => state.getTotalPrice);
  const carts = useProductStore((state) => state.carts);
  const actionProfile = useUserStore((state)=>state.actionProfile)
  const isLoggedIn = !!user && !!Object.keys(user).length;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  console.log(products);

  useEffect(() => {
    getCategory();
    getProduct();
  }, []);

  const category = [
    { id: 1, text: "All" },
    { id: 2, text: "Coffee" },
    { id: 3, text: "Tea" },
  ];
  const [active, setActive] = useState(1);
  const hdlClickCategory = (id) => setActive(id);
  const navigate = useNavigate();

  const filterMenu = products.filter((menu) => {
    if (active === 1) {
      return menu;
    }
    if (active === 2) {
      return menu.category.name === "Coffee";
    }
    if (active === 3) {
      return menu.category.name === "Tea";
    }
  });

  const hdlClickSelect = (data) => {
    navigate(`/detail/${data.name}`);
    localStorage.setItem("detailMenu", JSON.stringify(data));
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
 const hdlLogout =()=>{
  logout()
  navigate('/')
 }

  return (
    <div className="min-w-screen min-h-screen relative">
      <div className="bg-[#313131] -z-40 w-full absolute top-0 h-80"></div>
      {/* container */}
      <div>
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-[#212121] text-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Sidebar Header with Close Button */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold">Cafe Lover</h2>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>
          {/* Profile */}
              <div
                onClick={() => navigate("/editProfile")}
                className="flex  p-4 border-b w-full   border-gray-700  hover:bg-[#313131] transition-colors"
              >
                <div className="flex items-center space-x-4 ">
                  {/* img */}
                  <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                    <User size={24} className="text-gray-300" />
                  </div>
                  <div>
                    <div className="font-semibold ">{user.firstName}</div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                  </div>
                </div>
              </div>

          {/* Menu Items */}
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate("/menu")}
                  className="flex items-center p-2 w-full rounded-md hover:bg-[#313131] transition-colors"
                >
                  <HistoryIcon size={20} className="mr-3" />
                  <span>History</span>
                </button>
              </li>

              <li>
                <button
                  href="#"
                  className="flex items-center p-2 w-full rounded-md hover:bg-[#313131] transition-colors"
                >
                  <PointIcon className="h-6 pr-2" />
                  <span>Point</span>
                </button>
              </li>

              <li>
                <button
                 onClick={hdlLogout}
                  className="flex items-center p-2 w-full rounded-md hover:bg-[#313131] transition-colors"
                >
                  <LogOut size={20} className="mr-3" />
                  <span >Log out</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Overlay when sidebar is open on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <div className="pt-16 px-12 space-y-4">
          {/* HeaderMenu with menuProduct button and GetCart*/}
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
              >
                <MenuIcon className="h-6 w-6 text-white" />
              </button>
              <h1 className="text-2xl  font-bold text-white">Cafe Lover</h1>
            </div>

            {/* cartIcon */}
            <div className="flex">
              <div className="dropdown dropdown-end ">
                <div
                  tabIndex={0}
                  role="button"
                  className="bg-[#313131] rounded-4xl  hover:bg-gray-700 focus:outline-none "
                >
                  <div className="indicator">
                    <CartIcon className="h-10 w-10" />
                    <span className="badge badge-sm indicator-item rounded-2xl bg-red-600 text-white border-0 mr-1 mt-2">
                      {carts.reduce((acc,curr) =>acc + curr.count,0)}
                    </span> 
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
                >
                  <div className="card-body ">
                    <span className="text-lg text-gray-700 font-bold">
                    {carts.reduce((acc,curr) =>acc + curr.count,0)} Items
                    </span>
                    <span className="text-gray-700 ">
                      Subtotal: {getTotalPrice()} ฿ 
                    </span>
                    <div className="card-actions">
                      <button
                        onClick={() => navigate("/OrderCart")}
                        className="bg-primary-bg w-full py-1 text-white text-lg rounded-md hover:shadow-md hover:scale-105"
                      >
                        View order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* คำค้นหา */}
          <div className="input w-full bg-[#515050] text-white ">
            <SearchIcon className="h-[1em] opacity-50" />
            <SearchCard />
          </div>
          {/* รูปโปรโมท */}
          <div className="w-full h-50 rounded-xl overflow-hidden">
            <img
              src="https://i.pinimg.com/736x/ee/10/a5/ee10a5c6589656649097ffbbf102e7ec.jpg"
              className="w-full h-full object-cover hover:scale-110 duration-200"
            />
          </div>
          {/* หมวดหมู่ */}
          <div className="gap-2 flex">
            {category.map((item) => (
              <button
                onClick={() => hdlClickCategory(item.id)}
                className={`py-1 px-3 rounded-lg cursor-pointer duration-150 ${
                  active === item.id
                    ? "bg-primary-bg text-white hover:shadow-md hover:scale-105 "
                    : "bg-gray-300 text-black hover:shadow-md hover:scale-105"
                }`}
                key={item.id}
              >
                {item.text}
              </button>
            ))}
          </div>
          {/* แสดงรายการเมนู Product */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filterMenu.map((item) => (
              <CardMenu
                key={item.id}
                item={item}
                hdlClickSelect={hdlClickSelect}
              />
            ))}
            {/* <div className="text-2xl font-bold">tea</div> */}
          </div>
          {/* <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {TeaMenu.map((item) => (
            <CardMenu key={item.id} item={item}/>
          ))}
        </div> */}
        </div>
      </div>
    </div>
  );
}

export default Menu;
