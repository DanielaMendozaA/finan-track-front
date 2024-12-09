export const BUDGET_API_ENDPOINTS = (id?: number) => {
    const resource = 'budgets/';
    return {
        CREATE: `${resource}`,
        GET_FREQUENCY: `${resource}frequency`,
        GET_OCCASIONAL: `${resource}occasional`,
        DELETE:  `${resource}:${id}`,
    }
}
export type TEndpointKeys = 'CREATE' | 'GET_FREQUENCY' | 'GET_OCCASIONAL' | 'DELETE';