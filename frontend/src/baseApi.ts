import axios from "axios";
import { getAuthorization } from "@/auth";
import { API_HOST } from "@/global";
export const API_HOST_PREFIX = `${API_HOST}/api`;

const baseApi = axios.create({
    baseURL: API_HOST_PREFIX,
    timeout: 10000,
});

baseApi.interceptors.request.use(function (config) {
    config.headers = { ...config.headers, Authorization: getAuthorization() };
    // you can also do other modification in config
    return config;
}, function (error) {
    return Promise.reject(error);
});
baseApi.interceptors.response.use(function (response) {
    // if (response.status === 401) {// your failure logic}
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default baseApi;