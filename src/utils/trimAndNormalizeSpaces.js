export const trimAndNormalizeSpaces = (inputString) => {
    if(!inputString) return inputString
    return inputString.replace(/\s+/g, ' ').trim();
}
