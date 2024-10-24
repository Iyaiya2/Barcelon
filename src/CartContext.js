import { createContext, useState } from "react";

// Cart Context
export const CartContext = createContext();

// Shipping Details Context
export const ShippingContext = createContext();

export const CartProvider = (props) => {
  // Maintain Cart State
  const [cart, setCart] = useState({
    products: [],
    totalAmount: 0,
    totalItems: 0,
  });

  // Maintain Shipping State
  const [shippingState, setShippingState] = useState({
    address: '',
    shippingCost: 0,
  });

  // Add product to cart
  const addToCart = (product, size) => {
    const newCart = { ...cart };
    const productInCart = newCart.products.find(item => item.id === product.id && item.size === size);

    if (productInCart) {
      productInCart.quantity += 1;  // Increment quantity if product already exists in cart
    } else {
      newCart.products.push({
        ...product,
        size,  // Assign selected size directly (ES6 shorthand)
        quantity: 1,
      });
    }

    // Update cart totals
    newCart.totalItems = newCart.products.reduce((total, item) => total + item.quantity, 0);
    newCart.totalAmount = newCart.products.reduce((total, item) => total + (item.price * item.quantity), 0);

    setCart(newCart);
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    const newCart = { ...cart };
    newCart.products = newCart.products.filter(item => item.id !== productId);

    // Update cart totals
    newCart.totalItems = newCart.products.reduce((total, item) => total + item.quantity, 0);
    newCart.totalAmount = newCart.products.reduce((total, item) => total + (item.price * item.quantity), 0);

    setCart(newCart);
  };

  // Empty the cart
  const emptyCart = () => {
    setCart({
      products: [],
      totalAmount: 0,
      totalItems: 0,
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart }}>
      <ShippingContext.Provider value={[shippingState, setShippingState]}>
        {props.children}
      </ShippingContext.Provider>
    </CartContext.Provider>
  );
};
