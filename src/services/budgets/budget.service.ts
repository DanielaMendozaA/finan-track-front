import { axiosInstanceBack } from "../../config/axios.config";
import { BUDGET_API_ENDPOINTS, TEndpointKeys } from "./budget.endpoint";
import { ICreateBudget } from "./interfaces/create-budget-interface";
import { IGetBudget, IGetBudgets } from "./interfaces/get-all-budgets-response.interface";

const endpoints = (method: TEndpointKeys, id?: number | string) => {
    return BUDGET_API_ENDPOINTS(id)[method];
}

export class BudgetService {
    static async getAllFrequency(userId: string): Promise<IGetBudgets> {
        const endpoint = endpoints('GET_FREQUENCY', userId);
        try {
            const response = await axiosInstanceBack.get<IGetBudgets>(endpoint);
            return response.data

        } catch (error) {
            console.error(error)
            throw error;
        }

    }

    static async getAllOccasional(userId: string): Promise<IGetBudgets> {
        const endpoint = endpoints('GET_OCCASIONAL', userId);
        try {
            const response = await axiosInstanceBack.get<IGetBudgets>(endpoint);
            return response.data

        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    static async createBudget(body: ICreateBudget): Promise<IGetBudget> {
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