export const isValidPhoneNumber = (phoneNumber) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    if (cleanedNumber.length !== 10 && cleanedNumber.length !== 11) return false;

    return true;
}
