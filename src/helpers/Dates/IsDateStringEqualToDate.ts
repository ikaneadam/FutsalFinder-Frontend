export function isDateStringEqualToDate(dateString: string, date: Date) {
    const inputDate = new Date(dateString);

    // Strip the time component from both dates by converting them to 'YYYY-MM-DD' format
    const inputDateStr = inputDate.toISOString().split('T')[0];
    const dateStr = date.toISOString().split('T')[0];

    // Compare the date strings
    return inputDateStr === dateStr;
}
