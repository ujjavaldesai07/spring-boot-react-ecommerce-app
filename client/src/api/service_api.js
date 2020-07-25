import axios from 'axios';

export const paymentServiceAPI = axios.create({
    baseURL: 'http://localhost:6000'
})

export const authServiceAPI = axios.create({
    baseURL: 'http://localhost:7000'
})

export const commonServiceAPI = axios.create({
    baseURL: 'http://localhost:9000'
})