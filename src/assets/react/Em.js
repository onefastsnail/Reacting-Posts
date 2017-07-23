export function enumerateDaysBetweenDates(startDate, endDate) {
    var now = startDate, dates = [];

    while (now.isBefore(endDate) || now.isSame(endDate)) {
        dates.push(now.format('YYYY-MM-DD'));
        now.add(1, 'days');
    }
    return dates;
};