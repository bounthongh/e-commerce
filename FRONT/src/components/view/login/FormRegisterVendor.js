import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, message } from 'antd';
import Select from "antd/es/select";
import {request} from "../../lib/request";
import { withRouter } from "react-router-dom";

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {span: 0},
        md: {span: 12},
    },
    wrapperCol: {
        xs: {span: 24},
        md: {span: 8},
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
class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        markets: [],
    };
    componentDidMount() {
        request.get('/markets',{},(res) => {
            this.setState({confirmDirty: this.state.confirmDirty, markets: res.data});
        },(err) => {
            message.warning('Impossible de charger les Marchés à proximité')
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                request.post('/users', {
                    "USR_IS_ADMIN": false,
                    "USR_IS_CUSTOMER": false,
                    "USR_IS_VENDOR": true,
                    "USR_LOGIN": values.USR_LOGIN,
                    "USR_PASSWORD": values.USR_PASSWORD,
                    "USR_FIRST_NAME": values.USR_FIRST_NAME,
                    "USR_LAST_NAME": values.USR_LAST_NAME,
                    "USR_ADDRESS": values.USR_ADDRESS,
                    "USR_ZIP_CODE": values.USR_ZIP_CODE,
                    "USR_CITY": values.USR_CITY,
                    "USR_PHONE_NUMBER": values.USR_PHONE_NUMBER,
                    "VDR_NAME": values.VDR_NAME,
                    "MARKET_IDS": values.MKT_ID

                }, () => {
                    this.props.history.push('/login');
                    message.success('Le Compte a été créé avec succès');
                }, () => {
                    message.error('Une erreur est survenue lors de la création du Compte');
                });
            }
        });
    };
    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({
            markets: this.state.markets,
            confirmDirty: this.state.confirmDirty || !!value
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('USR_PASSWORD')) {
            callback('Les deux mots de passe doivent êtres identiques!');
        } else {
            callback();
        }
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


        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label={"Marché à proximité"} >
                    {getFieldDecorator('MKT_ID', {
                        rules: [{
                            required: true,
                            message: 'Veuillez sélectionner un Marché',
                        }],
                    })(<Select
                        mode={'multiple'}
                        placeholder='Veuillez sélectionner un Marché'
                        // onChange={onMarketChange}
                        allowClear
                    >
                        {this.state.markets.map((row) => {
                            return(<Option key={row.MKT_ID} value={row.MKT_ID}>{row.MKT_NAME} ({row.MKT_ADDRESS} {row.MKT_CITY} {row.MKT_ZIP_CODE})</Option>);
                        })}
                    </Select>)}
                </Form.Item>
                <Form.Item label={"Appelation Commercant"} >
                    {getFieldDecorator('VDR_NAME', {
                        rules: [{required: true, message: 'Veuillez Renseigner le nom de Commercant', whitespace: true}],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label={"Prénom"} >
                    {getFieldDecorator('USR_FIRST_NAME', {
                        rules: [{required: true, message: 'Veuillez Renseigner votre prénom', whitespace: true}],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label={"Nom"}>
                    {getFieldDecorator('USR_LAST_NAME', {
                        rules: [{required: true, message: 'Veuillez Renseigner votre nom', whitespace: true}],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="Téléphone">
                    {getFieldDecorator('USR_PHONE_NUMBER', {
                        rules: [{required: true, message: 'Veuillez saisir un numéro de téléphone'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Adresse">
                    {getFieldDecorator('USR_ADDRESS', {
                        rules: [{required: true, message: 'Veuillez saisir votre adresse'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Code Postal">
                    {getFieldDecorator('USR_ZIP_CODE', {
                        rules: [{required: true, message: 'Veuillez saisir votre code postal'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Ville">
                    {getFieldDecorator('USR_CITY', {
                        rules: [{required: true, message: 'Veuillez saisir votre ville'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="E-mail">
                    {getFieldDecorator('USR_LOGIN', {
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
                <Form.Item label="Mot-de-passe" hasFeedback>
                    {getFieldDecorator('USR_PASSWORD', {
                        rules: [
                            {
                                required: true,
                                message: 'Veuillez saisir votre mot-de-passe',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password/>)}
                </Form.Item>
                <Form.Item label="Confirm Mot-de-passe" hasFeedback>
                    {getFieldDecorator('password_confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Veuillez confirmer votre mot-de-passe',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
                </Form.Item>
                <Form.Item  {...tailFormItemLayout} >
                    <Button
                        block
                        type={"primary"}
                        htmlType={"submit"}
                    >
                        Demande d'activation de compte
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const FormRegisterVendor = Form.create({name: 'register'})(RegistrationForm);

export default withRouter(FormRegisterVendor);
