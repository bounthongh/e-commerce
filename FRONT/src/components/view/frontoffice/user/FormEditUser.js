import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Form, Input, Button, message, Select} from 'antd';
import {request} from "../../../lib/request";
import Cookies from "js-cookie";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};


export default function FormEditUser() {
    const [form] = Form.useForm();
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(request.getUser());
    }, []);

    const onFinish = (values) => {
        request.put(`/users`, {
                USR_ID: request.getUser().USR_ID,
                USR_IS_ADMIN: false,
                USR_LOGIN: request.getUser().USR_LOGIN,
                USR_PASSWORD: values.USR_PASSWORD,
                USR_FIRST_NAME: values.USR_FIRST_NAME,
                USR_LAST_NAME: values.USR_LAST_NAME,
                USR_ADDRESS: values.USR_ADDRESS,
                USR_ZIP_CODE: values.USR_ZIP_CODE,
                USR_CITY: values.USR_CITY,
                USR_PHONE_NUMBER: values.USR_PHONE_NUMBER,
            },
            () => {
                request.post('/auth/login', {
                        "email": request.getUser().USR_LOGIN,
                        "password": values.USR_PASSWORD
                    }, (res) => {
                        Cookies.set('accessToken', 'Bearer ' + res.data.access_token);
                        Cookies.set('user', res.data.user);
                    }, () => {
                        message.error('Une erreur est survenue lors de la modification des informations')
                    }
                );
            },
            () => {
                message.error('Une erreur est survenue lors de la modification des informations')
            },
        )
    };

    return (
        <>
            {user.USR_ID ? <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                initialValues={user}
            >
                <Form.Item name="USR_LOGIN" label="email" rules={[{
                    required: true,
                }]}>
                    <Input disabled={true}/>
                </Form.Item>
                <Form.Item name="USR_FIRST_NAME" label="Nom" rules={[{
                    required: true,
                    message: "le nom est obligatoire"
                }]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="USR_LAST_NAME" label="Prénom" rules={[{
                    required: true,
                    message: "le prénom est obligatoire"
                }]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="USR_ADDRESS" label="Adresse" rules={[{
                    required: true,
                    message: "l'adresse est obligatoire"
                }]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="USR_ZIP_CODE" label="Code postal" rules={[{
                    required: true,
                    message: "le code postal est obligatoire"
                }]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="USR_CITY" label="Ville" rules={[{
                    required: true,
                    message: "la ville est obligatoire"
                }]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="USR_PHONE_NUMBER" label="Téléphone" rules={[{
                    required: true,
                    message: "le téléphone est obligatoire"
                }]}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="USR_PASSWORD"
                    label="Mot de passe"
                    rules={[
                        {
                            required: true,
                            message: "le mot de passe est obligatoire"
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirmé le mot de passe"
                    dependencies={['USR_PASSWORD']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "la confirmation de mot de passe est obligatoire"
                        },
                        ({getFieldValue}) => ({
                            validator(rule, value) {
                                if (!getFieldValue('USR_PASSWORD') || getFieldValue('USR_PASSWORD') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Les deux mots de passe doivent êtres egaux');
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
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