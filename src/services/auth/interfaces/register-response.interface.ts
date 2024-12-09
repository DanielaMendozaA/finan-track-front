export interface IRegisterResponse {
    statusCode: number;
    message:    string;
    data:       IData;
}

export interface IData {
    id:       string;
    name: string;
    email:    string;
    isVerified: boolean;
}
