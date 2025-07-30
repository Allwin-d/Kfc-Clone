import FrontPoster from "../media/FrontPoster.jpg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Menu } from "../Types";
import { API_URL } from "../Api.ts";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const fetchDetails = async (): Promise<Menu> => {
    const data = await axios.get<Menu>(API_URL);
    console.log(data.data);
    return data.data;
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["menu"],
    queryFn: fetchDetails,
  });

  if (!data) {
    return;
  }
  if (isLoading) return <p>Loading..</p>;
  if (isError) return <p>Error </p>;
  console.log(data);
  console.log(API_URL);

  // Function to navigate to ProductView and scroll to specific category
  const navigateToCategory = (categoryId: number) => {
    navigate("/products");

    // Small delay to ensure the page loads before scrolling
    setTimeout(() => {
      const element = document.getElementById(`category-${categoryId}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Loading Data...</h2>
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
            Failed to Fetch Data
          </h2>
          <p className="text-gray-600">{error || "Something went wrong"}</p>
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
    <div className="flex flex-col space-y-4 h-auto">
      <div>
        <img src={FrontPoster} className="rounded-md" alt="KFC Front Poster" />
      </div>

      {/* Browse categories section */}
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl text-center">
          BROWSE MENU CATEGORIES
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mt-3 p-2">
          {data.length > 0 &&
            data?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-gray-200 p-4 cursor-pointer transition hover:scale-105 duration-200 rounded-lg shadow-md hover:shadow-lg"
                  onClick={() => navigateToCategory(item.id)}
                >
                  <img
                    className="w-full h-48 object-cover rounded-md mb-3"
                    src={item.products[0].imageUrl}
                    alt={item.category}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/270x190?text=No+Image";
                    }}
                  />
                  <div className="text-center">
                    <span className="font-semibold text-lg text-gray-800 hover:text-red-600 transition-colors">
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
