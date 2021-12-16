import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Form, Input, Button, message, Select} from 'antd';
import {request} from "../../../lib/request";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};


export default function DropOffForm() {
    const [form] = Form.useForm();
    const [address, setAddress] = useState({});
    const [market, setMarket] = useState({});
    const [cart, setCart] = useState({});
    const [locked, setLocked] = useState(true);
    const history = useHistory();

    useEffect(() => {
        request.get(`/carts/active`, {},
            (res) => setCart({BKG_DELIVERY: undefined, ...res.data}),
            (err) => console.error(err))
        request.get(`/markets/${request.getUser().CUSTOMER.MKT_ID}`, {},
            (res) => setMarket(res.data),
            (err) => console.error(err))
        setAddress({
            DRP_ADDRESS: request.getUser().USR_ADDRESS,
            DRP_ZIP_CODE: request.getUser().USR_ZIP_CODE,
            DRP_CITY: request.getUser().USR_CITY,
        })
    }, []);

    const onFinish = (values) => {
        request.post(
            `/dropoffs`,
            {
                DRP_ADDRESS: values.DRP_ADDRESS,
                DRP_ZIP_CODE: values.DRP_ZIP_CODE,
                DRP_CITY: values.DRP_CITY,
            },
            (res) => {
                request.post(
                    `/bookings`,
                    {
                        CRT_ID: cart.CRT_ID,
                        DRP_ID: res.data.DRP_ID,
                        BKG_PAID: false,
                        BKG_DELIVERED: false,
                        BKG_DELIVERY: values.BKG_DELIVERY,
                    },
                    (res) => {
                        message.success("L'adresse de livraison a bien été enregistrée");
                        history.push(`/customers/payment/${res.data.BKG_ID}`)
                    },
                    () => message.error("Une erreur est survenue")
                )

            },
            () => message.error("Une erreur est survenue")
        )
    };

    const onchangeSelect = (index, input) => {
        if (input.values === "click & collect") {
            setLocked(true);
            form.setFieldsValue({
                BKG_DELIVERY: 'click & collect',
                DRP_ADDRESS: market.MKT_ADDRESS,
                DRP_ZIP_CODE: market.MKT_ZIP_CODE,
                DRP_CITY: market.MKT_CITY,
            });
        } else if (input.values === "domicile") {
            setLocked(true);
            form.setFieldsValue({
                BKG_DELIVERY: 'domicile',
                DRP_ADDRESS: request.getUser().USR_ADDRESS,
                DRP_ZIP_CODE: request.getUser().USR_ZIP_CODE,
                DRP_CITY: request.getUser().USR_CITY,
            });
        } else if (input.values === "point de regroupement") {
            setLocked(false);
            form.setFieldsValue({
                BKG_DELIVERY: 'point de regroupement',
                DRP_ADDRESS: '',
                DRP_ZIP_CODE: '',
                DRP_CITY: '',
            });
        }
    };
    return (
        <>
            {address.DRP_ADDRESS ? <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                initialValues={address}
            >
                <Form.Item name="BKG_DELIVERY" label="Type de Livraison" rules={[{
                    required: true,
                    message: "Le type de livraison est obligatoire"
                }]}>
                    <Select onChange={onchangeSelect}>
                        <Select.Option key={1} values={'click & collect'}>
                            Click & Collect
                        </Select.Option>
                        <Select.Option key={2} values={'domicile'}>
                            Domicile
                        </Select.Option>
                        <Select.Option key={3} values={'point de regroupement'}>
                            Point de regroupement
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="DRP_ADDRESS" label="Adresse" rules={[{
                    required: true,
                    message: "L'adresse est obligatoire"
                }]}>
                    <Input disabled={locked} />
                </Form.Item>
                <Form.Item name="DRP_ZIP_CODE" label="Code Postal" rules={[{
                    required: true,
                    message: "Le code postal est obligatoire"
                }]}>
                    <Input  disabled={locked}/>
                </Form.Item>
                <Form.Item name="DRP_CITY" label="Ville" rules={[{
                    required: true,
                    message: "La ville est obligatoire"
                }]}>
                    <Input  disabled={locked}/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Enregistrer
                    </Button>
                </Form.Item>
            </Form> : null}
        </>
    );
};
