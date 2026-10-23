import { useSelector } from "react-redux";
import type { RootState } from "../store/Store";
import { useLocation } from "react-router-dom";

const Final = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const location = useLocation();
  const { userData } = location.state;
  console.log(userData);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col space-y-3 justify-center items-center text-center mt-4 px-4">
        <div className="font-bold text-2xl sm:text-4xl">Order Confirmed ✅ </div>
        <div className="text-gray-600 font-semibold text-base sm:text-xl">
          Thank You for your order . We're preparing your finger lickin' good
          meal! 😜
        </div>
      </div>
      <div className="flex flex-col space-y-4 mx-auto max-w-4xl px-2 sm:px-4">
        {/* this is for order details section  */}
        <div className="bg-gray-50 space-y-4 m-4 p-4 mt-10">
          {cartItems.map((item) => {
            console.log(item);
            return (
              <div key={item.id} className="hover:shadow-md transition-all duration-150">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                  <div className="flex flex-col">
                    <p className="text-xl font-semibold">{item.name}</p>
                    <p className="text-gray-500 font-sans">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-start gap-6">
                    <span className="text-xl text-red-600 font-bold">
                      {" "}
                      <span>x</span> {item.quantity}
                    </span>
                    <p className="text-xl font-semibold">{item.price}</p>
                  </div>
                </div>
                <hr className="w-full border-t-2 mt-4 mx-auto"></hr>
              </div>
            );
          })}
          
          {/* Enhanced Total Amount Section */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg border-2 border-green-400 mt-6">
            <div className="flex justify-between items-center gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">💰</span>
                <span className="text-base sm:text-xl font-bold">Total Amount</span>
              </div>
              <div className="text-right">
                <p className="text-2xl sm:text-3xl font-bold tracking-wide">
                  ₹{cartItems.reduce((acc, item) => {
                    return acc + item.price;
                  }, 0)}
                </p>
                <p className="text-green-100 text-sm font-medium">Including all taxes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Final;