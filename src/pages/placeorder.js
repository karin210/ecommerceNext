import Layout from "@layouts/Layout";
import axios from "axios";
import CheckoutWizard from "components/CheckoutWizard";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getError } from "../../utils/error";
import { Store } from "../../utils/Store";
import styles from "@styles/placeorder/PlaceOrder.module.scss";

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1>Place Order</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className={styles.main}>
          <div>
            <div className={styles.field}>
              <h2>Shipping Address</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </div>
              <div>
                <Link href="/shipping">Edit</Link>
              </div>
            </div>
            <div className={styles.field}>
              <h2>Payment Method</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link href="/payment">Edit</Link>
              </div>
            </div>
            <div className={styles.field}>
              <h2>Order Items</h2>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <Link legacyBehavior href={`/product/${item.slug}`}>
                          <a>
                            <img
                              src={item.image}
                              alt={item.name}
                              className={styles.img}
                            />
                            &nbsp;
                            {item.name}
                          </a>
                        </Link>
                      </td>
                      <td>{item.quantity}</td>
                      <td>${item.price}</td>
                      <td>${item.quantity * item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href="/cart">Edit</Link>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h2>Order Summary</h2>
              <ul>
                <li>
                  <div>
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div>
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div>
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div>
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
                <li>
                  <button disabled={loading} onClick={placeOrderHandler}>
                    {loading ? "Loading..." : "Place Order"}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
