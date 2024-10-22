
import RouterFunction from "./Router";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { CartProvider } from "./CartContext";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <div className={"container"}>
      <CartProvider>
        <Provider store={store}>
          <RouterFunction />
          <Footer />
        </Provider>
      </CartProvider>
    </div>
  );
}

export default App;
