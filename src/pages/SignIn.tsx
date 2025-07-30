import { useNavigate } from "react-router-dom";
import KfcLogo from "../media/kfcLogo.svg";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const [phoneNumber, setphoneNumber] = useState("");

  function handleHome(value: string) {
    const str = value.trim();
    if (str.length <= 9) {
      window.alert("Please Enter Correct Number ...");
    } else {
      navigate("/");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setphoneNumber(e.target.value);
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center  ">
      <div className=" w-1/3  space-y-8 text-center ">
        <p className="font-bold text-1xl">Sign In / Sign up</p>
        <div className="flex flex-row justify-center">
          <img src={KfcLogo} alt="Logo" className=""></img>
        </div>
        <p className="font-bold text-2xl">
          LET'S SIGN IN OR CREATE ACCOUNT WITH YOUR PHONE NUMBER
        </p>
        <div className="flex flex-col space-y-6">
          <input
            type="number"
            placeholder="Phone Number *"
            className="p-4 focus:outline-none font-mono -mb-8 w-full"
            onChange={handleChange}
            value={phoneNumber}
          ></input>
          <hr></hr>
        </div>
        <p>
          By Loggin in to KFC You agree to our{" "}
          <span className="underline cursor-pointer">Privacy Policy</span> and{" "}
          <span className="underline cursor-pointer">Terms&Conditions</span>
        </p>
        <button className="rounded-lg text-white bg-red-600 p-3 hover:bg-red-700 transition duration-100 ease-in">
          Send Me a Code
        </button>
        <p>Or</p>
        <button
          onClick={() => handleHome(phoneNumber)}
          className="w-full py-2 border-black rounded-lg border-2 p-1"
        >
          Skip, Continue As Guest
        </button>{" "}
      </div>
    </div>
  );
};

export default SignIn;
