import axios from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';
import config from '../../config/api';

const getAccessToken = () => Cookies.get('accessToken');

const getHeaders = (contentType) => {
    return {
        'Content-Type': contentType || 'application/json', // [SP] defaults to application/json if contentType undefined
        'Authorization': getAccessToken(),
        'accept': '*/*',
    };
};

const generateGetParams = (params) => {
    return params.length ? `?${qs.stringify(params, {arrayFormat: 'repeat', encode: false})}` : '';
};
export const request =
    {
        getUser() {
            return JSON.parse(Cookies.get('user'));
        },
        async getSecret(uri, params, successCallback, errorCallback, contentType) {

            return axios.get(config.API_SECRET_URL + uri +`?${qs.stringify(params, {arrayFormat: 'repeat', encode: false})}`,
                {
                    headers: getHeaders(contentType)
                })
                .then((response) => {
                    successCallback(response);
                })
                .catch(error => {
                    errorCallback(error);
                });
        },
        async get(uri, params, successCallback, errorCallback, contentType) {

            return axios.get(config.API_URL + uri + generateGetParams(params),
                {
                    headers: getHeaders(contentType)
                })
                .then((response) => {
                    successCallback(response);
                })
                .catch(error => {
                    errorCallback(error);
                });
        },

        async post(uri, body, successCallback, errorCallback, contentType, options) {
            await axios.post(config.API_URL + uri, body,
                {
                    ...options,
                    headers: getHeaders(contentType)
                })
                .then((response) => {
                    successCallback(response);
                })
                .catch(error => {
                    errorCallback(error);
                });
        },

        async patch(uri, body, successCallback, errorCallback, contentType) {
            await axios.patch(config.API_URL + uri, body,
                {
                    headers: getHeaders(contentType)
                })
                .then((response) => {
                    successCallback(response);
                })
                .catch(error => {
                    errorCallback(error);
                });
        },
        async put(uri, body, successCallback, errorCallback, contentType) {
            await axios.put(config.API_URL + uri, body,
                {
                    headers: getHeaders(contentType)
                })
                .then((response) => {
                    successCallback(response);
                })
                .catch(error => {
                    errorCallback(error);
                });
        },
        async delete(uri, body, successCallback, errorCallback, contentType) {
            await axios.delete(config.API_URL + uri, {
                    headers: getHeaders(contentType)
                }
            )
                .then((response) => {
                    successCallback(response);
                })
                .catch(error => {
                    errorCallback(error);
                });
        },
    };
