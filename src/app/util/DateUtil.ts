export class DateUtil {

  static months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

  static getDayName(date: Date, locale: string = 'en-US'): string {
    return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
  }
}
