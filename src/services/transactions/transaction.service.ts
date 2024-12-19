import { axiosInstanceBack } from "../../config/axios.config";
import { ICreateTransaction } from "./interfaces/create-transaction-interface";
import { TEndpointKeys, TRANSACTION_API_ENDPOINTS } from "./transaction.endpoint";

const endpoints = (method: TEndpointKeys,) => {
    return TRANSACTION_API_ENDPOINTS()[method];
}

export class TransactionService{
    static async createTransaction(body: ICreateTransaction){
        const endpoint = endpoints('CREATE');
        try {
            const response = await axiosInstanceBack.post(endpoint, body)
            return response.data
        } catch (error) {
            console.error(error)
            throw error;
        }

    }
}