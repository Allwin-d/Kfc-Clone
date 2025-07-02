import FrontPoster from "../media/FrontPoster.jpg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Menu } from "../Types";
import { API_URL } from "../Api";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  const fetchDetails = async (): Promise<Menu> => {
    const response = await axios.get<Menu>(API_URL);
    console.log(response.data);
    return response.data;
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["menu"],
    queryFn: fetchDetails,
  });

  if (isLoading) {
    return <h2>Loading Data....</h2>;
  }
  if (isError) {
    return <h2>Failed to Fetch Data ....{error.message}</h2>;
  }

  return (
    <div className="flex flex-col space-y-4 h-auto">
      <Header />
      <div>
        <img src={FrontPoster} className="rounded-md"></img>
      </div>

      {/* this is for browse categories section  */}
      <div className="w-full flex flex-col justify-center items-center ">
        <h1 className="font-bold text-3xl text-center">
          BROWSE MENU CATEGORIES
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mt-3 p-2 ">
          {data?.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-gray-200 p-4 cursor-pointer transition hover:scale-105 duration-200"
              >
                <img
                  className=" "
                  src={item.products[0].imageUrl}
                  width={270}
                  height={190}
                ></img>
                <span className="text-center  font-semibold">
                  {item.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
