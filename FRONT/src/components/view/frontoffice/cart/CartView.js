import React from "react";
import {Row, Col, Button} from "antd";
import RecapPayment from "./RecapPayment";

export default function CartView({cart, setCart}) {
    return (
        <>
            <Row
            >
                <Col xs={24}>
                    <RecapPayment  cart={cart} setCart={setCart}/>
                </Col>
            </Row>
        </>
    );

}