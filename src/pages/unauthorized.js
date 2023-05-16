import Layout from "@layouts/Layout";
import { useRouter } from "next/router";
import React from "react";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title="Unauthorized Page">
      <h1>Access Denied</h1>
      {message && <div>{message}</div>}
    </Layout>
  );
}
