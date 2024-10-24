import React, { useState } from "react";
import Shoes from "../../latestShoes.json";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  // Gestionnaire pour la barre de recherche
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrer les chaussures en fonction du terme de recherche
  const filteredShoes = Object.keys(Shoes).filter((keyName) => {
    const shoe = Shoes[keyName];
    return shoe.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <div className="banner-image"></div>
      <div>
        <span className="tagline">JUST DO IT</span>
        <div className="tagline-para">
          Furthermore, our partnership with FC Barcelona represents the perfect fusion of performance and passion. 
          For decades, Nike and Barcelona have collaborated to create iconic kits that reflect the club's rich history and culture while pushing the boundaries of innovation and style on and off the field. Together, we strive to celebrate excellence,
          inspire millions of fans, and promote the spirit of football worldwide.
        </div>

        <br />
        <br />
        <br />

        {/* Barre de recherche */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search shoes..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>

        <div className="latest-container">
          <hr className="line" /> &nbsp; &nbsp;
          <span className="latest-designs">Latest Designs</span>&nbsp;&nbsp;
          <hr className="line" />
          <br />
          <br />
          <div className="product-container image-gallery">
            {filteredShoes.map((keyName) => {
              const shoe = Shoes[keyName];
              return (
                <div className="home-products" key={keyName}>
                  <img
                    className="products-shoe-image"
                    alt={shoe.name}
                    src={shoe.img}
                  />
                  <h3 className="shoe-name">{shoe.name}</h3>
                  <h3 className="shoe-price">${shoe.price}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

