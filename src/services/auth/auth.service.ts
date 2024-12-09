

import { AUTH_API_ENDPOINTS, TEndpointKeys } from "./auth.endpoint";
import { axiosInstanceBack } from "../../config/axios.config";
import { ILoginResponse, IUser } from "./interfaces/login-response.interface";
import { ILoginUser } from "./interfaces/login-user.interface";
import { IRegisterResponse } from "./interfaces/register-response.interface";
import { IRegisterUser } from "./interfaces/register-user.interface";

const endpoints = (method: TEndpointKeys) => {
    return AUTH_API_ENDPOINTS()[method];
}

export class AuthService {
    static async login(body: ILoginUser): Promise<ILoginResponse> {
        const endpoint = endpoints('LOGIN');
            const response = await axiosInstanceBack.post<ILoginResponse>(`${endpoint}`, body);
            return response.data;
    }

    static async register(body: IRegisterUser): Promise<IRegisterResponse> {
        const endpoint = endpoints('REGISTER')
            const response = await axiosInstanceBack.post<IRegisterResponse>(`${endpoint}`, body);
            console.log("respuesta del servidor-------,", response)
            return response.data;
    }

}


