import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
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
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
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

  function handleContinueToPayment() {
    if (!isPaymentSelected) {
      toast.error("Please select a payment method first");
      return;
    }

    // Navigate to Final page with all necessary data
    navigate("/final", {
      state: {
        userData,
        paymentMethod: selection,
        price,
        items,
      },
    });
  }

  return (
    <div className="min-h-screen w-full">
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
                className="p-3 font-medium focus:outline-none rounded-lg border border-gray-300"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                onChange={handleChange}
                value={userData.phone}
                className="p-3 font-medium focus:outline-none rounded-lg border border-gray-300"
              />
              <textarea
                name="deliveryAddress"
                value={userData.deliveryAddress}
                placeholder="Delivery Address *"
                onChange={handleChange}
                className="p-3 font-medium focus:outline-none rounded-lg border border-gray-300"
                rows={3}
              ></textarea>
              <div>
                <button
                  type="button"
                  onClick={handlePayment}
                  className="text-white bg-red-600 px-6 py-3 rounded-lg hover:bg-red-800 transition-all duration-200 font-semibold"
                >
                  Select Payment Method
                </button>
              </div>
            </fieldset>
          </form>
        </div>

        <div className="w-1/3 border border-gray-300 rounded-lg p-6 bg-white shadow-lg">
          <div className="flex flex-col space-y-6">
            <h3 className="font-bold text-black text-2xl">Order Summary</h3>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-700">Items:</p>
              <p className="font-bold text-lg">{items}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-700">Total Amount:</p>
              <p className="font-bold text-xl text-red-600">₹{price}</p>
            </div>
            <hr className="border-gray-300" />

            {isPaymentSelected && (
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-green-700 font-medium">
                  ✓ Payment Method: {selection}
                </p>
              </div>
            )}

            <button
              onClick={handleContinueToPayment}
              className={`p-3 rounded-lg font-semibold transition-all duration-200 ${
                isPaymentSelected
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isPaymentSelected}
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

          // Validate payment details based on selection
          if (selection === "Credit / Debit Card") {
            const { cardname, cardnumber, monthyear, cvv } = cardDetails;
            if (!cardname || !cardnumber || !monthyear || !cvv) {
              toast.error("Fill in all card details");
              return;
            }
            // Basic card number validation (should be 16 digits)
            if (cardnumber.replace(/\s/g, "").length !== 16) {
              toast.error("Card number should be 16 digits");
              return;
            }
            // Basic CVV validation
            if (cvv.length < 3 || cvv.length > 4) {
              toast.error("CVV should be 3 or 4 digits");
              return;
            }
          }

          if (selection === "UPI") {
            const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
            if (!upiDetails.upidetail || !upiRegex.test(upiDetails.upidetail)) {
              toast.error("Please enter a valid UPI ID");
              return;
            }
          }

          toast.success(`${selection} selected successfully`);
          setIsPaymentSelected(true);
          setModal(false);

          // Clear payment details after successful selection
          setCardDetails({
            cardname: "",
            cardnumber: "",
            monthyear: "",
            cvv: "",
          });

          setUpiDetails({
            upidetail: "",
          });
        }}
      >
        {/* Payment Method Inputs */}
        <h2 className="text-xl font-semibold mb-6 text-center">
          Select Your Payment Method
        </h2>

        <div className="space-y-4">
          {/* Credit / Debit Card */}
          <label
            className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
              selection === "Credit / Debit Card"
                ? "border-red-600 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
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
            <div className="ml-6 mt-3">
              <CardDetails card={cardDetails} setCard={setCardDetails} />
            </div>
          )}

          {/* Cash on Delivery */}
          <label
            className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
              selection === "Cash on Delivery"
                ? "border-red-600 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              checked={selection === "Cash on Delivery"}
              onChange={handleRadio}
              className="form-radio accent-red-600"
            />
            <span className="text-base font-medium">Cash on Delivery</span>
          </label>

          {/* UPI */}
          <label
            className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
              selection === "UPI"
                ? "border-red-600 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
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
            <div className="ml-6 mt-3">
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
    </div>
  );
};

export default CheckOut;
