import Layout from "@layouts/Layout";
import React from "react";
import Link from "next/link";
import styles from "@styles/LoginPage/LoginScreen.module.scss";

export default function LoginScreen() {
  return (
    <Layout title="Login">
      <form>
        <h1>Login</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" autofocus />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" autofocus />
        </div>
        <div>
          <button className={styles.btn}>Login</button>
        </div>
        <div>Don&apos;t have an account? &nbsp;</div>
        <Link href="register"></Link>
      </form>
    </Layout>
  );
}
