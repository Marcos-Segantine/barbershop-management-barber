export const generateNewUid = () => {
    return Math.random().toString(36).substring(2) + Date.now();
}