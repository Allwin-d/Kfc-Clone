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

  // Function to handle smooth scrolling to category section
  const scrollToCategory = (categoryId: number) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (isLoading) {
    return <h2>Loading data .... </h2>;
  }

  if (isError) {
    return <h2>Failed to ... fetch data {error.message}</h2>;
  }

  return (
    <div className="flex flex-col space-y-4 mt-2 w-2/5 fixed p-4 max-h-screen ml-16">
      <p className="font-bold text-black text-4xl">KFC MENU</p>
      {data?.map((item) => {
        return (
          <div key={item.id}>
            <button
              onClick={() => scrollToCategory(item.id)}
              className="text-gray-600 font-sans hover:text-red-600 hover:font-semibold transition-colors duration-200 cursor-pointer text-left w-full"
            >
              {item.category}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;