import { handleError } from "../handlers/handleError";

export const getDayOfWeek = (dateString, setSomethingWrong) => {
    try {

        const daysOfWeek = [
            'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
            'Quinta-feira', 'Sexta-feira', 'Sábado'
        ];

        const date = new Date(dateString);
        const dayOfWeek = daysOfWeek[date.getDay() + 1];

        return dayOfWeek;
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getDayOfWeek", message)
    }
}