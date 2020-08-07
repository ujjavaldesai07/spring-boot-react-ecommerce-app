import axios from 'axios';

const {
    REACT_APP_COMMON_DATA_SERVICE_PORT,
    REACT_APP_AUTHENTICATION_SERVICE_PORT
} = process.env

export const authServiceAPI = axios.create({
    baseURL: `http://localhost:${REACT_APP_AUTHENTICATION_SERVICE_PORT}`
})

export const commonServiceAPI = axios.create({
    baseURL: `http://localhost:${REACT_APP_COMMON_DATA_SERVICE_PORT}`
})