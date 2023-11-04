import { handleError } from "../handlers/handleError";

export const formatPrice = (text, setSomethingWrong) => {
    try {
        text = String(text)

        const number = parseFloat(text.replace(".", ","));
        return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("formatPrice", message)
    }
}

