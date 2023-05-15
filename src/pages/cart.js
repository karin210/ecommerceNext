import Layout from "@layouts/Layout";
import Link from "next/link";
import React, { useContext } from "react";
import { Store } from "../../utils/Store";
import styles from "@styles/CartScreen.module.scss";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  return (
    <Layout title="Shopping Cart">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty
          <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <Link legacyBehavior href={`/product/${item.slug}`}>
                        <a>
                          <img
                            className={styles.img}
                            src={item.image}
                            alt={item.name}
                          />
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>${item.price}</td>
                    <td>
                      <button onClick={() => removeItemHandler(item)}>X</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <ul>
              <li>
                <p>
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </p>
              </li>
              <li>
                <button onClick={() => router.push("login?redirect=/shipping")}>
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

// Set the page as a dynamic page that renders only in the client to avoid hidration issues
export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
