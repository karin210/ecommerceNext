import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import CheckoutWizard from "components/CheckoutWizard";
import Layout from "@layouts/Layout";
import { Store } from "../../utils/Store";

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  console.log(shippingAddress);
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/placeorder");
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form onSubmit={submitHandler}>
        <h1>Payment Method</h1>
        {["Paypal", "Stripe", "CashOnDelivery"].map((payment) => (
          <div key={payment}>
            <input
              type="radio"
              name="paymentMethod"
              id={payment}
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label htmlFor={payment}>{payment}</label>
          </div>
        ))}
        <div>
          <button onClick={() => router.push("/shipping")} type="button">
            Back
          </button>
          <button>Next</button>
        </div>
      </form>
    </Layout>
  );
}

PaymentScreen.auth = true;
