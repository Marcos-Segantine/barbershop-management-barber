import { handleError } from "../handlers/handleError"

export const getCurrentHour = (setSomethingWrong) => {
    try {
        return new Date().getHours()

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getCurrentHour", message)
    }
}