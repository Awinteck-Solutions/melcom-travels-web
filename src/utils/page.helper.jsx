export const capitalizeWords = (text) => {
    return text.replace(/\b\w/g, char => char.toUpperCase());
}


export const updateDaysCount = (action, setToleranceDays) => {
    if (action === 'increase') {
        setToleranceDays(prev => Math.min(prev + 1, 7)); // Max 7 days
    } else if (action === 'decrease') {
        setToleranceDays(prev => Math.max(prev - 1, 1)); // Min 1 day
    }
};