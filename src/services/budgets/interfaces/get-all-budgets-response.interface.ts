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
    frequency:     Frequency;
    startDate:     Date;
    endDate:       Date;
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