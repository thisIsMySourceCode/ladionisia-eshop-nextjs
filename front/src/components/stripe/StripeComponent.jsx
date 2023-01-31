import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { useState, useEffect } from "react";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const StripeComponent = ({ totalPrice, cart }) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',

    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#3D3A35',
      colorText: '#ffff',
      colorDanger: '#df1b41',
      fontFamily: 'Montserrat, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
      fontSizeSm: '1.25rem',
      // See all possible variables below
    },
    rules: {
      '.Label': {
        color: 'black',
        fontWeight: 700,
        marginBottom: '6px'
      },
      '.Input': {
        padding: '12px'
      }
      // See all supported class names and selector syntax below
    }
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe mt-6">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm cart={cart} totalPrice={totalPrice} />
        </Elements>
      )}
    </div>
  );
}
 
export default StripeComponent;