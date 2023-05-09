export function addMonthsToDate(date: Date, months: number): Date {
    const newDate = new Date(date.getTime());

    newDate.setMonth(newDate.getMonth() + months);
    console.log(date)
    console.log(newDate)
    return newDate;
}

export function dateToUnix(date: Date){
    return Math.floor(date.getTime()/1000)
}
