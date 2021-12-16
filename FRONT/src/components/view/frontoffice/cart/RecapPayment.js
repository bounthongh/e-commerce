import React, {useEffect, useState} from "react";
import {Row, Col, Divider, Button, Tooltip, message} from "antd";
import {Link} from "react-router-dom";
import {request} from "../../../lib/request";
import {DeleteOutlined} from "@ant-design/icons";

export default function RecapPayment({cart, setCart}) {
    const [total, setTotal] = useState(0);

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

    useEffect(()=>{
        caculTotal(cart);
    },[cart])

    const deleteProduct = (id) => {

        let temp = [];

        let temp2 = cart.PRODUCTS.filter((row) => row.PDT_ID !== id);


        temp2.map(row => {
            temp.push({
                PDT_ID: row.PDT_ID,
                CXP_QTY: parseFloat(row.carts_x_products_cxp.CXP_QTY),
            })
        });
        request.put(
            `/carts`,
            {...cart, PRODUCTS: temp},
            () => {
                message.success('Le Produit a été suprimé à votre Panier');
                setCart({...cart, PRODUCTS: [...temp2]});
                caculTotal({...cart, PRODUCTS: [...temp2]});
            },
            () => message.error('Une erreur est survenue lors de l\'ajout du produit au panier'),
        )
    };


    return (
        <>
            <Row
                style={{textAlign: 'center',}}
                type={'flex'}
                justify={'center'}
            >
                <Col xs={24}>
                    {cart.PRODUCTS ? cart.PRODUCTS.map((item, index) =>
                        <div key={index}>
                            <Row

                                style={{textAlign: 'center',}}
                                type={'flex'}
                                justify={'center'}
                            >
                                <Col xs={4}>
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
                                <Col xs={2}>
                                    <Tooltip title={'Supprimer'}>
                                        <Button shape={'circle'} onClick={() => deleteProduct(item.PDT_ID)}
                                                type={'danger'}>
                                            <DeleteOutlined/>
                                        </Button>
                                    </Tooltip>
                                </Col>
                            </Row>
                            <Divider dashed={index < (cart.PRODUCTS.length - 1)}/>
                        </div>
                    ) : null}
                </Col>
            </Row>
            <Row
                style={{textAlign: 'center',}}
                gutter={[16, 16]}
            >
                <Col xs={4}>
                    Total
                </Col>
                <Col xs={6}>
                    {total} €
                </Col>
                <Col xs={24}>
                    {total !== 0 ? <Link to={{
                        pathname: '/customers/dropoff',
                    }}>
                        <Button
                            type={'primary'}
                            block
                        >
                            Payer
                        </Button>
                    </Link> : null}

                </Col>
            </Row>
        </>
    );

}