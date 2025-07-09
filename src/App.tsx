import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";
import CheckOut from "./pages/CheckOut";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/ProductView" element={<ProductView />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/SignIn" element={<SignIn />}></Route>
        <Route path="/CheckOut" element={<CheckOut />}></Route>
      </Routes>
    </div>
  );
}

export default App;
