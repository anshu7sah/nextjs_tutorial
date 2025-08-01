"use client";

import { useCurrent } from "@/hooks/use-current";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { ApiError } from "next/dist/server/api-utils";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      reject(new ApiError("Error loading the script element of razorpay", 500));
    };

    document.body.appendChild(script);
  });
}

const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const { data } = useCurrent();
  // if (!data) {
  //   redirect("/signin");
  // }
  // console.log(data);

  const handlePay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      console.error("Error loading razorpay checkout");
    }

    const { data } = await axios.post("http://localhost:5000/api/create-order");

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      order_id: data.order_id,
      handler: function (res) {
        alert("payment successful");
        // navigate("/successpage")
      },
      notes: {
        id: "anshu",
        receipt: data.receipt,
      },
    };

    const paymentData = new window.Razorpay(options);
    paymentData.open();

    paymentData.on("payment.failed", function (res) {
      window.alert("payment failed");
    });
  };

  const handleStripePay = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/api/create-checkout-session"
    );
    console.log(data);
    const { error } = await stripe.redirectToCheckout({
      sessionId: data.url,
    });
    if (error) {
      console.error("error arise while opening checkout session");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-green-500 text-black px-12 py-5 cursor-pointer hover:bg-green-300"
        onClick={handlePay}
      >
        Razorpay
      </button>
      <button
        className="bg-green-500 text-black px-12 py-5 cursor-pointer hover:bg-green-300"
        onClick={handleStripePay}
      >
        Stripe Pay
      </button>
    </div>
  );
}
