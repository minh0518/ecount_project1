/**
 * Date객체를 받아서 YYYY-MM-DD 형태로 반환
 * @param {Date} date
 * @returns {string} YYYY-MM-DD
 */
export const getDateStringByDate = (date) => {
    if (typeof date === 'string') date = new Date(date)
    const dateStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, "0") + '-' + String(date.getDate()).padStart(2, "0");
    return dateStr
}
