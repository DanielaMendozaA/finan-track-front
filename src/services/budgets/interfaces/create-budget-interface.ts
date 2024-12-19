export interface ICreateBudget {
        title: string,
        baseAmount:number,
        type: "frequency" | "occasional",
        Frequency: "montly" | "biweekly" | "weekly" | "once" | "";
        userId: string,
        currency: "COP" | "USD"; 
}