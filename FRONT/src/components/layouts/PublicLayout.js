import React from "react";
import {Row, Col} from 'antd';
import {Layout} from 'antd';
const {Content} = Layout;



export default function PublicLayout({components: Component , ...rest}) {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Content>
                <Row type="flex" justify="center" align="middle" style={{height: '100vh'}}>
                    <Col xs={20}>
                        <Component {...rest}/>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}