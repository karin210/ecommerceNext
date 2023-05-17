import Layout from "@layouts/Layout";
import Link from "next/link";
import React, { useContext } from "react";
import styles from "@styles/product/ProductScreen.module.scss";
import { Store } from "../../../utils/Store";
import db from "../../../utils/db";
import Product from "../../../models/Product.";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  if (!product) {
    return <Layout title="Product not found">Product not found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
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

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
