import Layout from "@layouts/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import data from "../../../utils/data";
import styles from "@styles/product/ProductScreen.module.scss";
import { Store } from "../../../utils/Store";

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product not found</div>;
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert("Sorry. Product is out of stock");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };
  return (
    <Layout title={product.name}>
      <div>
        <Link href="/">Back to products</Link>
        <h1>{product.name}</h1>
      </div>
      <div>
        <div>
          <img className={styles.img} src={product.image} alt={product.name} />
        </div>
        <ul>
          <li>
            <h1>{product.name}</h1>
          </li>
          <li>Category: {product.category}</li>
          <li>Brand: {product.brand}</li>
          <li>
            {product.rating} of {product.numReviews} reviews
          </li>
          <li>{product.description}</li>
        </ul>
        <div className={styles.buyBox}>
          <div className={styles.priceSection}>
            <p>Price</p>
            <p>${product.price}</p>
          </div>
          <div className={styles.statusSection}>
            <p>Status</p>
            <p>{product.countInStock > 0 ? "In stock" : "Unavailable"}</p>
          </div>
          <button onClick={addToCartHandler}>Add to cart</button>
        </div>
      </div>
    </Layout>
  );
}
