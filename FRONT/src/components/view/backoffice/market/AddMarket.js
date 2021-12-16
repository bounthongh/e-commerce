import React, {useEffect, useState} from "react";

import {Form, Input, Button, message} from 'antd';
import {request} from "../../../lib/request";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};


export default function AddMarket() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        request.post(
            `/markets`,
            {
                "MKT_NAME": values.MKT_NAME,
                "MKT_ADDRESS": values.MKT_ADDRESS,
                "MKT_ZIP_CODE": values.MKT_ZIP_CODE,
                "MKT_CITY": values.MKT_CITY,
            },
            () => message.success("Le Marché a été créé"),
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
                <Form.Item name="MKT_NAME" label="Nom du Marché" rules={[{
                    required: true,
                    message: "Le nom est obligatoire"
                }]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="MKT_ADDRESS" label="Adresse" rules={[{
                    required: true,
                    message: "L'adresse est obligatoire"
                }]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="MKT_ZIP_CODE" label="Code Postal" rules={[{
                    required: true,
                    message: "Le code postal est obligatoire"
                }]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="MKT_CITY" label="Ville" rules={[{
                    required: true,
                    message: "La ville est obligatoire"
                }]}>
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
