"use client";
import { createContext, useReducer } from "react";
import Cookies from "js-cookie";
import { AppState, TCartAction } from "../interfaces/cart";

export const Store = createContext<{ state: AppState; dispatch: React.Dispatch<TCartAction> }>({} as any);

const cartCookie = Cookies.get("cart");
const cartItems = cartCookie ? JSON.parse(cartCookie) : [];

const initialState:AppState  = {
    cart:{
        cartItems
    }
};

function reducer(state:AppState, action:TCartAction):AppState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.id === newItem.id
      );
      let cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.id == existItem.id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cart", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "REMOVE_ITEM_FROM_CART": {
      const selectedItem = action.payload;
      let cartItems = state.cart.cartItems.filter(
        (item) => item.id !== selectedItem.id
      );
      Cookies.set("cart", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "Clear_Cart_Items": {
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [],
        },
      };
    }
    default:
      return state;
  }
}
export function StoreProvider({ children } : { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
