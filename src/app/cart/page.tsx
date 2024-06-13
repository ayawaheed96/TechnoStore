"use client";
import Link from "next/link";
import { CartItem } from "../../../interfaces/cart";
import { Store } from "../../../store/Store";
import { useContext } from "react";
import { BreadCrumb } from "@/components/BreadCrumb/BreadCrumb";

const Cart = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const removeItem = (item: CartItem) => {
    dispatch({ type: "REMOVE_ITEM_FROM_CART", payload: item });
  };

  const handleUpdatedQuantity = (item: CartItem, qty: string) => {
    const quantity = Number(qty);
    dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
  };

  return (
    <>
      <BreadCrumb children={['cart']} />
      <h1 className="mb-4 text-2xl mt-2">Shopping Cart</h1>
      {cart.cartItems.length == 0 ? (
        <div className="ml-10 mt-10 w-full flex justify-start items-center">
          <span className="text-xl"> The cart is empty &nbsp;</span>
          <span className="primary-button">
            <Link href="/">Go To Shopping</Link>
          </span>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5 text-right">Subtotal</th>
                  <th className="p-5 ">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems?.map((item) => {
                  return (
                    <tr key={item.id} className="border-b">
                      <td>
                        <div className="flex items-center text-xl mr-6 lg:mr-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="rounded shadow"
                            width={60}
                            height={60}
                          />
                          &nbsp;
                          {`${item.title}`.slice(0, 15)}
                        </div>
                      </td>
                      <td className="p-5 text-right text-xl">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdatedQuantity(item, e.target.value)
                          }
                        >
                          {Array.from(Array(item.countInStock).keys()).map(
                            (count) => (
                              <option key={count + 1} value={count + 1}>
                                {count + 1}
                              </option>
                            )
                          )}
                        </select>
                      </td>
                      <td className="p-5 text-right text-xl">${item.price}</td>
                      <td className="p-5 text-right text-xl">
                        ${item.price * item.quantity}
                      </td>

                      <td className="p-5 text-center">
                        <button onClick={() => removeItem(item)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-5">
            <div className="card p-5 border border-gray-200 shadow rounded-xl my-2">
              <ul>
                <li>
                  <div className="pb-5 text-xl">
                    Total: {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    Items
                  </div>
                </li>
                <li>
                  <button className="primary-button w-11/12 flex justify-center items-center text-xl font-bold">
                    $
                    {cart.cartItems.reduce(
                      (a, c) => a + c.quantity * c.price,
                      0
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Cart;
