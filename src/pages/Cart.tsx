import Header from "../components/Header";
import { useGlobalContext } from "../context/context";

const Cart = () => {
  const { cartItems } = useGlobalContext();
  console.log(cartItems);
  return (
    <div className="min-h-screen">
      <Header />
      <p className="font-bold text-black ">MY CART</p>
      {cartItems ? (
        <div>
          <ul>
            {cartItems.map((item) => {
              return (
                <div key={item.id}>
                  <p>hello</p>
                </div>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>Your Cart is Empty </p>
      )}
    </div>
  );
};

export default Cart;
