import { useEffect } from "react";
import "../../App.css";
import SummaryCard from "../SummaryCard/SummaryCard";
import clearCartImage from "../../images/empty-cart.svg";
import crossImage from "../../images/cross3.svg";
import { useSelector } from "react-redux";
import {
  store,
  remove,
  emptyCart,
  selectProducts,
  selectTotalItems,
  setTotalItems,
  selectTotalAmount,
  setTotalAmount,
  incrementProduct,
  decrementProduct,
} from "../../store";

function Cart() {
  // Get total Items from store
  const totalItems = useSelector(selectTotalItems);
  // Get total Amount from store
  const totalAmount = useSelector(selectTotalAmount);
  // Get products from store
  const products = useSelector(selectProducts);
  // Filter Cart products
  const cartProducts = products.filter((product) => product.added);
  
  // Set total Items
  store.dispatch(setTotalItems(cartProducts.length));

  // Calculate Total Amount
  const sum = cartProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  // Use Effect to update total amount in store
  useEffect(() => {
    store.dispatch(setTotalAmount(Number(sum).toFixed(2)));
  }, [sum]);

  return (
    <div>
      <SummaryCard items={totalItems} amount={totalAmount} />
      {/* Empty Cart button */}
      {cartProducts.length > 0 && (
        <div>
          <button
            className="clear-cart-button"
            onClick={() => store.dispatch(emptyCart(products))}
          >
            <img
              className="clear-cart-image"
              src={clearCartImage}
              alt="Empty Cart"
              title="Empty Cart"
            />
          </button>
          <h3 className="your-products">Your Products</h3>
        </div>
      )}

      {/* Get Products */}
      <div className="cart-container">
        {cartProducts.map((product) => {
          const { id, title, imageUrl, price, quantity } = product;

          return (
            <div key={id} className="cart-products">
              <h3 className="cart-shoe-name">{title}</h3>
              <button
                className="remove-btn hvr-grow"
                onClick={() => store.dispatch(remove(product))}
              >
                <img
                  src={crossImage}
                  height={30}
                  alt="Remove"
                  title="Remove"
                />
              </button>
              <br />
              <h2 className="shoe-price-cart">${price}</h2>
              <label htmlFor={`quantity-${id}`}>Items</label>
              <div className="quantity-controls">
                <button
                  className="item-button"
                  onClick={() => store.dispatch(decrementProduct(product))}
                >
                  -
                </button>
                <input
                  readOnly
                  className="quantity"
                  type="text"
                  id={`quantity-${id}`}
                  value={quantity}
                />
                <button
                  className="item-button"
                  onClick={() => store.dispatch(incrementProduct(product))}
                >
                  +
                </button>
              </div>
              <br />
              <img className="cart-shoe-image" alt={title} src={imageUrl} />
              <br />
            </div>
          );
        })}
      </div>

      {cartProducts.length === 0 && (
        <p>Your cart is currently empty.</p>
      )}
    </div>
  );
}

export default Cart;
