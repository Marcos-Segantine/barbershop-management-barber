import { handleError } from "../handlers/handleError"
import { trimAndNormalizeSpaces } from "../utils/trimAndNormalizeSpaces"

export const verifyIfFieldsAreSameToUpdateUserInfo = (createNewPerson, userData, setSomethingWrong) => {
    try {

        const name = trimAndNormalizeSpaces(createNewPerson.name)
        const email = trimAndNormalizeSpaces(createNewPerson.email)

        if (name && name === userData.name) return true
        else if (email && email === userData.email) return true
        else if (createNewPerson.phone && createNewPerson.phone === userData.phone) return true
        else if (createNewPerson.gender && createNewPerson.gender === userData.gender) return true

        return false
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("verifyIfFieldsAreSameToUpdateUserInfo", message)
    }
}
