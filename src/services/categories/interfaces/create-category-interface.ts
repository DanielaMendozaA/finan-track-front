export interface ICreateCategory {
    name: string;
    type: categoryType;
    baseAmount: number,
    budgetId: number
}

export type categoryType = "Alimentación" | "Vivienda" | "Transporte" | "Salud" | "Educación" | "Entretenimiento" | "Ropa y Accesorios" | "Cuidado Personal"
    | "Mascotas" | "Tecnología" | "Ahorros e Inversiones" | "Emergencias" | "Ingresos" | "Viajes" | "Hogar" | "Deudas" | "Impuestos" | "Regalos" | "Herramientas" | "Otros" | ""
