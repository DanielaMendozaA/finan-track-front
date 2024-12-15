import { axiosInstanceBack } from "../../config/axios.config";
import { BUDGET_API_ENDPOINTS, TEndpointKeys } from "./bugget.endpoint";
import { IGetAllBudgets } from "./interfaces/get-all-budgets-response.interface";

const endpoints = (method: TEndpointKeys, id?: number | string) =>{
    return BUDGET_API_ENDPOINTS(id)[method];
}

export class BudgetService{
    static async getAllFrequency(userId: string) : Promise<IGetAllBudgets>{
        const endpoint = endpoints('GET_FREQUENCY', userId);
        try {
            const response = await axiosInstanceBack.get<IGetAllBudgets>(endpoint);
            return response.data
            
        } catch (error) {
            console.error(error)
            throw error;
        }

    }

    static async getAllOccasional(userId: string) :  Promise<IGetAllBudgets>{
        const endpoint = endpoints('GET_OCCASIONAL', userId);
        try {
            const response = await axiosInstanceBack.get<IGetAllBudgets>(endpoint);
            return response.data
            
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

}