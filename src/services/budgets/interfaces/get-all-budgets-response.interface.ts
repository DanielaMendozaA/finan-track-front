export interface IGetAllBudgets {
    statusCode: number;
    message:    string;
    data:       IBudget[];
}

export interface IBudget {
    id:            number;
    title:         string;
    baseAmount:    string;
    currentAmount: string;
    type:          Type;
    currency: Currency;
    frequency?:     Frequency;
    startDate?:     Date;
    endDate?:       Date;
}

export enum Frequency {
    Biweekly = "biweekly",
    Montly = "montly",
    Weekly = "weekly",
}

export enum Type {
    Frequency = "frequency",
    occasional = 'occasional'
}

export enum Currency {
    COP = 'COP',
    USD = 'USD'
}