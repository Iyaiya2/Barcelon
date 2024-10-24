import { productState } from "../states/productState";
import { createSlice } from '@reduxjs/toolkit';  // Assure-toi que l'importation est correcte
// productSlice.js

import { addToCart as addToCartFromStore } from '../../store'; // Renommer l'importation pour éviter le conflit

// Action pour ajouter un produit au panier
export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product,
});



// Create Product Slice
const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {
    // Actions
    // Add
    add: (state, action) => {
      return state.map((item) => {
        // Find the item
        if (item.id !== action.payload.id) {
          return item;
        }

        // Add it to the cart
        return {
          ...item,
          added: true,
          quantity: item.quantity + 1,
        };
      });
    },
    // Remove
    remove: (state, action) => {
      return state.map((item) => {
        // Find the item
        if (item.id !== action.payload.id) {
          return item;
        }

        // Remove it from the cart
        return {
          ...item,
          added: false,
          quantity: item.quantity * 0,
        };
      });
    },
    // Empty Cart
    emptyCart: (state, action) => {
      return state.map((item) => {
        return {
          ...item,
          added: false,
          quantity: item.quantity * 0,
        };
      });
    },
    // Increment Product
    incrementProduct: (state, action) => {
      // Increment logic
      return state.map((item) => {
        // Find the item
        if (item.id !== action.payload.id) {
          return item;
        }

        // Add it to the cart
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      });
    },

    // Decrement Product
    decrementProduct: (state, action) => {
      // Decrement logic
      return state.map((item) => {
        // Find the item
        if (item.id !== action.payload.id) {
          return item;
        }

        // Add it to the cart
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      });
    },
  },
});

export default productSlice;
