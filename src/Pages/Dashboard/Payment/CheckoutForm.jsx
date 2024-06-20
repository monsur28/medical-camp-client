import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CheckoutForm = ({ camp }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const campFee = parseInt(camp.campfees.replace("$", ""));
  if (isNaN(campFee)) {
    console.warn(`Invalid camp fee for camp:`, camp);
  }

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        if (campFee > 0) {
          const response = await axiosSecure.post("/create-payment-intent", {
            price: campFee,
          });
          setClientSecret(response.data.clientSecret);
        }
      } catch (error) {
        console.error("Error fetching client secret:", error);
        setError("Failed to fetch payment details. Please try again later.");
      }
    };

    fetchClientSecret();
  }, [axiosSecure, campFee]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    try {
      // Create payment method
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        throw new Error(error.message);
      }
      // Confirm payment
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent.status === "succeeded") {
        console.log("Payment intent:", paymentIntent);
        setTransactionId(paymentIntent.id);

        // Save payment details in database
        const payment = {
          email: user.email,
          price: campFee,
          transactionId: paymentIntent.id,
          date: new Date(),
          campId: camp._id,
          campName: camp.campName,
          status: "pending", // You might update status based on backend response
        };

        const response = await axiosSecure.post("/payments", payment);
        console.log("Payment saved:", response.data);

        // Show success message and navigate to payment history
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thank you for the Payment",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/paymentHistory");
      }
    } catch (error) {
      console.error("Error processing payment:", error.message);
      setError(error.message || "Payment failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay {camp.campfees}
      </button>
      {error && <p className="text-red-600">{error}</p>}
      {transactionId && (
        <p className="text-green-600"> Your transaction id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
