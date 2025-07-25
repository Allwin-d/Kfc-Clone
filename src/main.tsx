import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import Store from "./store/Store"; 
import Header from "./components/Header";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={Store}>
      {" "}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <App />
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
