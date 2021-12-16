import React from "react";

import {Form, Input, InputNumber, Button, message, Select} from 'antd';
import {request} from "../../../lib/request";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};


export default function AddProductView() {
    const [form] = Form.useForm();


    const onFinish = (values) => {
        request.post(
            `/products`,
            {
                VDR_ID: request.getUser().VENDOR.VDR_ID,
                PDT_NAME: values.PDT_NAME,
                PDT_PRICE: values.PDT_PRICE,
                PDT_QUANTITY: values.PDT_QUANTITY,
                PDT_UNIT: values.PDT_UNIT,
                PDT_IMAGE: values.PDT_IMAGE,
            },
            () => message.success("Le Produit a été créé"),
            () => message.error("Une erreur est survenue")
        )
    };


    return (
        <>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}

            >
                <Form.Item name="PDT_NAME" label="Nom du Produit" rules={[{
                    required: true,
                    message: "Le nom est obligatoire"
                }]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="PDT_PRICE" label="Prix en €" rules={[{
                    required: true,
                    message: "Le prix est obligatoire"
                }]}>
                    <InputNumber min={0.1} max={99999} style={{width: '100%'}} />
                </Form.Item>
                <Form.Item name="PDT_QUANTITY" label="Quantité" rules={[{
                    required: true,
                    message: "La quantité en stock est obligatoire"
                }]}>
                    <InputNumber min={0.1} max={99999} style={{width: '100%'}}/>
                </Form.Item>
                <Form.Item name="PDT_UNIT" label="Unité" rules={[{
                    required: true,
                    message: "L'unité de la quantité du produit est obligatoire"
                }]}>
                    <Select>
                        <Select.Option key={'1'} value={'kg'}>Kg</Select.Option>
                        <Select.Option key={'2'} value={'unitée'}>unité</Select.Option>
                        <Select.Option key={'3'} value={'litres'}>litres</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="PDT_IMAGE" label="URL de l'image" rules={[
                    {
                    required: true,
                    message: "L'image est obligatoire",
                },
                    () => ({
                        validator(rule, value) {
                            if (!value || value.match('^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$')) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Fournir un URL d\'image valide');
                        },
                    }),
                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Enregistrer
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
