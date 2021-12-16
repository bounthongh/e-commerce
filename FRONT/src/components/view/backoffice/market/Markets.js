import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button, Tooltip, message, Table, Row, Col} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {request} from "../../../lib/request";

function Markets() {
    const [marketsList, setMarketLists] = useState([])

    const columns = [
        {
            title: 'Nom',
            dataIndex: 'MKT_NAME',
            key: 'name',
        },
        {
            title: 'Adresse',
            dataIndex: 'MKT_ADDRESS',
            key: 'address',
        },
        {
            title: 'Code Postal',
            dataIndex: 'MKT_ZIP_CODE',
            key: 'zip',
        },
        {
            title: 'Ville',
            dataIndex: 'MKT_CITY',
            key: 'city',
        },
        {
            title: 'Actions',
            dataIndex: 'MKT_ID',
            key: 'id',
            render: (data) => (
                <Row
                    gutter={[16]}
                    type={'flex'}
                    style={{textAlign: 'center'}}
                >
                    <Col xs={12}>
                        <Link
                            to={`/admin/markets/edit/${data}`}
                        >
                            <Tooltip title="Editer">
                                <Button
                                    type={'primary'}
                                    shape="circle"
                                >
                                    <EditOutlined/>
                                </Button>
                            </Tooltip>
                        </Link>
                    </Col>
                    <Col xs={12}>
                        <Tooltip title="Suprimer">
                            <Button
                                onClick={() => deleteMarket(data)}
                                type={'danger'}
                                shape="circle"
                            >
                                <DeleteOutlined/>
                            </Button>
                        </Tooltip>
                    </Col>
                </Row>
            )
        },
    ];

    useEffect(() => {
        getAllMarkets();
    }, [])

    const getAllMarkets = () => {
        request.get(
            '/markets',
            {}, res => setMarketLists(res.data),
            () => message.error('Impossible de charger les données')
        );
    }
    const deleteMarket = id => {
        request.delete(
            `/markets/${id}`,
            {},
            (res) => {
                if (res.data.statusCode === 200) {
                    getAllMarkets();
                    message.success('Le Marché a bien été suprimmé')
                }
            },
            () => message.error('Impossible de supprimer le Marché')
        );

    }
    return (
        <>
            <Table
                bordered
                columns={columns}
                dataSource={marketsList}
                rowKey={'MKT_ID'}
                footer={() =>   <Link to='/admin/markets/new'>Ajouter un Marché</Link>}
            />

        </>
    );
}

export default Markets;
