import kfcLogo from "../media/kfcLogo.svg";
import KfcCart from "../media/kfcCart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/Store";

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-3 sm:px-6 py-3 gap-2">
        {/* Left: Logo and Menu */}
        <div className="flex items-center gap-3 sm:gap-8">
          <img
            src={kfcLogo}
            alt="KFC Logo"
            width={50}
            height={50}
            className="w-10 h-10 sm:w-[50px] sm:h-[50px] shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <button
            onClick={() => navigate("/products")}
            className="text-sm sm:text-base text-gray-700 font-medium hover:text-red-600"
          >
            Menu
          </button>
          <button
            className="text-sm sm:text-base text-gray-700 font-medium hover:text-red-600"
            onClick={() => navigate("/offers")}
          >
            Offers
          </button>
        </div>

        {/* Right: Sign In and Cart */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div
            onClick={() => navigate("/SignIn")}
            className="flex items-center gap-1 sm:gap-2 cursor-pointer"
          >
            <FontAwesomeIcon icon={faUser} className="text-gray-700" />
            <span className="text-sm sm:text-base text-gray-700 hover:text-red-600 font-medium">
              Sign In
            </span>
          </div>

          <div
            onClick={() => navigate("/Cart")}
            className="relative cursor-pointer flex items-center"
          >
            <img src={KfcCart} alt="Cart" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalQuantity}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
