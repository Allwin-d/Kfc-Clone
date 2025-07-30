import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/Store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Menu, Product } from "../Types";
import { API_URL } from "../Api";
import { addToCart } from "../slices/CartSlice";
import { useState } from "react";

const Offers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [addedCart,setaddedCart] = useState(0);

  const fetchDealDetails = async () => {
    const { data } = await axios.get<Menu>(API_URL);
    console.log("This is the data from deals page : ", data);
    return data;
  };

  const { isError, isLoading, data, error } = useQuery({
    queryKey: ["Deals"],
    queryFn: fetchDealDetails,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <h2 
          className="text-2xl font-semibold">Loading Data...</h2>
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
              <button
                onClick={() => window.location.reload()}
                className=""
              ></button>
            </div>{" "}
            <div>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 hover:transition duration-150 ease-in "
              >
                Click to Reload
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function handleCart(product: Product) {
    try {
      dispatch(addToCart(product));
      setaddedCart((prev)=>{
        return prev+1;
      })
    } catch (error) {
      console.error("Failed to Add Product to Cart");
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen  py-6 flex justify-center items-center ">
      {data?.map((item, i) => {
        return (
          <div
            key={i}
            className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 "
          >
            {item.products
              .filter((val) => {
                return val.discount;
              })
              .map((org, j) => {
                return (
                  <div
                    key={j}
                    className="   border-2 rounded-lg hover:scale-95 hover:transition duration-500 ease-in cursor-pointer bg-white w-3/4  p-5 hover:shadow-lg"
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
                          onClick={() => handleCart(org)}
                          className="bg-red-600 text-white rounded-lg hover:bg-red-700 hover:transition duration-200 ease-in py-3"
                        >
                          {" "}
                          Add To Cart{" "}
                        </button>
                        {addedCart}
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
