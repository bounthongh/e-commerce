import React from 'react';
import {Form} from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {Input, Button, message} from 'antd';
import Icon from "antd/es/icon";
import {request} from "../../lib/request";
import Cookies from "js-cookie";
import {withRouter} from "react-router-dom";
import {LoginOutlined} from "@ant-design/icons";

class RegistrationForm extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {// login action go there
                request.post('/auth/login', values, (res) => {
                    if (res.data.access_token) {
                        Cookies.set('accessToken', 'Bearer ' + res.data.access_token);
                        Cookies.set('user', res.data.user);
                        if (res.data.user.USR_IS_ADMIN === true) {
                            this.props.history.push('/admin/home')
                        } else if (res.data.user.VENDOR !== null) {
                            this.props.history.push('/vendors/home')
                        } else if (res.data.user.CUSTOMER !== null) {
                            request.get(
                                `/carts/active`,
                                {},
                                () => {
                                    this.props.history.push('/customers/home')
                                }, () => {
                                    request.post(`/carts`,
                                        {
                                            "CUS_ID": request.getUser().CUSTOMER.CUS_ID,
                                            "CRT_IS_ACTIVE": true,
                                            "PRODUCTS": []
                                        },
                                        () => {
                                            this.props.history.push('/customers/home')
                                        },
                                        () => {
                                            console.log(res.data)
                                        });
                                }
                            )
                        } else {
                            message.error('Une erreur est survenue lors de la connection');
                        }
                    }
                }, () => {
                    message.error('Une erreur est survenue lors de la connection');
                    message.warning('Veuillez vérifier vos identifiants');
                })
            }
        });
    };


    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 0,},
            },
            wrapperCol: {
                xs: {span: 24},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
            },
        };


        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Identifiant">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: "Veuillez saisir un email valide",
                            },
                            {
                                required: true,
                                message: "Veuillez saisir votre email",
                            },
                        ],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="Mot-de-Passe" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: "Veuillez saisir votre mot-de-passe",
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password/>)}
                </Form.Item>
                <Form.Item  {...tailFormItemLayout} >
                    <Button
                        block
                        type={"primary"}
                        htmlType={"submit"}
                    >
                        <LoginOutlined/> Se Connecter
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const FormLogin = Form.create({name: 'register'})(RegistrationForm);

export default withRouter(FormLogin);
