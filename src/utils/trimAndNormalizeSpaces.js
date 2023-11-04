import { handleError } from "../handlers/handleError";

export const trimAndNormalizeSpaces = (inputString, setSomethingWrong) => {
    try {
        if (!inputString) return inputString
        return inputString.replace(/\s+/g, ' ').trim();

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("trimAndNormalizeSpaces", message)
    }
}
