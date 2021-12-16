import React, {useEffect, useState} from "react";
import {Button,  Card, Layout,  PageHeader} from 'antd';
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import {Link, useHistory} from "react-router-dom";
import CartButton from './cart/CartButton';
import {LogoutOutlined} from '@ant-design/icons';
import {request} from "../lib/request";
import Cookies from "js-cookie";

const { Footer, Content} = Layout;
export default function PrivateLayout({components: Component, breads: breads , ...rest}) {
    let history = useHistory();
    const [cart, setCart] = useState({});
    const logoutUser = () => {
        Cookies.remove('user');
        Cookies.remove('accessToken');
        history.push('/login');
    };

    useEffect(() => {
        request.get(
            `/carts/active`,
            {},
            (res) => {
                setCart(res.data)
            },
            (err) => console.error(err)
        )
    }, []);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <PageHeader
                style={{backgroundColor: '#00A654'}}
                onBack={() => window.history.back()}
                title="Les Marchés Dé Confinés"
                subTitle={`${request.getUser().USR_FIRST_NAME} ${request.getUser().USR_LAST_NAME}`}
                extra={[
                    <Link key={1} to={'/customers/user'} style={{color: '#FFF'}} >
                        {request.getUser().USR_LOGIN}
                    </Link>,
                    <CartButton cart={cart} setCart={setCart} key={2}/>,
                    <Button key={3} onClick={logoutUser} shape={'circle'} type='primary'>
                        <LogoutOutlined />
                    </Button>
                ]}
            />
            <Content style={{padding: '16px 50px'}}>
                <Breadcrumbs breads={breads}/>
                <Card style={{marginTop: '16px'}}>
                    <Component cart={cart} setCart={setCart} />
                </Card>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                Copyright © ETNA {new Date().getFullYear()}
            </Footer>
        </Layout>
    );
}
