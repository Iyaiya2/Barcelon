import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // Utiliser v6
import Home from "./components/Home/Home";
import Product from "./components/Product/Product";
import ProductItems from "./components/ProductItems/ProductItems";
import About from "./components/About/About";
import Nav from "./components/Nav/Nav";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
function AppRouter() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ordersummary" element={<OrderSummary />} />
        <Route path="/product/:id" element={<ProductItems />} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
