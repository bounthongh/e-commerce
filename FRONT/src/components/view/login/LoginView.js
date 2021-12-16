import React, {useState} from "react";
import {Card} from "antd";
import FormLogin from "./FormLogin";
import FormForget from "./FormForget";
import {Link} from "react-router-dom";

export default function LoginView() {

    const [key, setKey] = useState('tab1');
    const tabList = [
        {
            key: 'tab1',
            tab: 'Connexion'
        },
        // {
        //     key: 'tab2',
        //     tab: 'Mot-de Passe Oublié ?',
        // },
    ];

    const contentList = {
        tab1: <FormLogin/>,
        tab2: <FormForget/>,
    };


    return (
        <Card
            style={{width: '100%', minWidth: '200px'}}
            title={<h2>Les marchés Dé Confinés</h2>}
            extra={<Link to={'/register'} >Inscription</Link>}
            tabList={tabList}
            activeTabKey={key}
            onTabChange={newkey => setKey(newkey)}
        >
            {contentList[key]}
        </Card>
    )
}
