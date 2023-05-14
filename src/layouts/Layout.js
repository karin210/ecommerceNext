import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "@styles/layout/Layout.module.scss";
export default function Layout({ children, title }) {
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
              <a>Cart</a>
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
