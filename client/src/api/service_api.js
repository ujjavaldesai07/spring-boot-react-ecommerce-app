import axios from 'axios';

const {REACT_APP_COMMON_DATA_SERVICE_IP, REACT_APP_COMMON_DATA_SERVICE_PORT} = process.env

export const paymentServiceAPI = axios.create({
    baseURL: 'http://localhost:9050'
})

export const authServiceAPI = axios.create({
    baseURL: 'http://localhost:7000'
})

export const commonServiceAPI = axios.create({
    baseURL: `http://${REACT_APP_COMMON_DATA_SERVICE_IP}:${REACT_APP_COMMON_DATA_SERVICE_PORT}`
})