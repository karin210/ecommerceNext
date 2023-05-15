import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "@styles/layout/Layout.module.scss";
import { Store } from "../../utils/Store";
export default function Layout({ children, title }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      <Head>
        <title>{title ? title + "- Amazona" : "Amazona"}</title>
        <meta name="description" content="Ecommerce Website" />
      </Head>
      <div>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Link legacyBehavior href="/">
              <a>amazona</a>
            </Link>
            <Link legacyBehavior href="/cart">
              <a className={styles.cartLink}>
                Cart
                {cartItemsCount > 0 && (
                  <span className={styles.numberItems}>{cartItemsCount}</span>
                )}
              </a>
            </Link>
            <Link legacyBehavior href="/login">
              <a>Login</a>
            </Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>Footer</footer>
      </div>
    </>
  );
}
