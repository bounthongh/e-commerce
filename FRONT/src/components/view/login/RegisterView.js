import React, {useState} from "react";
import {Card} from "antd";
import {Link} from "react-router-dom";
import FormRegisterCustomer from "./FormRegisterCustomer";
import FormRegisterVendor from "./FormRegisterVendor";


export default function RegisterView() {

    const [key, setKey] = useState('tab1');
    const tabList = [
        {
            key: 'tab1',
            tab: 'Acheteur',
        },
        {
            key: 'tab2',
            tab: 'Commerçant',
        },
    ];

    const contentList = {
        tab1: <FormRegisterCustomer/>,
        tab2: <FormRegisterVendor/>,
    };

    return (
        <Card
            style={{width: '100%', minWidth: '200px'}}
            title={<h2>Inscription</h2>}
            extra={<Link to={'/login'} >Connexion</Link>}
            tabList={tabList}
            activeTabKey={key}
            onTabChange={newkey => setKey(newkey)}
        >
            {contentList[key]}
        </Card>
    )
}
