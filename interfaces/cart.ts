export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  countInStock: number;
}

export interface CartState {
  cartItems: CartItem[];
}
export interface AppState {
  cart: CartState;
}

interface AddToCartAction {
  type: "ADD_TO_CART";
  payload: CartItem;
}

interface RemoveItemFromCartAction {
  type: "REMOVE_ITEM_FROM_CART";
  payload: CartItem;
}

interface ClearCartItemsAction {
  type: "Clear_Cart_Items";
}
export type TCartAction =
  | AddToCartAction
  | RemoveItemFromCartAction
  | ClearCartItemsAction;
