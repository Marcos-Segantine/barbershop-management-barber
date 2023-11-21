import { handleError } from "../handlers/handleError"

export const getNameLastName = (name, setSomethingWrong, ellipsis = true) => {
    try {

        if (!name) return null

        if (ellipsis) {
            name = name.split("")
            return name.length > 12 ? name.splice(0, 12).join("") + "..." : name.join("")
        }

        name = name.split(" ")

        if (name.length > 1) {
            return name[0] + " " + name[1]
        }
        else {
            return name[0]
        }

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getNameLastName", message)
    }
}