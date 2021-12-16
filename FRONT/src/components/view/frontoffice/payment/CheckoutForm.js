import React, {useEffect, useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import {useHistory} from "react-router-dom";
import {Button, Col, message, Row} from "antd";
import {request} from "../../../lib/request";
import qs from 'qs';

export default function CheckoutForm({id}) {
    const [total, setTotal] = useState(0);
    const [booking, setBooking] = useState({});
    const [cart, setCart] = useState({});
    let history = useHistory();
    const stripee = useStripe();
    const elements = useElements();

    useEffect(() => {
        request.get(`/bookings/${id}`,
            {},
            (res) => {
                setBooking(res.data)
                request.get(`/carts/${res.data.CART.CRT_ID}`,
                    {},
                    (cart) => {
                        console.log(cart.data);
                        setCart(cart.data);
                        caculTotal(cart.data);
                    },
                    (errc) => console.error(errc),
                )
            },
            (err) => console.error(err),
        )
    }, []);

    const caculTotal = (aCart) => {
        let temp = 0;
        // TODO change this
        if (aCart.PRODUCTS) {
            for (let i = 0; i < aCart.PRODUCTS.length; i++) {
                temp = temp + (aCart.PRODUCTS[i].carts_x_products_cxp.CXP_QTY * aCart.PRODUCTS[i].PDT_PRICE);
            }
        }
        setTotal(temp);
    };


    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripee || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        request.getSecret(`/secret`, {amount: total*100},
            async (res) => {
                const result = await stripee.confirmCardPayment(res.data.client_secret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: `${request.getUser().USR_FIRST_NAME} ${request.getUser().USR_LAST_NAME}`,
                        },
                    }
                });
                if (result.error) {
                    message.error("Une erreur est survenue lors du paiement")
                } else {
                    console.log(result);
                    // The payment has been processed!
                    if (result.paymentIntent.status === 'succeeded') {
                        let temp = [];
                        cart.PRODUCTS.map(row => {
                            temp.push({
                                PDT_ID: row.PDT_ID,
                                CXP_QTY: parseFloat(row.carts_x_products_cxp.CXP_QTY),
                            })
                        });
                        request.put(`/bookings`,
                            {
                                ...booking,
                                BKG_PAID: true,
                            },
                            () => {
                                request.put(`/carts`,
                                    {...cart, PRODUCTS: temp, CRT_IS_ACTIVE: false},
                                    () => {
                                        request.post(`/carts`,
                                            {
                                                "CUS_ID": request.getUser().CUSTOMER.CUS_ID,
                                                "CRT_IS_ACTIVE": true,
                                                "PRODUCTS": []
                                            },
                                            () => {
                                                message.success("Le paiement a bien été effectué")
                                                history.push('/customers/home')
                                            },
                                            () => {
                                                message.error("Une erreur est survenue lors du paiement")
                                            });
                                    }, () => {
                                        message.error("Une erreur est survenue lors du paiement")
                                    },
                                )
                            },
                            () => {
                                message.error("Une erreur est survenue lors du paiement")
                            }
                        )
                    }
                }
            }, (res) => {
                console.error(res);
                message.error("Une erreur est survenue lors du paiement")
            })


    };

    return (
        <form onSubmit={handleSubmit}>
            <Row
                style={{textAlign: 'center',}}
                type={'flex'}
                justify={'center'}
                gutter={[16, 16]}
            >
                <Col xs={24}>
                    <CardSection/>
                </Col>
                <Col xs={24}>
                    <Button htmlType={'submit'} disabled={!stripee}>
                        Payer
                    </Button>
                </Col>
            </Row>
        </form>
    );
}
