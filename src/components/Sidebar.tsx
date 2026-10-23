import { useQuery } from "@tanstack/react-query";
import { fetchMenu } from "../Api";

const Sidebar = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Sidebar"],
    queryFn: fetchMenu,
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
    <nav className="w-full lg:w-64 lg:shrink-0 lg:sticky lg:top-24 lg:self-start p-3 sm:p-4 lg:ml-4">
      <p className="hidden lg:block font-bold text-black text-3xl mb-4">KFC MENU</p>
      <div className="flex flex-row lg:flex-col gap-3 lg:gap-2 overflow-x-auto lg:overflow-visible whitespace-nowrap pb-2 lg:pb-0">
      {data?.map((item) => {
        return (
          <div key={item.id}>
            <button
              onClick={() => scrollToCategory(item.id)}
              className="text-gray-600 font-sans hover:text-red-600 hover:font-semibold transition-colors duration-200 cursor-pointer text-left lg:w-full text-sm sm:text-base"
            >
              {item.category}
            </button>
          </div>
        );
      })}
      </div>
    </nav>
  );
};

export default Sidebar;