/**
 * Formats a number with commas as thousands separators
 * @param {number} num - The number to format
 * @returns {string} The formatted number string
 */
export function formatNumberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

