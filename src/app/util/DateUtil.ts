export class DateUtil {

  static getDayName(date: Date, locale: string = 'en-US'): string {
    return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
  }
}
