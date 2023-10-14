import { Dimensions } from "react-native"

export const getScreenDimensions = (filed = "width", percentage = null) => {
    const data = Dimensions.get('screen')

    if (filed && percentage) return (data[filed] - (data[filed] * (+percentage / 100)))
    else if (filed) return data[filed]
    return data
}