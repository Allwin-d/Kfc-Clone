import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import axios from "axios";
import type { Menu } from "../Types";
import { API_URL } from "../Api";
import Footer from "../components/Footer";
import { useGlobalContext } from "../context/context";

const ProductView = () => {
  const { addToCart } = useGlobalContext();

  const fetchAllProducts = async (): Promise<Menu> => {
    const response = await axios.get<Menu>(API_URL);
    console.log(response);
    return response.data;
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["ProductView"],
    queryFn: fetchAllProducts,
  });

  if (isLoading) {
    return <h2 className="text-center py-8">Loading Data...</h2>;
  }

  if (isError) {
    return (
      <h2 className="text-center py-8 text-red-600">
        Failed to fetch Data: {error.message}
      </h2>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {data ? (
          data.map((item) => (
            <div key={item.id} className="mb-12">
              <h1 className="text-2xl font-bold mb-6">{item.category}</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {item.products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="font-semibold text-lg mb-2">
                        {product.name}
                      </h2>
                      <p className="text-gray-600 mb-1">Type: {product.type}</p>
                      <p className="text-gray-800 font-medium mb-2">
                        ₹{product.price}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        {product.description}
                      </p>
                      <button
                        className="w-2/3 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center py-8 text-red-600">
            Failed to Fetch Data
          </h2>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductView;
