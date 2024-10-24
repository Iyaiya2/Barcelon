import React, { useState } from "react";
import "../../App.css"; 
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import cartImage from "../../images/cart1.svg";
import { store, add, selectProducts, setTotalItems } from "../../store";

function Product() {
  // État local pour la barre de recherche
  const [searchTerm, setSearchTerm] = useState("");

  // Select Data from redux store
  const products = useSelector(selectProducts);

  const cartProducts = products.filter((product) => product.added);
  store.dispatch(setTotalItems(cartProducts.length));

  // Gestionnaire de changement pour la barre de recherche
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrer les produits en fonction du terme de recherche
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Barre de recherche */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>

      <div className="product-container">
        {filteredProducts.map((product) => {
          // variables
          let id = product.id;
          let title = product.title;
          let imageUrl = product.imageUrl;
          let price = product.price;

          return (
            <div key={id} className="hvr-grow products">
              <h3 className="shoe-name">{title} </h3>
              <h2 className="shoe-price"> ${price} </h2>
              <Link key={id} to={`/product/${id}`}>
                <img
                  className="products-shoe-image"
                  title={title}
                  alt={title}
                  src={imageUrl}
                />
              </Link>
              <br />
              <Tooltip title="Add to cart" aria-label="add to cart">
                <button
                  onClick={() => store.dispatch(add(product))}
                  className="cart-button"
                >
                  <img
                    className="cart-image"
                    src={cartImage}
                    alt="add to cart"
                  />
                </button>
              </Tooltip>
            </div>
          );
        })}
      </div>
      <div className="page-wrapper"></div>
    </div>
  );
}

export default Product;
