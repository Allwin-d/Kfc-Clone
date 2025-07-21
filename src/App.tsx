import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import CheckOut from "./pages/CheckOut";
import Final from "./pages/Final";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/final" element={<Final />} />
      </Routes>
    </div>
  );
}

export default App;
