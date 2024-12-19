export const BUDGET_API_ENDPOINTS = (id?: number | string) => {
    const resource = 'budgets/';
    return {
        CREATE: `${resource}`,
        GET_FREQUENCY: `${resource}frequency?userId=${id}`,
        GET_OCCASIONAL: `${resource}occasional?userId=${id}`,
        DELETE:  `${resource}:${id}`,
    }
}
export type TEndpointKeys = 'CREATE' | 'GET_FREQUENCY' | 'GET_OCCASIONAL' | 'DELETE';