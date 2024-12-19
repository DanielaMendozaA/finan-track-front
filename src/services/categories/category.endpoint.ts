export const CATEGORY_API_ENDPOINTS = (id?: number | string) => {
    const resource = 'categories/';
    return {
        CREATE: `${resource}`,
    }
}
export type TEndpointKeys = 'CREATE'