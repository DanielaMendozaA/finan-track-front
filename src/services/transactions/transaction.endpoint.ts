export const TRANSACTION_API_ENDPOINTS = () => {
    const resource = 'transactions/';
    return {
        CREATE: `${resource}`,
    }
}
export type TEndpointKeys = 'CREATE'