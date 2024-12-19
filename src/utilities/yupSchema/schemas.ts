import * as yup from 'yup';

export const addBudgeschema = yup.object().shape({
    title: yup
        .string()
        .min(4, "El título debe tener al menos 4 caracteres")
        .required("El título es requerido"),

    baseAmount: yup
        .number()
        .typeError("El saldo inicial debe ser un número válido")
        .positive("El saldo inicial debe ser un número positivo")
        .required("El saldo inicial es requerido"),

    currency: yup
        .string()
        .oneOf(["COP", "USD"], "La moneda debe ser 'COP' o 'USD'")
        .required("La moneda es requerida"),

    frequency: yup
        .string()
        .oneOf(
            ["montly", "biweekly", "weekly", "once", ""],
            "La frecuencia debe ser 'mensual', 'quincenal', 'semanal' o 'una vez'"
        )
        .required("La frecuencia es requerida"),

    startDate: yup
        .date()
        .typeError("La fecha de inicio debe ser una fecha válida")
        .nullable(),

    endDate: yup
        .date()
        .typeError("La fecha de fin debe ser una fecha válida")
        .min(
            yup.ref("startDate"),
            "La fecha de fin debe ser posterior a la fecha de inicio"
        )
        .nullable()
});


export const addCategorychema = yup.object().shape({
    name: yup
        .string()
        .min(2, "El título debe tener al menos 2 caracteres")
        .required("El título es requerido"),

    baseAmount: yup
        .number()
        .typeError("El saldo inicial debe ser un número válido")
        .positive("El saldo inicial debe ser un número positivo")
        .required("El saldo inicial es requerido"),

});


export const addTransactionSchema = yup.object().shape({
    description: yup
        .string()
        .min(2, "El título debe tener al menos 2 caracteres")
        .required("El título es requerido"),

    amount: yup
        .number()
        .typeError("El saldo inicial debe ser un número válido")
        .positive("El saldo inicial debe ser un número positivo")
        .required("El saldo inicial es requerido"),

});