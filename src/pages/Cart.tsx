import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/Store";
import type { CartItem } from "../Types";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  removeFromCart,
  updateQuantity,
  decreaseQuantity,
  clearCart,
} from "../slices/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // ✅ Calculate total items
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleIncreaseQuantity = (id: number, currentQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">MY CART ({totalItems} items)</h1>
          {cartItems.length > 0 && (
            <button
              onClick={() => handleClearCart}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length > 0 ? (
          <div className="space-y-6">
            {/* Cart Items */}
            <ul className="space-y-4">
              {cartItems.map((item: CartItem, index) => (
                <li
                  key={`${item.id}-${index}`} // ✅ Fixed: unique key for each cart entry
                  className="flex items-center justify-between border p-4 rounded shadow bg-white"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-600">{item.type}</p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        -
                      </button>
                      <span className="font-semibold text-lg min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleIncreaseQuantity(item.id, item.quantity)
                        }
                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Price and Remove */}
                    <div className="text-right">
                      <p className="text-red-600 font-bold text-lg">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.originalPrice && (
                        <p className="text-sm line-through text-gray-400">
                          ₹{(item.originalPrice * item.quantity).toFixed(2)}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        ₹{item.price} each
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Cart Summary */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold">Total Items:</span>
                <span className="text-xl">{totalItems}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold">Total Price:</span>
                <span className="text-2xl font-bold text-red-600">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold text-lg"
                onClick={() =>
                  navigate("/CheckOut", {
                    state:{price:totalPrice,items:totalItems},
                  })
                }
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-12 text-lg">
            Your Cart is Empty
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
