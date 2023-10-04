export const formatInputPhoneNumber = (input) => {
    const cleanedInput = input.replace(/\D/g, '');

    if (cleanedInput.length > 11) {
        const length = input.length > 16 ? 16 : input.length
        return input.split("").splice(0, length - 1).join("");
    }

    if (cleanedInput.length <= 2) {
        return input
    }

    if (cleanedInput.length > 2 && cleanedInput.length <= 7) {
        return `(${cleanedInput.slice(0, 2)}) ${cleanedInput.slice(2, 7)}`;
    }

    if (cleanedInput.length >= 8 && cleanedInput.length <= 11) {
        return `(${cleanedInput.slice(0, 2)}) ${cleanedInput.slice(2, 7)}-${cleanedInput.slice(7)}`;
    }
}
