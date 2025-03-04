import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import UpdateProfile from "../component/auth/UpdateProfile";
import { EmailIcon, PasswordIcon, PhoneIcon, UserIcon } from "../icon";


function EditProfile() {
    const initInput = {
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        password: "",
      };
    const [input, setInput] = useState(initInput);
    const [errorInput, setErrorInput] = useState(initInput);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const hdlChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const hdlSubmit = (e) => {
        try {
        e.preventDefault();
        //**validation
        updateUserSchema.parse(input);
        //** send request to api
        //   await actionRegister(input); รอเส้นหลังบ้าน*********************
        
          toast.success("Profile updated successfully!");
        setTimeout(() => {
          navigate("/menu");
        }, 2000);
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
    <div className="pt-16 pb-16  px-12 space-y-4 ">
      {/* หัวข้อ */}
      <div className="flex items-center gap-4 mb-8">
        <div onClick={() => navigate("/menu")} className="cursor-pointer">
          <ChevronLeft />
        </div>
        {/* <h1 className="flex-1 text-2xl font-bold text-center  ">Edit Profile</h1> */}
      </div>

      {/* Edit profile*/}
      <div className=" bg-primary-bg mr-50 ml-50 text-white flex flex-col items-center rounded-2xl gap-4 p-8">
      <h1 className="text-4xl font-semibold">My Profile</h1>

        <form className="flex flex-col  gap-4 w-full" onSubmit={hdlSubmit}>
          <div className="flex flex-col gap-4">
            <UpdateProfile
              nameForm="Firstname"
              icon={UserIcon}
              nameInput="firstName"
              handleChange={hdlChange}
              valueInput={input.firstName}
              placeholderInput="Enter your Firstname"
              error={errorInput.firstName}
            />
            <UpdateProfile
              nameForm="Lastname"
              icon={UserIcon}
              nameInput="lastName"
              handleChange={hdlChange}
              valueInput={input.lastName}
              placeholderInput="Enter your Lastname"
              error={errorInput.lastName}
            />
          </div>
          <UpdateProfile
            nameForm="Phone number"
            icon={PhoneIcon}
            nameInput="mobile"
            handleChange={hdlChange}
            valueInput={input.mobile}
            placeholderInput="Enter your Phone number"
            error={errorInput.mobile}
          />
          <UpdateProfile
            nameForm="Email address"
            icon={EmailIcon}
            nameInput="email"
            handleChange={hdlChange}
            valueInput={input.email}
            placeholderInput="Enter your Email"
            error={errorInput.email}
          />
          <UpdateProfile
            nameForm="Password"
            icon={PasswordIcon}
            nameInput="password"
            handleChange={hdlChange}
            valueInput={input.password}
            placeholderInput="Enter your Password"
            error={errorInput.password}
          />

          <button type="submit" className="mt-4 w-full h-10 rounded-xl p-2 cursor-pointer bg-green-600 text-white hover:shadow-md hover:scale-105">
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

    </div>
  );
}

export default EditProfile;
