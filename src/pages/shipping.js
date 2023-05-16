import Layout from "@layouts/Layout";
import CheckoutWizard from "components/CheckoutWizard";
import React from "react";

export default function ShippingScreen() {
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
    </Layout>
  );
}
