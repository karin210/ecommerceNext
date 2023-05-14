import Link from "next/link";
import React from "react";
import styles from "@styles/components/ProductItem.module.scss";

export default function ProductItem({ product }) {
  return (
    <div className={styles.itemContainer}>
      <Link legacyBehavior href={`/product/${product.slug}`}>
        <a>
          <img className={styles.img} src={product.image} alt={product.name} />
        </a>
      </Link>
      <div>
        <Link legacyBehavior href={`/product/${product.slug}`}>
          <a>
            <h2 className={styles.name}>{product.name}</h2>
          </a>
        </Link>
        <p>{product.brand}</p>
        <p>${product.price}</p>
        <button type="button">Add to cart</button>
      </div>
    </div>
  );
}
