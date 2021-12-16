import React, {useState} from "react";
import {Card, Row, Col, InputNumber, message, Tooltip} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {request} from "../../../lib/request";

const col_size = {
    xs: 24,
};

export default function CardProduct({product, cart, setCart}) {
    const [quantite, setQuantite] = useState(0);


    const onChangeQuantite = (value) => {
        if (Number.isInteger(value)) {
            setQuantite(value);
        }
    };

    const addProductToCart = async (product) => {
        if (quantite > 0) {
            let temp = [{
                PDT_ID: product.PDT_ID,
                CXP_QTY: quantite,
            }];
            cart.PRODUCTS.map(row => {
                console.log(row);
                temp.push({
                    PDT_ID: row.PDT_ID,
                    CXP_QTY: parseFloat(row.carts_x_products_cxp.CXP_QTY),
                })
            });
            await request.put(
                `/carts`,
                {
                    CRT_ID: cart.CRT_ID,
                    CUS_ID: request.getUser().CUSTOMER.CUS_ID,
                    PRODUCTS: temp
                },
                () => {
                    setCart({...cart, PRODUCTS: [...cart.PRODUCTS, product]})
                    message.success('Le Produit a été ajouté à votre Panier');

                },
                () => message.error('Une erreur est survenue lors de l\'ajout du produit au panier'),
            )
        } else {
            message.error('la quantité doit être renseigné')
        }

    };

    return (
        <>
            <Card
                hoverable
                cover={
                    <img alt={product.PDT_NAME} src={product.PDT_IMAGE}/>
                }
            >
                <Row
                    gutter={[16, 16]}
                    type={'flex'}
                    justify={'center'}

                    style={{textAlign: 'center'}}
                >
                    <Col {...col_size}>
                        {product.PDT_NAME}
                    </Col>
                    <Col {...col_size}>
                        Prix: {product.PDT_PRICE} € / {product.PDT_UNIT}
                    </Col>
                    <Col {...col_size}>
                        <Link to={`/customers/vendors/${product.VENDOR.VDR_ID}`}>
                            Commercant : {product.VENDOR.VDR_NAME}
                        </Link>
                    </Col>
                </Row>
                <Row
                    type={'flex'}
                    justify={'center'}
                    style={{textAlign: 'center'}}
                >
                    <Col xs={24} md={12}>
                        {product.PDT_QUANTITY > 0 ? <InputNumber
                            key="number"
                            min={0.1}
                            max={product.PDT_QUANTITY}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ' + product.PDT_UNIT}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={onChangeQuantite}
                        /> : 'Plus de stock'}
                    </Col>
                    <Col xs={24} md={24}>
                        {product.PDT_QUANTITY > 0 ?<Tooltip title={'ajouter au panier'}>
                            <PlusOutlined
                                key="add"
                                onClick={() => addProductToCart(product)}
                            />
                        </Tooltip>: null}
                    </Col>
                </Row>
            </Card>
        </>
    )
}
