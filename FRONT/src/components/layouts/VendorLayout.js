import React, { useState } from "react";
import {Button, Card, Layout, PageHeader} from 'antd';
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {Link, Redirect, useHistory} from "react-router-dom";
import Cookies from "js-cookie";
import {request} from "../lib/request";
import {LogoutOutlined} from "@ant-design/icons";

const {  Footer, Content } = Layout;
export default function VendorLayout({ components: Component, breads: breads }) {
    let history = useHistory();
    const logoutUser = () => {
        Cookies.remove('user');
        Cookies.remove('accessToken');
        history.push('/login');
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <PageHeader
                style={{backgroundColor: '#00A654'}}
                onBack={() => window.history.back()}
                title="Les Marchés Dé Confinés"
                subTitle={'Vendeur'}
                extra={[
                    <Link to={'/user'} key={1} style={{color: '#FFF'}} >
                        {request.getUser().USR_LOGIN}
                    </Link>,
                    <Button key={2} onClick={logoutUser} shape={'circle'} type='primary'>
                        <LogoutOutlined />
                    </Button>
                ]}
            />
            <Content style={{ padding: '16px 50px' }}>
                <Breadcrumbs breads={breads} />
                <Card style={{ marginTop: '16px' }}>
                    <Component  />
                </Card>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Copyright © ETNA {new Date().getFullYear()}
            </Footer>
        </Layout>
    );
}
