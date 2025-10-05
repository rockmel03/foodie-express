// import React, { useEffect, useState } from "react";

const useRazorPay = () => {
  // const [isLoaded, setIsLoaded] = useState(false);

  const payNow = async (
    { amount, orderId, user: { _id, name, email, contact } },
    handler = (res) => console.log("payment success", res)
  ) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: "Foodie Express",
      description: "Food purchase",
      order_id: orderId, // This is the order_id created in the backend
      // callback_url: import.meta.env.VITE_CLINT_BASE_URL + "/payment-success", // Your success URL
      handler,
      prefill: {
        name,
        email,
        contact,
      },
      notes: {
        userId: _id,
      },
      theme: {
        color: "#F37254",
      },
    };

    // if (!isLoaded) return;

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.onload = () => setIsLoaded(true);
  //   script.onerror = () => setIsLoaded(false);
  //   document.body.appendChild(script);

  //   return () => {
  //     script.remove();
  //   };
  // }, []);

  return { payNow };
};

export default useRazorPay;
