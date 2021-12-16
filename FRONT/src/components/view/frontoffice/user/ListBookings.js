import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button,  Table, Tooltip} from 'antd';
import {request} from "../../../lib/request";
import {CheckOutlined, CloseOutlined, LoginOutlined} from "@ant-design/icons";

const columns = [
    {
        align: 'center',
        title: 'Payer',
        dataIndex: 'BKG_PAID',
        key: 'payed',
        render: (data) => (
            data ? <Button
                type={'primary'}
                shape="circle"
            >
                <CheckOutlined/>
            </Button> : <Button
                type={'danger'}
                shape="circle"
            >
                <CloseOutlined/>
            </Button>
        )
    },
    {
        align: 'center',
        title: 'Livré',
        dataIndex: 'BKG_DELIVERED',
        key: 'delivered',
        render: (data) => (
            data  ? <Button
                type={'primary'}
                shape="circle"
            >
                <CheckOutlined/>
            </Button> : <Button
                type={'danger'}
                shape="circle"
            >
                <CloseOutlined/>
            </Button>
        )
    },
    {
        align: 'center',
        title: 'Date de commande',
        dataIndex: 'BKG_DATETIME',
        key: 'date',
        render: (data) => {
            let temp = new Date(data);
            return (
                <>
                    {`${temp.getHours()}:${temp.getMinutes()} ${temp.getDay()}/${temp.getMonth()}/${temp.getFullYear()}`}
                </>
            );
        }
    },
    {
        align: 'center',
        title: 'Actions',
        dataIndex: 'CART',
        key: 'cart',
        render: (data) => (
            <Link
                to={`/customers/carts/${data.CRT_ID}`}
            >
                <Tooltip title="Voir la fiche de comande">
                    <Button
                        type={'primary'}
                        shape="circle"
                    >
                        <LoginOutlined/>
                    </Button>
                </Tooltip>
            </Link>
        )
    },
];

export default function ListBookings() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        request.get(`/bookings`, {},
            (res) => setBookings(res.data),
            (err) => console.error(err)
        )
    }, [])

    return (
        <Table
            bordered
            columns={columns}
            dataSource={bookings}
            rowKey={'BKG_ID'}
        />
    );
};