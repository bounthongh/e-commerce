import React from "react";

import CheckoutForm from "./CheckoutForm"
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useParams} from "react-router-dom";



export default function PaymentView() {
    const {id} = useParams();
    const stripePromise = loadStripe('pk_test_qJYA48FjlTGUMcWYkUig8blG006Pbad2sZ');
    return (
        <>
            <Elements stripe={stripePromise}>
                <CheckoutForm id={id}/>
            </Elements>
        </>
    );

}