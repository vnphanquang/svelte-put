/**
 * https://www.w3.org/TR/NOTE-datetime
 * @param date
 * @returns
 */
export function toW3CDate(date: Date | number): string {
  date = new Date(date);
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')}`;
}
