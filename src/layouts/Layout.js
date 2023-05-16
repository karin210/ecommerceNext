import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "@styles/layout/Layout.module.scss";
import { Store } from "../../utils/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import DropdownLink from "components/DropdownLink";
import Cookies from "js-cookie";

export default function Layout({ children, title }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    // console.log(session);
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };
  return (
    <>
      <Head>
        <title>{title ? title + "- Amazona" : "Amazona"}</title>
        <meta name="description" content="Ecommerce Website" />
      </Head>
      <ToastContainer limit={1} />
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
            {status === "loading" ? (
              "Loading"
            ) : session?.user ? (
              <Menu as="div">
                <Menu.Button>{session.user.name}</Menu.Button>
                <Menu.Items>
                  <Menu.Item>
                    <DropdownLink href="/profile">Profile</DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink href="/order-history">
                      Order History
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <a href="#" onClick={logoutClickHandler}>
                      Logout
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <Link legacyBehavior href="/login">
                <a>Login</a>
              </Link>
            )}
          </nav>
        </header>
        <main>{children}</main>
        <footer>Footer</footer>
      </div>
    </>
  );
}
