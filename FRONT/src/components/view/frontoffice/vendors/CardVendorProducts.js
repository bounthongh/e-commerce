import React, {useEffect, useState} from "react";
import {request} from "../../../lib/request";
import { Col, message, Row} from "antd";
import CardProduct from "../home/CardProduct";
const col_size = {
    xs: 24,
    sm: 12,
    md: 12,
};
export default function CardVendorProducts({id_vendor}) {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        request.get(`/products`, {}, (res) => {
            setProducts(res.data.filter(row => row.VDR_ID === id_vendor));
        }, () => {
             message.error('Impossible d\'afficher les Produits du Commerçant');
        })
    }, [id_vendor]);

    return (
        <>
            <Row
                style={{textAlign: 'center',}}
                type={'flex'}
                justify={'center'}
                gutter={[16,16]}
            >
                <Col xs={24} md={24}>
                    {products.map(row => {
                            return (
                                <Col key={row.PDT_ID} {...col_size}>
                                    <CardProduct  product={row} />
                                </Col>
                            )
                        }
                    )}
                </Col>

            </Row>
        </>
    );

}
