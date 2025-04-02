import React, { useState } from "react";
import InputForm from "./InputForm";
import { EmailIcon, PasswordIcon } from "../../icon";
import { loginSchema } from "../../utils/validators";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import { Axios, AxiosError } from "axios";
import useUserStore from "../../stores/userStores";
import { useNavigate } from "react-router";
import BtnForm from "./btnForm";
import InputFormpassword from "./InFormPassword";


const initInput = {
  email: "",
  password: "",
};

function Login({hdlClick}) {
  const actionLogin = useUserStore((state) => state.actionLogin);

  const [input, setInput] = useState(initInput);
  const [errorInput, setErrorInput] = useState(initInput);
  const [isLoading, setIsLoading] = useState(false);

  const navigate =useNavigate()
  const roleRedire = (role) => {
    if (role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/user/menu");
    }
  };

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    setErrorInput((prv) => ({ ...prv, [e.target.name]: "" }));
  };
  const hdlSubmit = async (e) => {

    try {
      e.preventDefault();
      console.log(input);
      //**validation
      loginSchema.parse(input);
      //** send request to api
      const res = await actionLogin(input);

      const role =res.user.role
      console.log('role',role);

      toast.success("Login successful");
      setInput(initInput);

      document.getElementById("my_modal_2").close();
      roleRedire(role)
      navigate("/user/menu")
      console.log(input);
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        console.log("error.response.data====", error);
        toast.error(error?.response.data.message);
      }

      if (error instanceof ZodError) {
        const errMsg = error.errors.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        setErrorInput(errMsg);
        // console.log(errMsg)
        toast.error("Please fill all inputs");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" bg-primary-bg text-white flex flex-col items-center gap-4 p-8">
      <h1 className="text-4xl ">Cafe Login</h1>

      <form className="flex flex-col  gap-4 w-full" onSubmit={hdlSubmit}>
        <InputForm
          nameForm="Email address"
          icon={EmailIcon}
          type={input.type}
          nameInput="email"
          handleChange={hdlChange}
          valueInput={input.email}
          placeholderInput="Enter your Email"
          error={errorInput.email}
        />
        <InputFormpassword
          nameForm="Password"
          icon={PasswordIcon}
          type={input.type}
          nameInput="password"
          handleChange={hdlChange}
          valueInput={input.password}
          placeholderInput="Enter your Password"
          error={errorInput.password}
        />
        <p className="text-xs">Forgotten your password?</p>
        <div className="border-b-2"></div>
        <p className="text-xs">
          Don't have an account?{" "}
          <span onClick={hdlClick} className="cursor-pointer hover:underline">Sign up</span>
        </p>
        <BtnForm isLoading={isLoading} text="Login" />
      </form>
    </div>
  );
}

export default Login;
