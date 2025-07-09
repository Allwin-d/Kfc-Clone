import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../components/Footer";

type propsType = {
  price: number;
  items: number;
};

type userDetails = {
  fullname: string;
  phone: string;
  deliveryAddress: string;
};

const CheckOut = () => {
  const location = useLocation();
  const [userData, setuserData] = useState<userDetails>({
    fullname: "",
    phone: "",
    deliveryAddress: "",
  });

  const [payment, setPayment] = useState<boolean>(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    console.log(e.target.value, " this is value ");
    console.log(e.target.name, " this is Name ");
    const { name, value } = e.target;
    setuserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handlePayment(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (
      userData.fullname !== "" &&
      userData.phone !== "" &&
      userData.deliveryAddress !== ""
    ) {
      console.log("Everything is filled ");
      toast.success("User Details Added");
    } else {
      toast.error("Fill The Details ");
      console.log("You need to fill the details first ");
    }
  }

  console.log(location);
  const { price, items } = location.state as propsType;

  return (
    <div className="min-h-screen w-full  ">
      <Header />
      <div className="flex flex-row  mt-10 m-20 justify-between items-center ">
        <div className="w-3/5 bg-gray-200 p-8 rounded-lg">
          <form className="">
            <fieldset className="flex flex-col space-y-8">
              <legend className="font-bold text-4xl">Customer Details</legend>
              <input
                type="text"
                placeholder="Full Name * "
                className="p-3 font-medium  focus:outline-none"
                onChange={handleChange}
                name="fullname"
              ></input>
              <input
                type="number"
                name="phone"
                onChange={handleChange}
                placeholder="Phone Number * "
                className="p-3 font-medium focus:outline-none"
              ></input>
              <textarea
                name="deliveryAddress"
                onChange={handleChange}
                placeholder="Delivery Address * "
                className=" p-3 font-medium focus:outline-none"
                rows={3}
              ></textarea>
              <div>
                <button
                  className="text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-800 transition-all duration-200 "
                  onClick={handlePayment}
                >
                  Select Payment
                </button>
              </div>
            </fieldset>
          </form>
        </div>

        <div className="w-1/5  border-4 p-10 ">
          <div className="flex flex-col space-y-8">
            <p className="font-bold text-black text-3xl">{items} Items </p>
            <p className="font-semibold text-gray-600">
              Total Amount : ₹ {price}
            </p>
            <hr></hr>
            <button className="bg-gray-300 p-3 rounded-3xl cursor-pointer font-semibold">
              Continue to Payment {price}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Footer />
    </div>
  );
};

export default CheckOut;
