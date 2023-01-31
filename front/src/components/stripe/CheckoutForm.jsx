import React, { useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { PaypalCheckotButton } from '../PaypalCheckoutButton'
import GenericButton from "../GenericButton";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { getAllUsersDb, selectAllUsers } from "../../features/comments/commentsSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import { useUser } from "@auth0/nextjs-auth0/client";


export default function CheckoutForm({ totalPrice, cart }) {
  const router = useRouter()
  const { user } = useUser();
  const users = useSelector(selectAllUsers)
  const userExistente = users.find(u => u.email === user?.email)
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const dispatch = useAppDispatch()
  const billingDetails = {
    email: userExistente?.email,
  };
  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );


    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);
  const send = async () => {
    const response = await axios.post(`${process.env.RESTURL_PRODUCTS}/sendEmail`,
      //aca debe ir el email de usuario loggeado
      {
        userEmail: billingDetails.email,
        products: cart
      })
    return response.data
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      // confirmParams: {
      //   // Make sure to change this to your payment completion page
      //   return_url:  'http://localhost:3000/products/payment-successfulul'
      // },
    })
    console.log(paymentIntent)
    if (paymentIntent && paymentIntent.status === 'succeeded') {
      send()
      Router.push(`/products/payment-successful?payment_intent=${paymentIntent.id}&payment_intent_client_secret=${paymentIntent.client_secret}&redirect_status=succeeded`)
    }
    else {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      }
      else {
        setMessage("An unexpected error occurred.");
        setErrorModal(true)
      }
    }

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  const isPaymentDisable = isLoading || !stripe || !elements || !cart.length

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllUsersDb());
    }
    fetchData()
  }, [])
  console.log(userExistente)
  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <div className="border-t border-black pt-6 my-6">
          <span className="flex font-bold text-2xl justify-between">
            <p>Total</p>
            <p className="text-gray-700">${totalPrice}</p>
          </span>
        </div>
        <button
          disabled={isPaymentDisable}
          id="submit"
          className={`group relative flex justify-center py-6 px-4 rounded-2xl w-full ${isPaymentDisable ? "bg-gray-400 opacity-75" : "bg-[#3D3A35] hover:bg-[#1f1e1e]"}`}
        >
          <span id="button-text">
            {isLoading ?
              <div className="spinner text-2xl text-center text-white" id="spinner">Please wait...</div>
              : <p className="text-2xl text-center text-white">Pay now</p>
            }
          </span>
        </button>
      </form>

      {errorModal && (
        <div className="backdrop-blur-sm bg-black flex fixed w-screen h-screen inset-0 bg-opacity-30" style={{ zIndex: 999 }}>
          <div className="bg-white max-w-[50%] mx-auto my-auto rounded p-10">
            <h3 className="text-lg text-semibold uppercase text-gray-500 text-center">
              Payment failed
            </h3>
            <p className="text-gray-400 font-light py-4">
              {message}
            </p>
            <div className="flex space-x-6 border-t border-slate-200 pt-6">
              <GenericButton
                label="Accept"
                size="sm"
                onClick={() => setErrorModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}