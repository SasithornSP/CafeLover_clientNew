import React, { useState } from "react";
import InputForm from "./InputForm";
import { EmailIcon, PasswordIcon, PhoneIcon, UserIcon } from "../../icon";
import { loginSchema, registerSchema } from "../../utils/validators";
import { toast } from "react-toastify";
import { ZodError } from "zod";
import { Loader } from "lucide-react";
import { Axios, AxiosError } from "axios";
import useUserStore from "../../stores/userStores";
import BtnForm from "./btnForm";

const initInput = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  password: "",
  confirmpassword: "",
};

function Register({hdlClick}) {
  const actionRegister = useUserStore((state) => state.actionRegister);

  const [input, setInput] = useState(initInput);
  const [errorInput, setErrorInput] = useState(initInput);
  const [isLoading, setIsLoading] = useState(false);

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    setErrorInput((prv) => ({ ...prv, [e.target.name]: "" }));
  };
  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(input);
      //**validation
      registerSchema.parse(input);
      //** send request to api
      await actionRegister(input);

      toast.success("Register successful");

      setInput(initInput);
      hdlClick()
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
      <h1 className="text-4xl ">Create New account</h1>

      <form className="flex flex-col  gap-4 w-full" onSubmit={hdlSubmit}>
        <div className="flex flex-col gap-4">
          <InputForm
            nameForm="Firstname"
            icon={UserIcon}
            nameInput="firstName"
            handleChange={hdlChange}
            valueInput={input.firstName}
            placeholderInput="Enter your Firstname"
            error={errorInput.firstName}
          />
          <InputForm
            nameForm="Lastname"
            icon={UserIcon}
            nameInput="lastName"
            handleChange={hdlChange}
            valueInput={input.lastName}
            placeholderInput="Enter your Lastname"
            error={errorInput.lastName}
          />
        </div>
        <InputForm
          nameForm="Phone number"
          icon={PhoneIcon}
          nameInput="mobile"
          handleChange={hdlChange}
          valueInput={input.mobile}
          placeholderInput="Enter your Phone number"
          error={errorInput.mobile}
        />
        <InputForm
          nameForm="Email address"
          icon={EmailIcon}
          nameInput="email"
          handleChange={hdlChange}
          valueInput={input.email}
          placeholderInput="Enter your Email"
          error={errorInput.email}
        />
        <InputForm
          nameForm="Password"
          icon={PasswordIcon}
          nameInput="password"
          handleChange={hdlChange}
          valueInput={input.password}
          placeholderInput="Enter your Password"
          error={errorInput.password}
        />
        <InputForm
          nameForm="ConfirmPassword"
          icon={PasswordIcon}
          nameInput="confirmpassword"
          handleChange={hdlChange}
          valueInput={input.confirmpassword}
          placeholderInput="Enter your confirmPassword"
          error={errorInput.confirmpassword}
        />

        <BtnForm isLoading={isLoading} text="Sign up" />
      </form>
    </div>
  );
}

export default Register;
