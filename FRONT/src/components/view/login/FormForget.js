import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button } from 'antd';
import Icon from "antd/es/icon";

class ForgetForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {// login action go there
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 0, },
            },
            wrapperCol: {
                xs: { span: 24 },
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
                <Form.Item label="E-mail">
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
                    })(<Input />)}
                </Form.Item>
                <Form.Item  {...tailFormItemLayout} >
                    <Button
                        block
                        type={"primary" }
                        htmlType={"submit"}
                    >
                        Réinitialiser le mot de passe
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const FormForget = Form.create({ name: 'register' })(ForgetForm);

export default FormForget;
