import { useParams } from "react-router-dom";
import Shoes from "../../shoes.json";
import "../../App.css";
import { Link } from "react-router-dom";
import BackImage from "../../images/back.svg";
import { useState } from "react";

function ProductItems({ addToCart }) {
  const { id } = useParams();
  const shoe = Shoes[id];

  // State to hold selected size
  const [selectedSize, setSelectedSize] = useState("");

  // If shoe not found
  if (!shoe) {
    return <h2>Product Not Found!</h2>;
  }

  // Function to handle adding item to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size!");
      return;
    }

    const item = {
      id: id,
      name: shoe.name,
      price: shoe.price,
      size: selectedSize,
      img: shoe.img2
    };

    addToCart(item);
    alert(`${shoe.name} added to cart with size ${selectedSize}`);
  };

  return (
    <div>
      <Link className="back-btn" to="/product">
        <img src={BackImage} alt="Go Back" height={30} title="back" />
      </Link>
      <div className="product-items">
        <h3 className="shoe-name">{shoe.name}</h3>
        <h2 className="shoe-price">Price: ${shoe.price}</h2>
        <img
          className="shoe-image"
          alt="Shoe"
          title={shoe.name}
          src={shoe.img2}
        />
        
        {/* Size Selection */}
        <div className="size-selection">
          <h4>Select Size:</h4>
          {["S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className={`size-button ${selectedSize === size ? "selected" : ""}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductItems;
