import { Dimensions } from "react-native"
import { handleError } from "../handlers/handleError"

export const getScreenDimensions = (filed, percentage, setSomethingWrong) => {
    try {
        const data = Dimensions.get('screen')

        if (filed && percentage) return (data[filed] - (data[filed] * (+percentage / 100)))
        else if (filed) return data[filed]
        return data

    } catch ({ message }) {
        if (setSomethingWrong) {
            setSomethingWrong(true)
        }

        handleError("getScreenDimensions", message)
    }
}