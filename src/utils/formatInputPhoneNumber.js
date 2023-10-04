export const formatInputPhoneNumber = (input) => {
    if (!input) return

    const cleanedInput = input.replace(/\D/g, '');

    if (cleanedInput.length > 11) {
        return input;
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
