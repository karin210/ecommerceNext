import Layout from "@layouts/Layout";
import CheckoutWizard from "components/CheckoutWizard";
import React from "react";
import { useForm } from "react-hook-form";

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const submitHandler = () => {};
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)}>
        <h1>Shipping Address</h1>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            autoFocus
            {...register("fullName", {
              required: "Please enter full name",
            })}
          />
          {errors.fullName && <div>{errors.fullName.message}</div>}
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            {...register("addres", {
              required: "Please enter address",
              minLength: { value: 3, message: "Address is more than 2 chars" },
            })}
          />
          {errors.address && <div>{errors.address.message}</div>}
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            id="postalCode"
            {...register("postalCode", {
              required: "Please enter postal code",
            })}
          />
          {errors.postalCode && <div>{errors.postalCode.message}</div>}
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            {...register("country", {
              required: "Please enter country",
            })}
          />
          {errors.country && <div>{errors.country.message}</div>}
        </div>
        <div>
          <button>Next</button>
        </div>
      </form>
    </Layout>
  );
}
