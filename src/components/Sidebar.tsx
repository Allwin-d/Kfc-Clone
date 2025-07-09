import { useQuery } from "@tanstack/react-query";
import type { Menu } from "../Types";
import axios from "axios";
import { API_URL } from "../Api";

const Sidebar = () => {
  const fetchproduct = async (): Promise<Menu> => {
    const { data } = await axios.get<Menu>(API_URL);
    console.log(data, "data from sidebar component");
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Sidebar"],
    queryFn: fetchproduct,
  });

  if (isLoading) {
    return <h2>Loading data .... </h2>;
  }

  if (isError) {
    return <h2>Failed to ... fetch data {error.message}</h2>;
  }

  return (
    <div className="flex flex-col space-y-4 mt-2  w-2/5 fixed p-4 max-h-screen ml-16 ">
      <p className="font-bold text-black text-4xl ">KFC MENU </p>
      {data?.map((item) => {
        return (
          <div>
            <p className="text-gray-600 font-sans  ">
              {item.category}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
