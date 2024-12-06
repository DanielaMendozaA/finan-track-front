import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';

export const baseUrl = 'http://localhost:3001/api/v1/';

const axiosInstanceBack: AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstanceBack.interceptors.request.use(
    async (config) => {
        const token = AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstanceBack.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const customError = {
                message: error.response.data.message || 'Algo salió mal',
                status: error.response.status,

            };
            return Promise.reject(customError);
        } else if (error.request) {
            return Promise.reject({ message: 'No se recibió respuesta del servidor', status: 503 });
        } else {
            return Promise.reject({ message: 'Error en la solicitud', status: 500 });
        }
    }
)