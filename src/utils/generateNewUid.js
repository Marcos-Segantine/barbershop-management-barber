import { handleError } from "../handlers/handleError";

export const generateNewUid = (setSomethingWrong) => {
    try {
        return Math.random().toString(36).substring(2) + Date.now();

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("generateNewUid", message)

    }
}