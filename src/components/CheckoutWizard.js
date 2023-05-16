import React from "react";
import styles from "@styles/components/CheckoutWizard.module.scss";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className={styles.stepsContainer}>
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            key={step}
            className={`${styles.step} ${index <= activeStep && styles.active}`}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
