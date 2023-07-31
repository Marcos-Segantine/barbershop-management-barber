export const formatPhoneNumber = (phone, setSomethingWrong) => {
    try {

        let phoneWithoutCountryCode = ""

        if (phone.length >= 12) {
            phoneWithoutCountryCode = phone.split("").splice(3, phone.length).join("")
        }

        const phoneFormatted = phoneWithoutCountryCode ? phoneWithoutCountryCode.split("") : phone.split("")

        phoneFormatted.splice(0, 0, "(")
        phoneFormatted.splice(3, 0, ") ")
        phoneFormatted.splice(9, 0, " - ")

        return phoneFormatted.join("")

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}