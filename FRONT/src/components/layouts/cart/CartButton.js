import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Badge, Button, Tooltip} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {request} from "../../lib/request";


export default function CartButton({cart, setCart}) {

    return (
        <Tooltip title={'Panier'}>
            <Link to={'/customers/cart'}>
                <Badge count={cart && cart.PRODUCTS ? cart.PRODUCTS.length : 0} showZero>
                    <Button
                        className={'nav-cart-button'}
                        type={'primary'}
                        size={'large'}
                        shape={'circle'}
                    >
                        <ShoppingCartOutlined/>
                    </Button>
                </Badge>
            </Link>
        </Tooltip>
    );
}