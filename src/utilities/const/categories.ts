import { categoryType } from "../../services/categories/interfaces/create-category-interface";

export const categories: { id: number, title: categoryType; icon: string }[] = [
    { id: 1, title: "Alimentación", icon: "food-fork-drink" },
    { id: 2, title: "Vivienda", icon: "home-variant-outline" },
    { id: 3, title: "Transporte", icon: "car-back" },
    { id: 4, title: "Salud", icon: "heart-pulse" },
    { id: 5, title: "Educación", icon: "book-education-outline" },
    { id: 6, title: "Entretenimiento", icon: "gamepad-variant" },
    { id: 7, title: "Ropa y Accesorios", icon: "tshirt-crew" },
    { id: 8, title: "Cuidado Personal", icon: "spa-outline" },
    { id: 9, title: "Mascotas", icon: "dog" },
    { id: 10, title: "Tecnología", icon: "devices" },
    { id: 11, title: "Ahorros e Inversiones", icon: "bank-transfer-in" },
    { id: 12, title: "Emergencias", icon: "ambulance" },
    { id: 13, title: "Ingresos", icon: "cash" },
    { id: 14, title: "Viajes", icon: "airplane" },
    { id: 15, title: "Hogar", icon: "sofa" },
    { id: 16, title: "Deudas", icon: "account-cash" },
    { id: 17, title: "Impuestos", icon: "cash-register" },
    { id: 18, title: "Regalos", icon: "gift" },
    { id: 19, title: "Herramientas", icon: "tools" },
    { id: 20, title: "Otros", icon: "cloud-question" },
];