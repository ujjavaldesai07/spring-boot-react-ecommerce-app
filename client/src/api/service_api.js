import axios from 'axios';

const {
    REACT_APP_COMMON_DATA_SERVICE_PORT,
    REACT_APP_AUTHENTICATION_SERVICE_PORT,
    REACT_APP_COMMON_DATA_SERVICE_URL,
    REACT_APP_AUTHENTICATION_SERVICE_URL,
} = process.env

export const authServiceAPI = axios.create({
    baseURL: REACT_APP_AUTHENTICATION_SERVICE_URL || `http://localhost:${REACT_APP_AUTHENTICATION_SERVICE_PORT}`
})

export const commonServiceAPI = axios.create({
    baseURL: REACT_APP_COMMON_DATA_SERVICE_URL || `http://localhost:${REACT_APP_COMMON_DATA_SERVICE_PORT}`
})