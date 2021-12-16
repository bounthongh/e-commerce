import React, {useState, useEffect} from 'react';
import {DeleteFilled,  EditFilled} from '@ant-design/icons';
import {Button, Col, message, Row, Table, Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import {request} from "../../../lib/request";

function Products() {

    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        getAllProducts()
    }, [])

    const getAllProducts = () => {
        request.get('/products',
            {},
            res => setProductsList(res.data),
            () => message.error("Impossible de charger les données"),
        );
    }
    const deleteProduct = id => {
        request.delete(`/products/${id}`,
            {},
            () => getAllProducts(),
            () => message.error("Impossible de supprimer le produit"),
        );
    }

    const columns = [
        {
            title: 'Image',
            dataIndex: 'PDT_IMAGE',
            key: 'image',
            align: 'center',
            render: (data) => <img style={{textAlign: 'center',height: '60px'}}
                         src={data}
                         alt={"*image*"}/>
        },
        {
            title: 'Nom',
            dataIndex: 'PDT_NAME',
            key: 'name',
        },
        {
            title: 'Prix',
            dataIndex: 'PDT_PRICE',
            key: 'price',
        },
        {
            title: 'Quantité',
            dataIndex: 'PDT_QUANTITY',
            key: 'quantity',
        },
        {
            title: 'Action',
            dataIndex: 'PDT_ID',
            key: 'id',
            render: (data) => (
                <Row
                    gutter={[16]}
                    type={'flex'}
                    style={{textAlign: 'center'}}
                >
                    <Col xs={24} md={24} lg={12}>
                        <Tooltip title="Editer">
                            <Link to={`/vendors/products/edit/${data}`}>
                                <Button type={'primary'} shape={'circle'}>
                                    <EditFilled/>
                                </Button>
                            </Link>
                        </Tooltip>

                    </Col>
                    <Col xs={24} md={24} lg={12}>
                        <Tooltip title="Supprimer">
                            <Button
                                onClick={() => deleteProduct(data)}
                                type={'danger'}
                                shape="circle"
                            >
                                <DeleteFilled/>
                            </Button>
                        </Tooltip>
                    </Col>
                </Row>
            )
        },
    ];

    return (
        <>
            <Table
                bordered
                rowKey={'PDT_ID'}
                columns={columns}
                dataSource={productsList}
                footer={() => <Link to='/vendors/products/new'>Ajouter un Produit</Link>}
            />
        </>
    );
}

export default Products;
