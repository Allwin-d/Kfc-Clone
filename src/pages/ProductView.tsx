import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Menu, Product } from "../Types";
import { API_URL } from "../Api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/CartSlice";
import type { AppDispatch, RootState } from "../store/Store";
import { useState, useMemo } from "react";
import Sidebar from "../components/Sidebar";

const ProductView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart);
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchAllProducts = async (): Promise<Menu> => {
    const { data } = await axios.get<Menu>(API_URL);
    return data;
  };

  const { data, isError, isLoading, error } = useQuery<Menu, Error>({
    queryKey: ["ProductView"],
    queryFn: fetchAllProducts,
  });

  // Filter products based on search query
  const filteredData = useMemo(() => {
    if (!data || !searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase().trim();

    return data
      .map((category) => ({
        ...category,
        products: category.products.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.type.toLowerCase().includes(query) ||
            category.category.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.products.length > 0);
  }, [data, searchQuery]);

  const getItemQuantity = (productId: number) => {
    const item = cartItems.find((cartItem) => cartItem.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product: Product) => {
    try {
      dispatch(addToCart(product));
      setAddedItems((prev) => new Set([...prev, product.id]));

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

  const clearSearch = () => {
    setSearchQuery("");
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
      <div className="w-full flex flex-row">
        <Sidebar />
        <div className="container mx-auto px-4 py-8 w-3/5 ml-96">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Menu</h1>
            <p className="text-gray-600">Discover our delicious offerings</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search products, categories, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-red-600 focus:border-red-600 sm:text-sm"
              />
              {searchQuery && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    onClick={clearSearch}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Search Results Info */}
            {searchQuery && (
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  {filteredData && filteredData.length > 0 ? (
                    <>
                      Showing results for "
                      <span className="font-semibold text-gray-800">
                        {searchQuery}
                      </span>
                      "
                      {filteredData.reduce(
                        (total, category) => total + category.products.length,
                        0
                      ) === 1 ? (
                        <span> - 1 product found</span>
                      ) : (
                        <span>
                          {" "}
                          -{" "}
                          {filteredData.reduce(
                            (total, category) =>
                              total + category.products.length,
                            0
                          )}{" "}
                          products found
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      No results found for "
                      <span className="font-semibold text-gray-800">
                        {searchQuery}
                      </span>
                      "
                      <button
                        onClick={clearSearch}
                        className="ml-2 text-red-600 hover:text-red-700 underline"
                      >
                        Clear search
                      </button>
                    </>
                  )}
                </p>
              </div>
            )}
          </div>

          {filteredData?.map((category) => (
            <div
              key={category.id}
              id={`category-${category.id}`}
              className="mb-12 scroll-mt-20"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  {category.category}
                  {searchQuery && (
                    <span className="ml-2 text-lg font-normal text-gray-600">
                      ({category.products.length}{" "}
                      {category.products.length === 1 ? "item" : "items"})
                    </span>
                  )}
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
                            {product?.originalPrice && (
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
                            disabled={isJustAdded}
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

          {/* No results message */}
          {searchQuery && (!filteredData || filteredData.length === 0) && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or browse our categories
              </p>
              <button
                onClick={clearSearch}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Show All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
