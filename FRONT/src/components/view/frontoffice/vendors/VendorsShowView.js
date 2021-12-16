import React, {useEffect, useState} from "react";
import {request} from "../../../lib/request";
import {Card, Col, Divider, message, Row} from "antd";
import {useHistory, useParams} from 'react-router-dom';
import CardVendorProducts from "./CardVendorProducts";

export default function VendorsShowView() {

    const [vendor, setVendor] = useState({});
    let { id } = useParams();
    const history = useHistory();
    useEffect(() => {
        request.get(`/vendors/${id}`, {}, (res) => {
            setVendor(res.data);
            console.log(res.data)
        }, () => {
            message.error('Impossible d\'afficher la fiche du Commerçant');
            history.goBack();
        })
    }, [ id ]);

    return (
        <>
            <Row
                style={{textAlign: 'center',}}
                type={'flex'}
                justify={'center'}
                gutter={[16,16]}
            >
                <Col xs={24} md={24}>
                    <h1>
                        {vendor.VDR_NAME}
                    </h1>
                </Col>
                <Divider />
                <Col xs={24} md={12}>
                    <Card
                        title={'Marchés'}
                    >
                       <Row>
                           {
                               vendor.MARKETS ? vendor.MARKETS.map(row => {
                                   return(
                                       <Col xs={24} key={row.MKT_ID}>
                                           {row.MKT_ID} {row.MKT_ADDRESS} {row.MKT_CITY} {row.MKT_ZIP_CODE}
                                       </Col>
                                       );
                               }) : null
                           }
                       </Row>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card
                        title={'Produits'}
                    >
                        <CardVendorProducts id_vendor={vendor.VDR_ID} />
                    </Card>
                </Col>

            </Row>
        </>
    );

}
