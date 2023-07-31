export const takeOutFormatPhoneNumber = (phone) => {
    const newPhone = phone.match(/[0-9]+/g);
    return newPhone.join('')
}
