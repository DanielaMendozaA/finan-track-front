import { addDays, startOfWeek, subHours } from "date-fns";

interface NewDates {
    startDate: Date,
    endDate: Date

}


export const validateFrequency = (frequency: "montly" | "biweekly" | "weekly" | "once" | "") => {
    const currentDate = subHours(new Date, 5)

    let newDates: NewDates = {
        startDate: new Date(),
        endDate: new Date()
    }
    switch (frequency) {
        case 'montly':
            newDates.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            console.log("Esta es la fecha de inicio", newDates.startDate);

            newDates.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            console.log("Esta es la fecha de fin", newDates.endDate);
            break;

        case 'biweekly':
            const dayOfMonth = currentDate.getDate()
            console.log("Este es el dia del mes", dayOfMonth);
            if (dayOfMonth >= 15) {
                newDates.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 16);
                console.log("Esta es la fecha de inicio", newDates.startDate);
                newDates.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                console.log("Esta es la fecha de fin", newDates.endDate);
            } else {
                newDates.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                console.log("Esta es la fecha de inicio", newDates.startDate);
                newDates.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15);
                console.log("Esta es la fecha de fin", newDates.endDate);
            }
            break;

        case 'weekly':
            newDates.startDate = startOfWeek(currentDate, { weekStartsOn: 1 })
            console.log("Esta es la fecha de inicio", newDates.startDate);
            newDates.endDate = addDays(newDates.startDate, 6);
            console.log("Esta es la fecha de fin", newDates.endDate);
            break;
    }

    return [newDates.startDate, newDates.endDate]


}