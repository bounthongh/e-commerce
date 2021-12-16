import React, { useState } from "react";
import { Button,  Card, Layout } from 'antd';
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {Link, Redirect, useHistory} from "react-router-dom";
import Cookies from "js-cookie";
import {LogoutOutlined} from "@ant-design/icons";
import {request} from "../lib/request";
import {PageHeader} from "antd";

const { Footer, Content } = Layout;
export default function AdminLayout({ components: Component, breads: breads, ...rest }) {
    let history = useHistory();
    const logoutUser = () => {
        Cookies.remove('user')
        Cookies.remove('accessToken')
        history.push('/login');
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
                <PageHeader
                    style={{backgroundColor: '#00A654'}}
                    onBack={() => window.history.back()}
                    title="Les Marchés Dé Confinés"
                    subTitle={'Admin'}
                    extra={[
                        <Link key={1} to={'/user'} style={{color: '#FFF'}} >
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
                    <Component {...rest} />
                </Card>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Copyright © ETNA {new Date().getFullYear()}
            </Footer>
        </Layout>
    );
}
