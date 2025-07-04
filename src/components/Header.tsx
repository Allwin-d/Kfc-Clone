import kfcLogo from "../media/kfcLogo.svg";
import KfcCart from "../media/kfcCart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    navigate("/ProductView");
  }

  function handleSignIn(e: React.MouseEvent<HTMLHeadElement>) {
    e.preventDefault();
    navigate("/SignIn");
  }

  function handleCart(e: React.MouseEvent<HTMLHeadElement>) {
    e.preventDefault();
    navigate("/Cart");
  }

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      {" "}
      {/* Added sticky classes */}
      <div className="flex flex-row w-full max-w-7xl mx-auto">
        {" "}
        {/* Added max-width and margin auto */}
        <div className="flex flex-row justify-start w-full space-x-8 ml-10">
          <img
            src={kfcLogo}
            className="cursor-pointer"
            onClick={() => navigate("/")}
            alt="Logo"
            width={60}
            height={60}
          ></img>
          <button onClick={handleClick} className="mt-3 cursor-pointer">
            Menu
          </button>
          <button className="mt-3 cursor-pointer">Deals</button>
        </div>
        <div className="flex flex-row justify-end w-full space-x-8 mr-10">
          <FontAwesomeIcon icon={faUser} className="mt-4" />
          <h3 className="mt-3 cursor-pointer" onClick={handleSignIn}>
            Sign In
          </h3>
          <h3 className="mt-3 cursor-pointer" onClick={handleCart}>
            Cart
          </h3>
          <img
            src={KfcCart}
            alt="Cart"
            width={60}
            height={60}
            className="cursor-pointer"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Header;
