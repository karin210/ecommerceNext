import Layout from "@layouts/Layout";
import React from "react";
import Link from "next/link";
import styles from "@styles/LoginPage/LoginScreen.module.scss";
import { useForm } from "react-hook-form";

export default function LoginScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = ({ email, password }) => {};
  return (
    <Layout title="Login">
      <form onSubmit={handleSubmit(submitHandler)}>
        <h1>Login</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            name="email"
            id="email"
            autofocus
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Please enter password",
              minLength: { value: 6, message: "password is more than 5 chars" },
            })}
            name="password"
            id="password"
            autofocus
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
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
