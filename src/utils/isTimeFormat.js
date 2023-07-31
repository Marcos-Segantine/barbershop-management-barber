export const isTimeFormat = (text) => {
    
    // Use regex to check if the text matches the "12:00" format
    const timeFormatRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeFormatRegex.test(text);
}
