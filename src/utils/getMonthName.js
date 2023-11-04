import { handleError } from "../handlers/handleError";

export const getMonthName = (monthString, setSomethingWrong, isToReturnAbbreviation) => {

    try {

        if (!isToReturnAbbreviation) {
            const monthNamesPT = [
                "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
            ];

            const monthIndex = parseInt(monthString, 10);

            if (monthIndex >= 1 && monthIndex <= 12) {
                const monthNamePT = monthNamesPT[monthIndex - 1];
                return monthNamePT;

            } else {
                return "---";
            }
        }

        const monthNamesPTAbbreviation = [
            "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
            "Jul", "Ago", "Set", "Out", "Nov", "Dez"
        ];

        const monthIndex = parseInt(monthString, 10);

        if (monthIndex >= 1 && monthIndex <= 12) {
            const monthNamePT = monthNamesPTAbbreviation[monthIndex - 1];
            return monthNamePT;

        } else {
            return "---";
        }
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getMonthName", message)
    }
}