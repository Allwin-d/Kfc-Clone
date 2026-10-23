import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/Store";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../Types";
import { fetchMenu } from "../Api";
import { addToCart } from "../slices/CartSlice";
import { useState } from "react";

const Offers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [addedItems, setAddedItems] = useState<{ [key: string]: number }>({});

  const { isError, isLoading, data } = useQuery({
    queryKey: ["Deals"],
    queryFn: fetchMenu,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold">Loading Data...</h2>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="flex flex-col space-y-6">
            <div className="flex">
              <p className="text-4xl font-semibold">
                ❌ Failed to Fetch Products{" "}
              </p>
            </div>
            <div>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 hover:transition duration-150 ease-in"
              >
                Click to Reload
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function handleCart(product: Product, productKey: string) {
    try {
      dispatch(addToCart(product));
      setAddedItems((prev) => ({
        ...prev,
        [productKey]: (prev[productKey] || 0) + 1,
      }));
    } catch {
      console.error("Failed to Add Product to Cart");
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 flex justify-center items-start">
      {data?.map((item, i) => {
        return (
          <div
            key={i}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl"
          >
            {item.products
              .filter((val) => {
                return val.discount;
              })
              .map((org, j) => {
                const productKey = `${i}-${j}`; // Unique key for each product
                const addedCount = addedItems[productKey] || 0;
                return (
                  <div
                    key={j}
                    className="border-2 rounded-lg hover:scale-[0.98] transition duration-300 ease-in cursor-pointer bg-white w-full p-4 sm:p-5 hover:shadow-lg"
                  >
                    <div className="">
                      <div className="flex flex-col space-y-2">
                        <img
                          src={org.imageUrl}
                          alt={org.name}
                          className="rounded-lg"
                        ></img>
                        <p className="font-medium text-xl  ">{org.name}</p>
                        <p className="font-sans text-[15px]">{org.type}</p>
                        <p className="font-bold">
                          ₹:{org.price} {""}
                          {""}
                          {""}
                          <small className="line-through">
                            {org.originalPrice}
                          </small>
                        </p>
                        <button
                          onClick={() => handleCart(org, productKey)}
                          className="bg-red-600 text-white rounded-lg hover:bg-red-700 hover:transition duration-200 ease-in py-3"
                        >
                          {" "}
                          Add To Cart{" "}
                        </button>
                        {addedCount > 0 && addedCount && (
                          <div>
                            <p className="font-medium text-[15px]">
                              Added Items : {addedCount}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default Offers;
