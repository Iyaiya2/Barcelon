import { useEffect } from "react";
import "../../App.css";
import SummaryCard from "../SummaryCard/SummaryCard";
import clearCartImage from "../../images/empty-cart.svg";
import crossImage from "../../images/cross3.svg";
import { useSelector, useDispatch } from "react-redux";
import {
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
  const dispatch = useDispatch(); // Utiliser useDispatch pour dispatcher des actions

  // Get total Items from store
  const totalItems = useSelector(selectTotalItems);
  // Get total Amount from store
  const totalAmount = useSelector(selectTotalAmount);
  // Get products from store
  const products = useSelector(selectProducts);
  // Filter Cart products
  const cartProducts = products.filter((product) => product.added);

  // Set total Items
  useEffect(() => {
    dispatch(setTotalItems(cartProducts.length)); // Utiliser dispatch à la place de store.dispatch
  }, [cartProducts, dispatch]);

  // Calculate Total Amount
  const sum = cartProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  // Use Effect to update total amount in store
  useEffect(() => {
    dispatch(setTotalAmount(Number(sum).toFixed(2))); // Utiliser dispatch pour mettre à jour le total
  }, [sum, dispatch]);

  return (
    <div>
      <SummaryCard items={totalItems} amount={totalAmount} />
      
      {/* Empty Cart button */}
      {cartProducts.length > 0 && (
        <div>
          <button
            className="clear-cart-button"
            onClick={() => dispatch(emptyCart(products))} // Utiliser dispatch pour vider le panier
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

      {/* Display Cart Products */}
      <div className="cart-container">
        {cartProducts.length > 0 ? (
          cartProducts.map((product) => {
            const { id, title, imageUrl, price, quantity, size } = product;

            return (
              <div key={id} className="cart-products">
                <h3 className="cart-shoe-name">{title}</h3>
                <button
                  className="remove-btn hvr-grow"
                  onClick={() => dispatch(remove(product))} // Utiliser dispatch pour enlever le produit
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
                <p className="shoe-size-cart">Size: {size || 'Not selected'}</p> {/* Display size */}
                <label htmlFor={`quantity-${id}`}>Items</label>
                <div className="quantity-controls">
                  <button
                    className="item-button"
                    onClick={() => dispatch(decrementProduct(product))} // Utiliser dispatch pour décrémenter
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
                    onClick={() => dispatch(incrementProduct(product))} // Utiliser dispatch pour incrémenter
                  >
                    +
                  </button>
                </div>
                <br />
                <img className="cart-shoe-image" alt={title} src={imageUrl} />
                <br />
              </div>
            );
          })
        ) : (
          <p>Your cart is currently empty.</p>
        )}
      </div>
    </div>
  );
}

export default Cart;
