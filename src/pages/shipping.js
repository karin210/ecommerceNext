import Layout from "@layouts/Layout";
import CheckoutWizard from "components/CheckoutWizard";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Store } from "../../utils/Store";

export default function ShippingScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    router.push("/payment");
  };

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
            {...register("address", {
              required: "Please enter address",
              minLength: { value: 3, message: "Address is more than 2 chars" },
            })}
          />
          {errors.address && <div>{errors.address.message}</div>}
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            id="city"
            {...register("city", {
              required: "Please enter city",
            })}
          />
          {errors.city && <div>{errors.city.message}</div>}
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

ShippingScreen.auth = true;
