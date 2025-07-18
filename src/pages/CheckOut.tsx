import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import CardDetails from "../components/CardDetails";
import UpiDetails from "../components/UpiDetails";

type PropsType = {
  price: number;
  items: number;
};

const CheckOut = () => {
  const location = useLocation();
  const { price, items } = location.state as PropsType;
  const [selection, setSelection] = useState("");
  const [checkPayment, setCheckPayment] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullname: "",
    phone: "",
    deliveryAddress: "",
  });

  const [cardDetails, setCardDetails] = useState({
    cardname: "",
    cardnumber: "",
    monthyear: "",
    cvv: "",
  });

  const [upiDetails, setUpiDetails] = useState({
    upidetail: "",
  });

  const [modal, setModal] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
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
      toast.success("User Details Added");
      setModal(true);
    } else {
      toast.error("Fill the details");
    }
  }

  function handleRadio(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value, "this is from handleRadio ");
    setSelection(e.target.value);
  }

  return (
    <div className="min-h-screen w-full">
      <Header />
      <div className="flex flex-row mt-10 m-20 justify-between items-center">
        <div className="w-3/5 bg-gray-100 p-8 rounded-lg">
          <form>
            <fieldset className="flex flex-col space-y-8">
              <legend className="font-bold text-4xl">Customer Details</legend>
              <input
                type="text"
                name="fullname"
                placeholder="Full Name *"
                value={userData.fullname}
                onChange={handleChange}
                className="p-3 font-medium focus:outline-none"
              />
              <input
                type="number"
                name="phone"
                placeholder="Phone Number *"
                onChange={handleChange}
                value={userData.phone}
                className="p-3 font-medium focus:outline-none"
              />
              <textarea
                name="deliveryAddress"
                value={userData.deliveryAddress}
                placeholder="Delivery Address *"
                onChange={handleChange}
                className="p-3 font-medium focus:outline-none"
                rows={3}
              ></textarea>
              <div>
                <button
                  onClick={handlePayment}
                  className="text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-800 transition-all duration-200"
                >
                  Select Payment
                </button>
              </div>
            </fieldset>
          </form>
        </div>

        <div className="w-1/5 border-4 p-10">
          <div className="flex flex-col space-y-8">
            <p className="font-bold text-black text-3xl">{items} Items</p>
            <p className="font-semibold text-gray-600">
              Total Amount : ₹ {price}
            </p>
            <hr />
            <button
              onClick={() => navigate("/Final",{state:{userData}})}
              className={`p-3 rounded-3xl cursor-pointer font-semibold ${
                checkPayment
                  ? "bg-red-600 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              Continue to Payment ₹{price}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        onSubmit={() => {
          if (!selection) {
            toast.error("Please select a payment method");
            return;
          }

          if (selection === "Credit / Debit Card") {
            const { cardname, cardnumber, monthyear, cvv } = cardDetails;
            if (!cardname || !cardnumber || !monthyear || !cvv) {
              toast.error("Fill in all card details");
              return;
            }
          }

          if (selection === "UPI") {
            if (!upiDetails.upidetail) {
              toast.error("Please enter a valid UPI ID");
              return;
            }
          }

          toast.success(`${selection} selected successfully`);
          setCheckPayment(true);
          setModal(false);

          setCardDetails({
            cardname: "",
            cardnumber: "",
            monthyear: "",
            cvv: "",
          });

          setUpiDetails({
            upidetail: "",
          });

          setUserData({
            fullname: "",
            phone: "",
            deliveryAddress: "",
          });
        }}
      >
        {/* Payment Method Inputs */}
        <h2 className="text-xl font-semibold mb-4 text-center">
          Select Your Payment Method
        </h2>

        <div className="space-y-3">
          {/* Credit / Debit Card */}
          <label
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
              selection === "Credit / Debit Card"
                ? "border-red-600 bg-red-50"
                : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="Credit / Debit Card"
              checked={selection === "Credit / Debit Card"}
              onChange={handleRadio}
              className="form-radio accent-red-600"
            />
            <span className="text-base font-medium">Credit / Debit Card</span>
          </label>
          {selection === "Credit / Debit Card" && (
            <div className="pl-6">
              <CardDetails card={cardDetails} setCard={setCardDetails} />
            </div>
          )}

          {/* Cash */}
          <label
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
              selection === "Cash"
                ? "border-red-600 bg-red-50"
                : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="Cash"
              checked={selection === "Cash"}
              onChange={handleRadio}
              className="form-radio accent-red-600"
            />
            <span className="text-base font-medium">Cash</span>
          </label>


          {/* UPI */}
          <label
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
              selection === "UPI"
                ? "border-red-600 bg-red-50"
                : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={selection === "UPI"}
              onChange={handleRadio}
              className="form-radio accent-red-600"
            />
            <span className="text-base font-medium">UPI</span>
          </label>
          {selection === "UPI" && (
            <div className="pl-6">
              <UpiDetails upi={upiDetails} setUpi={setUpiDetails} />
            </div>
          )}
        </div>
      </Modal>

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
