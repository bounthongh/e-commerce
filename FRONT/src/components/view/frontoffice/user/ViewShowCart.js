import React, {useEffect, useState} from "react";
import {Row, Col, Divider} from "antd";
import {useParams} from "react-router-dom";
import {request} from "../../../lib/request";

export default function ViewShowCart() {
    const [total, setTotal] = useState(0);
    const [acart, setACart] = useState({});
    const {id} = useParams();
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

    useEffect(() => {
        request.get(
            `/carts/${id}`,
            {},
            (res) => {
                console.log(res.data)
                caculTotal(res.data)
                setACart(res.data)
            },
            (err) => console.error(err))
    },[id])



    return (
        <>
            <Row
                style={{textAlign: 'center',}}
                type={'flex'}
                justify={'center'}
            >
                <Col xs={24}>
                    {acart.PRODUCTS ? acart.PRODUCTS.map((item, index) =>
                        <div key={index}>
                            <Row

                                style={{textAlign: 'center',}}
                                type={'flex'}
                                justify={'center'}
                            >
                                <Col xs={6}>
                                    {index === 0 ? '' : '+'}
                                </Col>
                                <Col xs={6}>
                                    {(item.PDT_PRICE * item.carts_x_products_cxp.CXP_QTY)} €
                                </Col>
                                <Col xs={6}>
                                    {item.carts_x_products_cxp.CXP_QTY} {item.PDT_UNIT} {item.PDT_NAME}
                                </Col>
                                <Col xs={6}>
                                    {item.PDT_PRICE} € / {item.PDT_UNIT}
                                </Col>
                            </Row>
                            <Divider dashed={index < (acart.PRODUCTS.length - 1)}/>
                        </div>
                    ) : null}
                </Col>
            </Row>
            <Row
                style={{textAlign: 'center'}}
                gutter={[16, 16]}
            >
                <Col xs={6}>
                    Total
                </Col>
                <Col xs={6}>
                    {total} €
                </Col>
            </Row>
        </>
    );

}