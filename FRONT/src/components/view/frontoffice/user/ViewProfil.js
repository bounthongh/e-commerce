import React from "react";

import { Row, Col, Divider} from 'antd';

import FormEditUser from "./FormEditUser";
import ListBookings from "./ListBookings";

const layout = {
    xs: 24,
    xxl: 12,
};



export default function ViewProfil() {

    return (
        <>
            <Row
                gutter={[16,16]}
            >
                <Col
                    {...layout}
                >
                    <FormEditUser/>
                </Col>
                <Col
                    {...layout}
                >
                    <ListBookings/>
                </Col>
            </Row>

        </>
    );
};