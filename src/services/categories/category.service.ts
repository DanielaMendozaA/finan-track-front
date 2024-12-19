import { axiosInstanceBack } from "../../config/axios.config";
import { CATEGORY_API_ENDPOINTS, TEndpointKeys } from "./category.endpoint";
import { ICreateCategory } from "./interfaces/create-category-interface";

const endpoints = (method: TEndpointKeys, id?: number | string) => {
    return CATEGORY_API_ENDPOINTS(id)[method];
}

export class CategoryService{
    static async createCategory(body: ICreateCategory){
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