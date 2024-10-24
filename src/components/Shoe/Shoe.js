import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import cartImage from "../images/cart1.svg";
import { CartContext } from "../../CartContext";
import Tooltip from "@material-ui/core/Tooltip";

function Shoe({ shoe, keyName }) {
  const [cart, setCart] = useContext(CartContext);

  // State to handle the selected size
  const [selectedSize, setSelectedSize] = useState("");

  // Add to cart function
  const addToCart = (shoeProduct) => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => shoeProduct.name === item.name && item.size === selectedSize
    );

    // Condition
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...shoeProduct,
        quantity: 1,
        size: selectedSize, // Include selected size
      };
      newCart.push(itemInCart);
    }

    setCart(newCart);
    // Optionally clear the selected size after adding to cart
    setSelectedSize("");
  };

  return (
    <div className="hvr-grow products">
      <h3 className="shoe-name">{shoe.name}</h3>
      <h2 className="shoe-price">${shoe.price}</h2>
      <Link key={keyName} to={`/product/${keyName}`}>
        <img
          className="products-shoe-image"
          title={shoe.name}
          alt={shoe.name}
          src={shoe.img}
        />
      </Link>
      <br />

      {/* Size selector */}
      <div>
        <label htmlFor="size-select">Choose a size:</label>
        <select
          id="size-select"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Select size</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">X-Large</option>
        </select>
      </div>
      {selectedSize && <p className="selected-size-message">Selected Size: {selectedSize}</p>}

      {/* Add to cart button */}
      <Tooltip title="Add to cart" aria-label="add to cart">
        <button
          onClick={() => addToCart(shoe)}
          className={`cart-button ${!selectedSize ? 'disabled' : ''}`} // Optional disabled class
          disabled={!selectedSize} // Disable the button if no size is selected
        >
          <img className="cart-image" src={cartImage} alt="add to cart" />
        </button>
      </Tooltip>
    </div>
  );
}

export default Shoe;
