import React, {useEffect, useState} from "react";
import CardProduct from "./CardProduct";
import {Divider, Col, Input, Row} from "antd";
import {request} from "../../../lib/request";


const col_size = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 6,
};

export default function Catalog({cart, setCart}) {
    const [data, setData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [search, setSearch] = useState('');
    const searchUpdate = (value) => {
        setSearch(value.target.value)
    };

    useEffect(() => {
        setDisplayData(data);
        if (search) {
            setDisplayData(data.filter((value =>  value.PDT_NAME.includes(search))))
        }
    }, [search]);

    useEffect(() => {
        request.get(
            `/products`,
            {},
            (res) => {
                setData(res.data);
                setDisplayData(res.data);
            },
            () => {}
        )
    }, []);
    return (
        <>
            <Row
                type={'flex'}
                justify="center"
                gutter={[16, 32]}
            >
                <Col xs={12}>
                    <Input
                        addonBefore="Rechercher"
                        value={search}
                        onChange={searchUpdate}
                    />
                </Col>
            </Row>
            <Divider />
            <Row
                gutter={[16, 32]}
            >
                {displayData.map(row => {
                        return (
                            <Col key={row.PDT_ID} {...col_size}>
                                <CardProduct cart={cart} setCart={setCart}  product={row}/>
                            </Col>
                        )
                    }
                )}
            </Row>

        </>
    )
}