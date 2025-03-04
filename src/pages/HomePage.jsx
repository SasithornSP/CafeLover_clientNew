import React, { useState } from "react";
import Login from "../component/auth/Login";
import Register from "../component/auth/register";
import { HomeIcon } from "../icon";
import { useNavigate } from "react-router";

function HomePage() {
  const [isClick, setIsClick] = useState(true);

  const navigate = useNavigate();

  const hdlClick = () => {
    setIsClick(!isClick);
  };
  return (
    <div className='absolute min-w-screen inset-0 bg-[url("https://i.pinimg.com/736x/e5/7a/67/e57a673b1b7d398d6a0bb76ed53dee34.jpg")]  bg-cover bg-center'>
      <div className='bg-gradient-to-t from-primary-btn from-20% to-transparent to-60% h-screen flex flex-col gap-4 justify-end items-center text-white text-center p-10 pb-20'>
        <h1 className="text-5xl"> Fall in Love with Coffee in Cafe Lover</h1>
        <p>
          Welcome to our cozy coffee corner, where every cup is a delightful for
          you.
        </p>
        <button
          className="bg-primary-bg w-8/12 py-4 text-2xl rounded-2xl hover:scale-105 transition-colors"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          Get Started
        </button>

        <div onClick={()=>navigate("/menu")}
        className="w-10 h-10 bg-primary-bg  rounded-full flex justify-center  items-center absolute top-0 left-0 m-4 hover:scale-105">
          <HomeIcon className="w-6 h-6" />
        </div>

      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-primary-bg text-white p-5">
          {isClick ? <Login hdlClick={hdlClick} /> : <Register hdlClick={hdlClick} />}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default HomePage;
