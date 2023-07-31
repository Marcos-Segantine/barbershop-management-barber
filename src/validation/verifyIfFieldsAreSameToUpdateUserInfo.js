export const verifyIfFieldsAreSameToUpdateUserInfo = (createNewPerson, userData) => {
    if (createNewPerson.name?.trim() && createNewPerson.name === userData.name) return true
    else if (createNewPerson.email?.trim() && createNewPerson.email === userData.email) return true
    else if (createNewPerson.nickname?.trim() && createNewPerson.nickname === userData.nickname) return true
    else if (createNewPerson.phone?.trim() && createNewPerson.phone === userData.phone) return true
    else if (createNewPerson.gender?.trim() && createNewPerson.gender === userData.gender) return true

    return false
}