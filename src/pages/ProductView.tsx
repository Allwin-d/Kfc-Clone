import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import type { Menu, Product } from "../Types"; // ✅ Import Product type
import { API_URL } from "../Api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/CartSlice";
import type { AppDispatch, RootState } from "../store/Store";
import { useState } from "react";

const ProductView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart);
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());

  const fetchAllProducts = async (): Promise<Menu> => {
    const { data } = await axios.get<Menu>(API_URL);
    return data;
  };

  const { data, isError, isLoading, error } = useQuery<Menu, Error>({
    queryKey: ["ProductView"],
    queryFn: fetchAllProducts,
  });

  // ✅ Get quantity of specific item in cart
  const getItemQuantity = (productId: number) => {
    const item = cartItems.find((cartItem) => cartItem.id === productId);
    return item ? item.quantity : 0;
  };

  // ✅ FIXED: Handle add to cart with proper typing and error handling
  const handleAddToCart = (product: Product) => {
    try {
      dispatch(addToCart(product));

      // ✅ Show visual feedback
      setAddedItems((prev) => new Set([...prev, product.id]));

      // ✅ Remove feedback after 2 seconds
      setTimeout(() => {
        setAddedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Loading Products...</h2>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Failed to fetch products
          </h2>
          <p className="text-gray-600">{error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Menu</h1>
          <p className="text-gray-600">Discover our delicious offerings</p>
        </div>

        {data?.map((category) => (
          <div key={category.id} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {category.category}
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-red-600 to-transparent ml-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.products.map((product) => {
                const quantity = getItemQuantity(product.id);
                const isJustAdded = addedItems.has(product.id);

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/300x200?text=No+Image";
                        }}
                      />
                      {product.discount && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold">
                          {product.discount}
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-1 text-sm">
                        {product.type}
                      </p>

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-red-600 font-bold text-lg">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-gray-400 line-through text-sm">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        {product.serves && (
                          <span className="text-gray-500 text-sm">
                            Serves {product.serves}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <button
                          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                            isJustAdded
                              ? "bg-green-600 text-white"
                              : "bg-red-600 text-white hover:bg-red-700"
                          }`}
                          onClick={() => handleAddToCart(product)}
                          disabled={isJustAdded} // ✅ Prevent multiple clicks during feedback
                        >
                          {isJustAdded ? "Added! ✓" : "Add to Cart"}
                        </button>

                        {quantity > 0 && (
                          <div className="ml-3 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                            {quantity} in cart
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ProductView;