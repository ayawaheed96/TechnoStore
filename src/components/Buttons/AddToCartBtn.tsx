"use client";
import { useContext } from "react";
import { Product } from "../../../interfaces/Product";
import { Store } from "../../../store/Store";
import { toast } from "react-toastify";

interface IAddToCart {
  product: Product;
}
const AddToCartBtn = ({ product }: IAddToCart) => {
  const { id, title, price, image } = product;
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = () => {
    const productData = {
      id,
      title,
      price,
      image,
    };
    const existItem = cart.cartItems.find((item) => item.id === productData.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const countInStock = existItem
      ? existItem.countInStock - quantity > 0
        ? existItem.countInStock - quantity
        : 0
      : 10;
    if (existItem && existItem.countInStock === 0) {
      toast.error("Sorry! Out of stock");
    } else {
      toast.success("Sucessfully added to cart");
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...productData, quantity, countInStock },
      });
    }
  };
  return (
    <>
      <button
        className="w-[3.5rem] h-[3.5rem] bg-amber-200 rounded-full flex items-center justify-center"
        onClick={() => addToCartHandler()}
      >
        <img
          loading="lazy"
          src="/cart.svg"
          alt="cart"
          className="w-[2rem] h-[2rem] cursor-pointer"
        />
      </button>
    </>
  );
};

export default AddToCartBtn;
