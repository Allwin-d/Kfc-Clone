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
      <div className="flex flex-col space-y-3 justify-center items-center mt-4  ">
        <div className="font-bold text-4xl">Order Confirmed ✅ </div>
        <div className="text-gray-600  font-semibold text-xl">
          Thank You for your order . We're preparing your finger lickin' good
          meal! 😜
        </div>
      </div>
      <div className="flex flex-col space-y-4 mx-auto  ">
        {/* this is for order details section  */}
        <div className="bg-gray-50 space-y-4 m-4 p-4 mt-10">
          {cartItems.map((item) => {
            console.log(item);
            return (
              <div className="hover:shadow-md transition-all duration-150  hover:-translate-x-1 cursor-pointer ">
                <div className="flex flex-row justify-between ">
                  <div className="flex flex-col">
                    <p className="text-xl font-semibold">{item.name}</p>
                    <p className="text-gray-500 font-sans">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex space-x-6 ">
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
          <div>
            <p>
              {cartItems.reduce((acc, item) => {
                return acc + item.price;
              }, 0)}
            </p>
          </div>
        </div>

        <div>{/* this is for user details section  */}</div>
      </div>
    </div>
  );
};

export default Final;
