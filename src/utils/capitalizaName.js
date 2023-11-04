import { handleError } from "../handlers/handleError"

export const capitalizeName = (name, setSomethingWrong) => {
    try {

        const nameCapitalized = name.split("").map((letter, index) => {
            if (index === 0) return name[index].toUpperCase()
            else if (name[index - 1] === " ") return letter.toUpperCase()
            return letter
        }).join("")

        return nameCapitalized.trim()
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("capitalizeName", message)
    }
}