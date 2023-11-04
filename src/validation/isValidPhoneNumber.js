import { handleError } from "../handlers/handleError";

export const isValidPhoneNumber = (phoneNumber, setSomethingWrong) => {
    try {

        const cleanedNumber = phoneNumber.replace(/\D/g, '');
        const regexPattern = /^\(\d{2}\) \d{5} - \d{4}$/;

        if (cleanedNumber.length !== 10 && cleanedNumber.length !== 11) return false;
        else if (regexPattern.test(phoneNumber.toString())) return false

        return true;

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("isValidPhoneNumber", message);
    }
}
