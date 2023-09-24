export const isValidPhoneNumber = (phoneNumber) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    // Regex to see if has a character that is not a number in phone number
    const regex = /[^0-9]/;

    if (cleanedNumber.length !== 10 && cleanedNumber.length !== 11) return false;
    else if (regex.test(phoneNumber.toString())) return false

    return true;
}
